import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import type { Guest } from '@/config/types';
import { useLang } from '@/i18n/useLang';
import { resolveGuestByCode } from '@/services/invitationApi';
import { PageLoader } from '@/components/loading/PageLoader';

/** Resolves the guest from the URL code via API (or local fallback). Unknown code returns to / with miss=true. */
export function InviteMiddleware({ code, children }: { code: string; children: (guest: Guest) => ReactNode }) {
  const [guest, setGuest] = useState<Guest | null | undefined>(undefined);
  const { setGuestLang } = useLang();

  useEffect(() => {
    let active = true;
    resolveGuestByCode(code).then((found) => {
      if (active) setGuest(found ?? null);
    });
    return () => {
      active = false;
    };
  }, [code]);

  const guestLang = guest?.lang;
  useEffect(() => {
    if (guestLang) setGuestLang(guestLang);
    return () => setGuestLang(undefined);
  }, [guestLang, setGuestLang]);

  // Loading state
  if (guest === undefined) {
    return <PageLoader />;
  }

  // Not found
  if (guest === null) {
    return <Navigate to="/" replace state={{ miss: true }} />;
  }

  return <>{children(guest)}</>;
}
