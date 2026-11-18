// THE file the owner edits: couple, events and guests. Routes are built from `guests`.
// Dates, times and venues below are obvious placeholders (year 2099, "TODO"); replace them.
import type { Couple, EventKey, Guest, WeddingEvent } from './types';

export const couple: Couple = {
  groom: { en: 'Sameer', ur: 'سمیر' },
  bride: { en: 'Hania', ur: 'ہانیہ' },
};

export const events: Record<EventKey, WeddingEvent> = {
  mehndi: {
    title: { en: 'Mehndi', ur: 'مہندی' },
    date: '2027-03-19',
    time: '16:00',
    venue: {
      name: 'TODO: Chohan\'s House',
      address: 'st4 Awami Colony, behind General Hospital, Lahore',
      mapUrl: 'https://maps.app.goo.gl/Pkje8We1XD9ZGDKF9',
    },
    dressCode: 'As you wish!',
    schedule: [
      { time: '17:00', title: { en: 'Guest Arrival', ur: 'مہمانوں کی آمد' } },
      { time: '18:00', title: { en: 'Mehndi Ceremony & Rasam', ur: 'مہندی کی رسم' } },
      { time: '19:00', title: { en: 'Dholki', ur: 'دھولکی' } },
      { time: '20:00', title: { en: 'Dinner & Music', ur: 'کھانا اور محفلِ موسیقی' } },
    ],
  },
  barat: {
    title: { en: 'Barat', ur: 'بارات' },
    date: '2027-03-20',
    time: '18:00',
    venue: {
      name: 'TBD',
      address: 'TBD',
      mapUrl: 'https://maps.google.com/',
    },
    schedule: [
      // { time: '18:00', title: { en: 'Barat Arrival', ur: 'بارات کی آمد' } },
      // { time: '19:00', title: { en: 'Nikah Ceremony', ur: 'تقریبِ نکاح' } },
      // { time: '20:00', title: { en: 'Dinner is served', ur: 'کھانے کا اہتمام' } },
      // { time: '21:30', title: { en: 'Rukhsati', ur: 'رخصتی' } },
    ],
  },
  walima: {
    title: { en: 'Walima', ur: 'ولیمہ' },
    date: '2027-03-21',
    time: '19:30',
    venue: {
      name: 'TODO: venue name',
      address: 'TODO: full address',
      mapUrl: 'https://maps.google.com/',
    },
    dressCode: 'TODO: dress code',
    schedule: [
      { time: '19:30', title: { en: 'Gates Open & Reception', ur: 'آمد اور خیر مقدم' } },
      { time: '20:15', title: { en: "Couple's Grand Entrance", ur: 'دولہا دلہن کا استقبال' } },
      { time: '21:00', title: { en: 'Dinner is served', ur: 'شاہی طعام' } },
    ],
  },
};

export const families = {
  groomParents: { en: 'Mr. & Mrs. Chohan', ur: 'مسٹر اور مسز چوہان' },
  brideParents: { en: 'Mr. & Mrs. Nasir', ur: 'مسٹر اور مسز ناصر' },
  line: {
    en: 'Together with their families and elders, Sameer & Hania invite you to share their joy.',
    ur: 'اپنے خاندانوں اور بزرگوں کی دعاؤں کے ساتھ، سمیر اور ہانیہ آپ کو اپنی شادی کے مسرت انگیز لمحات میں شرکت کی دعوت دیتے ہیں۔',
  },
};

export const hosts = [
  {
    name: { en: 'Hamza Chohan', ur: 'حمزہ چوہان' },
    role: { en: "Groom's Brother", ur: 'دولہا کے بھائی' },
    phone: '+92 300 1234567',
    whatsapp: '923001234567',
  },
  {
    name: { en: 'Usman Malik', ur: 'عثمان ملک' },
    role: { en: "Bride's Brother", ur: 'دلہن کے بھائی' },
    phone: '+92 300 7654321',
    whatsapp: '923007654321',
  },
];

export const guests: Guest[] = [
  // Owner's example: Ali is invited to the walima only.
  { code: 'achunp', name: { en: 'Ali', ur: 'علی' }, events: ['walima'] },
  { code: 'xzzium', name: { en: 'Ahmed', ur: 'احمد' }, events: ['mehndi', 'walima', 'barat'] },
  // Add test guests here while working; remove them before a public deploy.
];
