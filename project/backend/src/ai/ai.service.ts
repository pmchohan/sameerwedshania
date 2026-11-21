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

const CANDIDATE_MODELS = [
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'qwen/qwen3.8-27b',
  'allam-2-7b',
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
];

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly config: ConfigService) {}

  async generateUrdu(dto: UrduAssistRequest): Promise<UrduAssistResponse> {
    const apiKey = dto.groqApiKey || this.config.get<string>('GROQ_API_KEY') || process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new HttpException(
        'AI Translation Key is not configured. Please set GROQ_API_KEY in .env or provide it in Admin Settings.',
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

    let lastError: any = null;

    for (let i = 0; i < CANDIDATE_MODELS.length; i++) {
      const model = CANDIDATE_MODELS[i];
      try {
        this.logger.log(`Attempting AI generation with model: ${model}`);
        const text = await this.callGroq(apiKey, model, systemPrompt, userPrompt);
        return {
          success: true,
          text,
          model,
          downgraded: i > 0,
          warning: i > 0 ? `Primary model unavailable or busy. Generated using fallback model (${model}).` : null,
        };
      } catch (err: any) {
        lastError = err;
        this.logger.warn(`Model ${model} failed (${err.message}). Trying next candidate...`);
      }
    }

    throw new HttpException(
      lastError?.message || 'AI service generation failed on all available models. Please check your API key.',
      HttpStatus.BAD_REQUEST,
    );
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
        max_tokens: 600,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      this.logger.error(`AI API returned HTTP ${res.status}: ${errBody}`);
      const error: any = new Error(`AI API error HTTP ${res.status}: ${errBody}`);
      error.status = res.status;
      throw error;
    }

    const data = await res.json();
    let content = data?.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error('AI API returned empty response');
    }

    // Clean any accidental reasoning/think tags and enclosing quotes
    content = content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
    return content.replace(/^["'«“‘]+|["'»”’]+$/g, '').trim();
  }
}
