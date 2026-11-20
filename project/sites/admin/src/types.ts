export interface Invitation {
  id: number;
  code: string;
  name: string;
  nameUr?: string;
  events: string[];
  note?: string;
  noteUr?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvitationInput {
  code?: string;
  name: string;
  nameUr?: string;
  events: string[];
  note?: string;
  noteUr?: string;
}

export interface ScheduleItem {
  time: string;
  title: { en: string; ur: string };
}

export interface WeddingEventDetails {
  title: { en: string; ur: string };
  date: string;
  time: string;
  venue: {
    name: string;
    address: string;
    mapUrl: string;
    illustration?: string;
  };
  dressCode?: string;
  schedule?: ScheduleItem[];
}

export interface WeddingSettings {
  couple?: {
    groom: { en: string; ur: string };
    bride: { en: string; ur: string };
  };
  families?: {
    groomParents: { en: string; ur: string };
    brideParents: { en: string; ur: string };
    line: { en: string; ur: string };
  };
  events?: {
    mehndi?: WeddingEventDetails;
    barat?: WeddingEventDetails;
    walima?: WeddingEventDetails;
  };
  hosts?: Array<{
    name: { en: string; ur: string };
    role: { en: string; ur: string };
    phone: string;
    whatsapp: string;
  }>;
}
