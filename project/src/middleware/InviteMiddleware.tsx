import { useEffect, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { guests } from '@/config/invitation.config';
import { findGuest } from '@/config/lookup';
import type { Guest } from '@/config/types';
import { useLang } from '@/i18n/useLang';

/** Resolves the guest from the URL code. Unknown code goes back to the code screen with a message. */
export function InviteMiddleware({ code, children }: { code: string; children: (guest: Guest) => ReactNode }) {
  const guest = findGuest(code, guests);
  const { setGuestLang } = useLang();
  const guestLang = guest?.lang;

  useEffect(() => {
    setGuestLang(guestLang);
    return () => setGuestLang(undefined);
  }, [guestLang, setGuestLang]);

  if (!guest) return <Navigate to="/" replace state={{ miss: true }} />;
  return <>{children(guest)}</>;
}
