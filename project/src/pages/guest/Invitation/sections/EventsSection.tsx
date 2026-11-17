import { EventCard } from '@/components/cards/EventCard';
import { events } from '@/config/invitation.config';
import { visibleEvents } from '@/config/lookup';
import type { Guest } from '@/config/types';
import { lightFor } from '@/lib/light';
import { useTheme } from '@/theme/theme';

/** Only this guest's own events, one tile panel each, in fixed order. */
export default function EventsSection({ guest }: { guest: Guest }) {
  const theme = useTheme();
  const shown = visibleEvents(guest, events);
  return (
    <>
      {shown.map(({ key, event }, index) => (
        <EventCard key={key} event={event} light={theme === 'darwaza' ? 'night' : lightFor(index, shown.length)} />
      ))}
    </>
  );
}
