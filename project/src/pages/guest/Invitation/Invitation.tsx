import { useEffect, useState } from 'react';
import { SiteLayout } from '@/layouts/SiteLayout/SiteLayout';
import { InviteMiddleware } from '@/middleware/InviteMiddleware';
import { useScrollLock } from '@/hooks/useScrollLock';
import { ScrollCue } from './components/ScrollCue';
import type { Phase } from './phase';
import ClosingSection from './sections/ClosingSection';
import EventsSection from './sections/EventsSection';
import HeroSection from './sections/HeroSection';

/** Time for the tiles to lock in and the niche to fill, before the page starts to scroll. */
const BUILD_MS = 2800;
const REDUCED_MOTION_MS = 400;

// Dev only: open /<code>#open to skip the tap while working on the sections below the hero.
const startPhase = (): Phase => (import.meta.env.DEV && window.location.hash === '#open' ? 'open' : 'closed');

export default function Invitation({ code }: { code: string }) {
  const [phase, setPhase] = useState<Phase>(startPhase);
  useScrollLock(phase !== 'open');

  useEffect(() => {
    if (phase !== 'locking') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setPhase('open'), reduced ? REDUCED_MOTION_MS : BUILD_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <SiteLayout>
      <InviteMiddleware code={code}>
        {(guest) => (
          <>
            <HeroSection guest={guest} phase={phase} onOpen={() => setPhase((current) => (current === 'closed' ? 'locking' : current))} />
            <EventsSection guest={guest} />
            <ClosingSection />
            <ScrollCue active={phase === 'open'} />
          </>
        )}
      </InviteMiddleware>
    </SiteLayout>
  );
}
