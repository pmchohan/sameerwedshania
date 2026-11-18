import { describe, expect, it } from 'vitest';
import { generateIcsContent } from './calendar';

describe('generateIcsContent', () => {
  it('creates valid icalendar lines with correct start date and location', () => {
    const ics = generateIcsContent({
      title: 'Walima',
      date: '2099-01-03',
      time: '19:30',
      venueName: 'Grand Hall',
      venueAddress: '123 Royal Ave, Lahore',
      coupleText: 'Sameer & Hania',
    });

    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('DTSTART:20990103T193000');
    expect(ics).toContain('SUMMARY:Sameer & Hania - Walima');
    expect(ics).toContain('LOCATION:Grand Hall\\, 123 Royal Ave, Lahore');
    expect(ics).toContain('END:VCALENDAR');
  });
});
