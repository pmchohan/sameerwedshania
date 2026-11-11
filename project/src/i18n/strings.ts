import type { Lang } from '@/config/types';

type Pair = Record<Lang, string>;

/** Label of each language, written in that language (shown on the toggle). */
export const LANGUAGE_NAME: Pair = { en: 'English', ur: 'اردو' };

// Fixed interface text. {name} placeholders are filled with `fill`.
// The Urdu lines are drafts and need a native reader's review before launch.
export const STRINGS = {
  title: { en: "{groom} & {bride} — you're invited", ur: '{groom} اور {bride} — آپ مدعو ہیں' },
  inviteLine: {
    en: 'Together with their families, {groom} and {bride} invite you to celebrate their wedding.',
    ur: 'اپنے خاندانوں کے ہمراہ {groom} اور {bride} آپ کو اپنی شادی کی خوشیوں میں شریک ہونے کی دعوت دیتے ہیں۔',
  },
  invitationFor: { en: 'Invitation for', ur: 'دعوت نامہ برائے' },
  tapToOpen: { en: 'Tap to open', ur: 'کھولنے کے لیے ٹیپ کریں' },
  scroll: { en: 'Scroll', ur: 'نیچے سکرول کریں' },
  time: { en: 'Time', ur: 'وقت' },
  venue: { en: 'Venue', ur: 'مقام' },
  dressCode: { en: 'Dress code', ur: 'ڈریس کوڈ' },
  viewOnMap: { en: 'View on map', ur: 'نقشے پر دیکھیں' },
  codeLabel: { en: 'Invitation code', ur: 'دعوتی کوڈ' },
  codePrompt: { en: 'Enter the invitation code you were sent.', ur: 'آپ کو بھیجا گیا دعوتی کوڈ درج کریں۔' },
  codeSubmit: { en: 'Open invitation', ur: 'دعوت نامہ کھولیں' },
  codeError: {
    en: "We couldn't find that code. Please check the message you received and try again.",
    ur: 'یہ کوڈ نہیں ملا۔ براہِ کرم موصول ہونے والا پیغام دیکھ کر دوبارہ کوشش کریں۔',
  },
  closing: { en: 'We look forward to celebrating with you.', ur: 'ہم آپ کے ساتھ خوشیاں بانٹنے کے منتظر ہیں۔' },
  switchLanguage: { en: 'Switch to Urdu', ur: 'انگریزی میں دیکھیں' },
} satisfies Record<string, Pair>;

export type StringKey = keyof typeof STRINGS;

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}
