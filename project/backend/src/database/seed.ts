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
