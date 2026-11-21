import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface UrduAssistRequest {
  english?: string;
  urduOrRoman?: string;
  field?: string;
  groqApiKey?: string;
}

export interface UrduAssistResponse {
  success: boolean;
  text: string;
  model: string;
  downgraded: boolean;
  warning?: string | null;
}

const PRIMARY_MODEL = 'llama-3.3-70b-versatile';
const FALLBACK_MODEL = 'llama-3.1-8b-instant';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly config: ConfigService) {}

  async generateUrdu(dto: UrduAssistRequest): Promise<UrduAssistResponse> {
    const apiKey = dto.groqApiKey || this.config.get<string>('GROQ_API_KEY') || process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new HttpException(
        'Groq API Key is not configured. Please set GROQ_API_KEY in .env or provide it in Admin Settings.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const english = dto.english?.trim() || '';
    const urduOrRoman = dto.urduOrRoman?.trim() || '';

    if (!english && !urduOrRoman) {
      throw new HttpException('Please provide either English text or Roman Urdu input.', HttpStatus.BAD_REQUEST);
    }

    // Build system & user prompts
    const systemPrompt = `You are an expert Pakistani Urdu linguist, Nastaliq typist, and wedding invitation cultural specialist.
Your task is to produce elegant, beautiful, grammatically flawless Pakistani Urdu script (in Arabic/Urdu unicode characters).

RULES:
1. If the user provided Roman Urdu / phonetic text (e.g. "Ali bhai aur unki bhabhi", "Barat ki aamad", "Taqreeb-e-Walima"):
   - Phonetically transcribe this EXACT text into proper Urdu script without translating to English or altering the intended meaning.
   - Example: "Ali bhai aur unki bhabhi" -> "علی بھائی اور ان کی بھابھی"
   - Example: "Chaudhry Family" -> "چوہدری فیملی"
   - Example: "Dua-e-Khair aur Rukhsati" -> "دعائے خیر اور رخصتی"

2. If the user provided ONLY English text and no Roman Urdu:
   - Translate or adapt it into polite, traditional, high-end Pakistani wedding invitation Urdu.
   - Example: "Mr. & Mrs. Tariq Mahmood" -> "جناب و محترمہ طارق محمود"
   - Example: "Groom's Father" -> "والدِ گرامی دولہا"
   - Example: "Arrival of Barat" -> "آمدِ بارات"
   - Example: "Dinner & Reception" -> "عشائیہ و تقریبِ استقبالیہ"

3. OUTPUT FORMAT:
   - Output ONLY the final Urdu script string.
   - Do NOT wrap in quotes.
   - Do NOT add explanation, notes, Roman transcription, or markdown.`;

    const userPrompt = urduOrRoman
      ? `Field context: ${dto.field || 'general'}\nReference English: "${english}"\nUser input (Roman Urdu/Urdu to transcribe): "${urduOrRoman}"`
      : `Field context: ${dto.field || 'general'}\nTranslate this English wedding text to elegant Urdu script: "${english}"`;

    // Attempt with Primary Model (llama-3.3-70b-versatile)
    try {
      this.logger.log(`Attempting Groq generation with primary model: ${PRIMARY_MODEL}`);
      const text = await this.callGroq(apiKey, PRIMARY_MODEL, systemPrompt, userPrompt);
      return {
        success: true,
        text,
        model: PRIMARY_MODEL,
        downgraded: false,
      };
    } catch (primaryErr: any) {
      const isRateLimit =
        primaryErr.status === 429 ||
        primaryErr.message?.includes('429') ||
        primaryErr.message?.toLowerCase().includes('rate limit') ||
        primaryErr.message?.toLowerCase().includes('quota');

      if (isRateLimit) {
        this.logger.warn(`Primary model ${PRIMARY_MODEL} rate limit reached. Falling back to ${FALLBACK_MODEL}...`);
        try {
          const text = await this.callGroq(apiKey, FALLBACK_MODEL, systemPrompt, userPrompt);
          return {
            success: true,
            text,
            model: FALLBACK_MODEL,
            downgraded: true,
            warning:
              'Rate limit reached for Llama 3.3 70B. Temporarily downgraded to Llama 3.1 8B. Output may have slight spelling differences.',
          };
        } catch (fallbackErr: any) {
          this.logger.error(`Fallback model ${FALLBACK_MODEL} failed: ${fallbackErr.message}`);
          throw new HttpException(
            `Groq AI Service rate limit exceeded on both primary and fallback models. Please wait a minute and try again.`,
            HttpStatus.TOO_MANY_REQUESTS,
          );
        }
      }

      // If it wasn't a rate limit error (e.g. invalid API key or bad request)
      throw new HttpException(primaryErr.message || 'Groq AI generation failed', HttpStatus.BAD_GATEWAY);
    }
  }

  private async callGroq(apiKey: string, model: string, systemPrompt: string, userPrompt: string): Promise<string> {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens: 150,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      this.logger.error(`Groq API returned HTTP ${res.status}: ${errBody}`);
      const error: any = new Error(`Groq API error HTTP ${res.status}: ${errBody}`);
      error.status = res.status;
      throw error;
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error('Groq returned empty response');
    }

    // Clean any accidental enclosing quotes
    return content.replace(/^["'«“‘]+|["'»”’]+$/g, '').trim();
  }
}
