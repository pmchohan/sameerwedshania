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

export interface WeddingSettings {
  couple?: {
    groom: { en: string; ur: string };
    bride: { en: string; ur: string };
  };
  hosts?: Array<{
    name: { en: string; ur: string };
    role: { en: string; ur: string };
    phone: string;
    whatsapp: string;
  }>;
}
