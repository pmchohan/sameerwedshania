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
      name: 'Chohan\'s House',
      address: 'st4 Awami Colony, behind General Hospital, Lahore',
      mapUrl: 'https://maps.google.com/?q=31.458174,74.347137+(Chohan%27s+House)',
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
      name: 'Mughal-e-Azam Banquet Complex',
      address: 'Usmani Rd, Aibak Block Garden Town, Lahore',
      // mapUrl: 'https://maps.google.com/?q=31.499739,74.317199+(Mughal-e-Azam+Banquet+Complex)',
      mapUrl: 'https://maps.app.goo.gl/GK1YJqsHSk7tXnNH6',
      illustration: 'assets/img/mughal-e-azam-hall.webp',
    },
    dressCode: 'As you wish!',
    schedule: [
      { time: '19:30', title: { en: 'Gates Open & Reception', ur: 'آمد اور خیر مقدم' } },
      { time: '20:15', title: { en: "Couple's Grand Entrance", ur: 'دولہا دلہن کا استقبال' } },
      { time: '21:00', title: { en: 'Dinner is served', ur: 'شاہی طعام' } },
    ],
  },
};

export const families = {
  groomParents: { en: 'Mr. & Mrs. Chohan', ur: 'فیصل صاحب اور بیگم' },
  brideParents: { en: 'Mr. & Mrs. Asim', ur: 'عاصم صاحب اور بیگم' },
  line: {
    en: 'Sameer & Hania invite you to share their joy.',
    ur: 'سمیر اور ہانیہ آپ کو اپنی شادی کے مسرت انگیز لمحات میں شرکت کی دعوت دیتے ہیں۔',
  },
};

export const hosts = [
  {
    name: { en: 'Faisal Abdul Qayyum', ur: 'فیصل عبد القیوم' },
    role: { en: "Groom's Father", ur: 'دولہے کے والد' },
    phone: '+92 323 7417757',
    whatsapp: '923237417757',
  },
  {
    name: { en: 'Abdullah Faisal', ur: 'عَبْدُاللّٰهُ فَيْصَلُ' },
    role: { en: "Groom's Brother", ur: 'دولہے کے بھائی' },
    phone: '+92 306 1569919',
    whatsapp: '923061569919',
  },
];

export const guests: Guest[] = [
  // Owner's example: Ali is invited to the walima only.
  { code: 'achunp', name: { en: 'Ali', ur: 'علی' }, events: ['walima'] },
  { code: 'xzzium', name: { en: 'Ahmed', ur: 'احمد' }, events: ['mehndi', 'walima', 'barat'] },
  // Add test guests here while working; remove them before a public deploy.
];
