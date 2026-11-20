import { EventCard } from '@/components/cards/EventCard';
import { visibleEvents } from '@/config/lookup';
import type { Guest } from '@/config/types';
import { useWeddingContent } from '@/config/WeddingContentContext';

/** Only this guest's own events, one tile panel each, in fixed order. */
export default function EventsSection({ guest }: { guest: Guest }) {
  const { events } = useWeddingContent();
  const shown = visibleEvents(guest, events);
  return (
    <>
      {shown.map(({ key, event }) => (
        <EventCard key={key} eventKey={key} event={event} light="night" />
      ))}
    </>
  );
}
