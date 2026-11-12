import { EventCard } from '@/components/cards/EventCard';
import { events } from '@/config/invitation.config';
import { visibleEvents } from '@/config/lookup';
import type { Guest } from '@/config/types';
import { lightFor } from '@/lib/light';

/** Only this guest's own events, one tile panel each, in fixed order. */
export default function EventsSection({ guest }: { guest: Guest }) {
  const shown = visibleEvents(guest, events);
  return (
    <>
      {shown.map(({ key, event }, index) => (
        <EventCard key={key} event={event} light={lightFor(index, shown.length)} />
      ))}
    </>
  );
}
