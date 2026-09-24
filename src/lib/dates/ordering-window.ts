// When online ordering is open. Pickup is at the weekend and Monday morning is
// when the week's stock is set, so ordering is shut from Saturday through
// Monday noon and open Monday noon until the end of Friday. Anchored to
// Amsterdam time so the answer doesn't depend on where the visitor or the
// server sits. Used live on the client (a statically-rendered page can't bake
// in a time-dependent answer) and again in the order action (the authority).

const AMSTERDAM_TZ = 'Europe/Amsterdam';

// Ordering opens Monday at this hour (Amsterdam local time).
const MONDAY_OPEN_HOUR = 12;

// Intl's `weekday: 'short'` (en-US) values, indexed to JS getDay() order.
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function amsterdamNow(now: Date): { weekday: number; hour: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: AMSTERDAM_TZ,
    weekday: 'short',
    hour: '2-digit',
    // h23 gives 00–23 (avoids the "24" some locales emit at midnight).
    hourCycle: 'h23',
  }).formatToParts(now);
  const weekday = WEEKDAYS.indexOf(
    parts.find(part => part.type === 'weekday')?.value ?? '',
  );
  const hour = Number(parts.find(part => part.type === 'hour')?.value);
  return { weekday, hour };
}

/**
 * Whether online ordering is currently open: closed all day Saturday and
 * Sunday and Monday before 12:00, open Monday 12:00 through the end of Friday.
 */
export function isOrderingOpen(now: Date = new Date()): boolean {
  const { weekday, hour } = amsterdamNow(now);
  if (weekday === 6 || weekday === 0) {
    return false; // Saturday, Sunday
  }
  if (weekday === 1 && hour < MONDAY_OPEN_HOUR) {
    return false; // Monday before 12:00
  }
  return true;
}
