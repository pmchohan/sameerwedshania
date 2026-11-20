import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Invitation } from '../invitations/entities/invitation.entity';
import { WeddingSetting } from '../settings/entities/setting.entity';

config();

const INITIAL_GUESTS = [
  { code: 'achunp', name: 'Ali', nameUr: 'علی', events: ['walima'] },
  { code: 'xzzium', name: 'Ahmed', nameUr: 'احمد', events: ['mehndi', 'walima', 'barat'] },
];

const INITIAL_SETTINGS = [
  {
    key: 'couple',
    value: JSON.stringify({
      groom: { en: 'Sameer', ur: 'سمیر' },
      bride: { en: 'Hania', ur: 'ہانیہ' },
    }),
  },
  {
    key: 'families',
    value: JSON.stringify({
      groomParents: { en: 'Mr. & Mrs. Chohan', ur: 'فیصل صاحب اور بیگم' },
      brideParents: { en: 'Mr. & Mrs. Asim', ur: 'عاصم صاحب اور بیگم' },
      line: {
        en: 'Sameer & Hania invite you to share their joy.',
        ur: 'سمیر اور ہانیہ آپ کو اپنی شادی کے مسرت انگیز لمحات میں شرکت کی دعوت دیتے ہیں۔',
      },
    }),
  },
  {
    key: 'events',
    value: JSON.stringify({
      mehndi: {
        title: { en: 'Mehndi', ur: 'مہندی' },
        date: '2027-03-19',
        time: '16:00',
        venue: {
          name: "Chohan's House",
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
        dressCode: 'As you wish!',
        schedule: [],
      },
      walima: {
        title: { en: 'Walima', ur: 'ولیمہ' },
        date: '2027-03-21',
        time: '19:30',
        venue: {
          name: 'Mughal-e-Azam Banquet Complex',
          address: 'Usmani Rd, Aibak Block Garden Town, Lahore',
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
    }),
  },
  {
    key: 'hosts',
    value: JSON.stringify([
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
    ]),
  },
];

async function seed() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USERNAME || 'wedding_user',
    password: process.env.DB_PASSWORD || 'WeddingSecurePass2026!',
    database: process.env.DB_NAME || 'wedding_db',
    entities: [Invitation, WeddingSetting],
    synchronize: true,
  });

  await dataSource.initialize();
  console.log('Database connected for seeding.');

  const invRepo = dataSource.getRepository(Invitation);
  for (const g of INITIAL_GUESTS) {
    const existing = await invRepo.findOne({ where: { code: g.code } });
    if (!existing) {
      await invRepo.save(invRepo.create(g));
      console.log(`Seeded guest: ${g.name} (${g.code})`);
    }
  }

  const settingRepo = dataSource.getRepository(WeddingSetting);
  for (const s of INITIAL_SETTINGS) {
    const existing = await settingRepo.findOne({ where: { key: s.key } });
    if (!existing) {
      await settingRepo.save(settingRepo.create(s));
      console.log(`Seeded setting: ${s.key}`);
    }
  }

  await dataSource.destroy();
  console.log('Seeding finished successfully.');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
