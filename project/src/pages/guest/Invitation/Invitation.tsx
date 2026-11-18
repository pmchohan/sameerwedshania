import { useEffect, useState } from 'react';
import { SiteLayout } from '@/layouts/SiteLayout/SiteLayout';
import { InviteMiddleware } from '@/middleware/InviteMiddleware';
import { OPEN_MS, useTheme } from '@/theme/theme';
import { useScrollLock } from '@/hooks/useScrollLock';
import type { Phase } from './phase';
import ClosingSection from './sections/ClosingSection';
import { ContactSection } from './sections/ContactSection';
import { CountdownSection } from './sections/CountdownSection';
import EventsSection from './sections/EventsSection';
import OpeningHero from './sections/OpeningHero';
import { VerseSection } from './sections/VerseSection';
import { PageLoader } from '@/components/loading/PageLoader';

const REDUCED_MOTION_MS = 400;

// Dev only: open /<code>#open to skip the tap while working on the sections below the hero.
const startPhase = (): Phase => (import.meta.env.DEV && window.location.hash.startsWith('#open') ? 'open' : 'closed');

export default function Invitation({ code }: { code: string }) {
  const theme = useTheme();
  const [phase, setPhase] = useState<Phase>(startPhase);
  useScrollLock(phase !== 'open');

  useEffect(() => {
    if (phase !== 'locking') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setPhase('open'), reduced ? REDUCED_MOTION_MS : OPEN_MS[theme]);
    return () => window.clearTimeout(timer);
  }, [phase, theme]);

  // Dev only: #open skips the tap; #open=<n> also jumps to the nth section below the hero
  // (1..3 events, 4 closing) and settles transitions, so headless screenshots are deterministic.
  // The jump runs on load, after the browser's own load-time scroll reset.
  useEffect(() => {
    if (!import.meta.env.DEV || phase !== 'open' || !window.location.hash.startsWith('#open')) return;
    const jump = () => {
      const style = document.createElement('style');
      style.textContent = '*{transition-duration:0s!important;transition-delay:0s!important;animation-delay:0s!important}html{scroll-behavior:auto!important}';
      document.head.append(style);
      const index = Number(window.location.hash.split('=')[1]);
      const target = document.querySelectorAll('main > section')[index] as HTMLElement | undefined;
      if (target) window.scrollTo({ top: target.offsetTop, behavior: 'auto' });
    };
    if (document.readyState === 'complete') jump();
    else {
      window.addEventListener('load', jump, { once: true });
      return () => window.removeEventListener('load', jump);
    }
  }, [phase]);

  return (
    <SiteLayout>
      <PageLoader />
      <InviteMiddleware code={code}>
        {(guest) => (
          <>
            <OpeningHero
              guest={guest}
              phase={phase}
              onOpen={() => setPhase((current) => (current === 'closed' ? 'locking' : current))}
              onSkip={() => setPhase('open')}
            />
            <VerseSection guest={guest} />
            <CountdownSection guest={guest} />
            <EventsSection guest={guest} />
            <ContactSection />
            <ClosingSection />
          </>
        )}
      </InviteMiddleware>
    </SiteLayout>
  );
}
