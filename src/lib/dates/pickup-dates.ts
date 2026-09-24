// Resolving a pickup *day name* ("Zaterdag") to the actual upcoming *date* it
// refers to. Used in two places that must agree: the checkout form (shows the
// date next to each day option) and the order server action (writes it into
// the bakery's email). Both anchor to the Amsterdam timezone, below, so they
// resolve to the same calendar day regardless of where the visitor or the
// server happens to be.

const AMSTERDAM_TZ = 'Europe/Amsterdam';

// Dutch weekday names → JS day index (0 = Sunday … 6 = Saturday).
const DUTCH_WEEKDAY_INDEX: Record<string, number> = {
  zondag: 0,
  maandag: 1,
  dinsdag: 2,
  woensdag: 3,
  donderdag: 4,
  vrijdag: 5,
  zaterdag: 6,
};

/**
 * Today's calendar date in the Amsterdam timezone, returned as a UTC-anchored
 * `Date` (a plain calendar-date container whose clock is midnight UTC). Working
 * from the Amsterdam calendar day — not the runtime's local one — is what lets
 * the client and the server resolve the same date.
 */
function amsterdamToday(now: Date): Date {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: AMSTERDAM_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const part = (type: string) =>
    Number(parts.find(entry => entry.type === type)?.value);
  return new Date(Date.UTC(part('year'), part('month') - 1, part('day')));
}

/**
 * The next calendar date (today or later) whose weekday matches `dayName` — a
 * Dutch weekday name like "Zaterdag", matched case-insensitively — anchored to
 * the Amsterdam timezone. Returns `null` when `dayName` isn't a recognized
 * weekday, so a free-text CMS value that isn't a day (e.g. "Op afspraak") shows
 * no date rather than a wrong one.
 */
export function nextPickupDate(
  dayName: string,
  now: Date = new Date(),
): Date | null {
  const target = DUTCH_WEEKDAY_INDEX[dayName.trim().toLowerCase()];
  if (target === undefined) {
    return null;
  }
  const date = amsterdamToday(now);
  const delta = (target - date.getUTCDay() + 7) % 7;
  date.setUTCDate(date.getUTCDate() + delta);
  return date;
}

type MonthStyle = 'short' | 'long';

/**
 * Formats a pickup date in Dutch as "26 sep." (`short`) or "26 september"
 * (`long`). Reads the date back in UTC to match how `nextPickupDate` anchors
 * it, so the formatted day never drifts by one under a different runtime tz.
 */
export function formatPickupDate(
  date: Date,
  month: MonthStyle = 'short',
): string {
  return new Intl.DateTimeFormat('nl-NL', {
    timeZone: 'UTC',
    day: 'numeric',
    month,
  }).format(date);
}

/**
 * Convenience for the common case: a day name → its label with the resolved
 * date appended ("Zaterdag 26 sep."), or just the name back when it doesn't
 * resolve to a weekday.
 */
export function pickupDayLabel(
  dayName: string,
  month: MonthStyle = 'short',
  now: Date = new Date(),
): string {
  const date = nextPickupDate(dayName, now);
  return date ? `${dayName} ${formatPickupDate(date, month)}` : dayName;
}
