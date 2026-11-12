import { useEffect, useState } from 'react';
import { SiteLayout } from '@/layouts/SiteLayout/SiteLayout';
import { InviteMiddleware } from '@/middleware/InviteMiddleware';
import { useScrollLock } from '@/hooks/useScrollLock';
import type { Phase } from './phase';
import ClosingSection from './sections/ClosingSection';
import EventsSection from './sections/EventsSection';
import HeroSection from './sections/HeroSection';

/** Time for the tiles to lock in and the niche to fill, before the page starts to scroll. */
const BUILD_MS = 2800;
const REDUCED_MOTION_MS = 400;

// Dev only: open /<code>#open to skip the tap while working on the sections below the hero.
const startPhase = (): Phase => (import.meta.env.DEV && window.location.hash.startsWith('#open') ? 'open' : 'closed');

export default function Invitation({ code }: { code: string }) {
  const [phase, setPhase] = useState<Phase>(startPhase);
  useScrollLock(phase !== 'open');

  useEffect(() => {
    if (phase !== 'locking') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setPhase('open'), reduced ? REDUCED_MOTION_MS : BUILD_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

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
      <InviteMiddleware code={code}>
        {(guest) => (
          <>
            <HeroSection guest={guest} phase={phase} onOpen={() => setPhase((current) => (current === 'closed' ? 'locking' : current))} />
            <EventsSection guest={guest} />
            <ClosingSection />
          </>
        )}
      </InviteMiddleware>
    </SiteLayout>
  );
}
