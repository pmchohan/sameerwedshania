/** Generates and downloads an iCalendar (.ics) file for an event. */
export function generateIcsContent(event: {
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  venueName: string;
  venueAddress: string;
  coupleText: string;
}): string {
  const [year, month, day] = event.date.split('-');
  const [hours, minutes] = event.time.split(':');
  const dtStart = `${year}${month}${day}T${hours}${minutes}00`;
  
  // Calculate end time approx 3.5 hours later
  const endHour = String((Number(hours) + 3) % 24).padStart(2, '0');
  const dtEnd = `${year}${month}${day}T${endHour}${minutes}00`;
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sameer & Hania Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${event.date}-${event.time}@sameerwedshania`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${event.coupleText} - ${event.title}`,
    `DESCRIPTION:${event.title} ceremony for ${event.coupleText}.\\nVenue: ${event.venueName}\\, ${event.venueAddress}`,
    `LOCATION:${event.venueName}\\, ${event.venueAddress}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadCalendarEvent(event: {
  title: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  coupleText: string;
}) {
  const ics = generateIcsContent(event);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.title.toLowerCase().replace(/\s+/g, '-')}-sameer-hania.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
