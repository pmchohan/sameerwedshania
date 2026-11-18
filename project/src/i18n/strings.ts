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
  and: { en: '&', ur: 'اور' },
  muteSound: { en: 'Mute sound', ur: 'آواز بند کریں' },
  unmuteSound: { en: 'Turn sound on', ur: 'آواز چالو کریں' },
  switchLanguage: { en: 'Switch to Urdu', ur: 'انگریزی میں دیکھیں' },
  skip: { en: 'Skip', ur: 'چھوڑیے' },
  youAreInvited: { en: "You're Invited", ur: 'دعوت نامہ' },
  knockPrompt: { en: 'Tap the portal to enter', ur: 'داخل ہونے کے لیے دروازہ کھٹکھٹائیں' },
  quranVerseArabic: {
    en: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً',
    ur: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً',
  },
  quranVerseTranslation: {
    en: 'And of His signs is that He created for you spouses from among yourselves that you may find tranquility in them; and He placed between you affection and mercy.',
    ur: 'اور اس کی نشانیوں میں سے ہے کہ اس نے تمہارے لیے تمہاری ہی جنس سے جوڑے بنائے تاکہ تم ان سے سکون حاصل کرو، اور تمہارے درمیان محبت اور رحمت رکھ دی۔',
  },
  surahArRum: { en: 'Surah Ar-Rum · 30:21', ur: 'سورۃ الروم · ۳۰:۲۱' },
  withBlessings: { en: 'With the blessings of our families', ur: 'خاندان اور بزرگوں کی دعاؤں کے ساتھ' },
  schedule: { en: 'Program Timeline', ur: 'پروگرام کی تفصیل' },
  addToCalendar: { en: 'Add to calendar', ur: 'کیلنڈر میں شامل کریں' },
  countdownUntil: { en: 'Counting down to the celebration', ur: 'تقریب کے آغاز میں باقی وقت' },
  countdownDays: { en: 'Days', ur: 'دن' },
  countdownHours: { en: 'Hours', ur: 'گھنٹے' },
  countdownMinutes: { en: 'Mins', ur: 'منٹ' },
  countdownSeconds: { en: 'Secs', ur: 'سیکنڈ' },
  getInTouch: { en: 'Host Contacts & RSVP', ur: 'رابطہ اور معلومات' },
  getInTouchSub: { en: 'Feel free to reach out for any details or assistance', ur: 'کسی بھی معلومات یا رہنمائی کے لیے رابطہ فرمائیں' },
  whatsApp: { en: 'WhatsApp', ur: 'واٹس ایپ' },
  call: { en: 'Call', ur: 'کال کریں' },
  thankYou: { en: 'Thank You', ur: 'جزاک اللہ خیراً' },
  duaArabic: {
    en: 'بَارَكَ ٱللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    ur: 'بَارَكَ ٱللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
  },
  duaTranslation: {
    en: 'May Allah bless you, shower His blessings upon you, and unite you both in goodness.',
    ur: 'اللہ تعالیٰ آپ کو برکت دے، آپ پر اپنی رحمتیں نازل فرمائے اور آپ دونوں کو خیر و عافیت پر جمع رکھے۔',
  },
  closingNote: {
    en: 'Your presence and prayers are the greatest gift for us on our special day.',
    ur: 'اس پرمسرت موقع پر آپ کی تشریف آوری اور دعائیں ہمارے لیے سب سے بڑا تحفہ ہیں۔',
  },
} satisfies Record<string, Pair>;

export type StringKey = keyof typeof STRINGS;

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}
