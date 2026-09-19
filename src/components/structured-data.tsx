import { getContact, getFooter } from '@/backend/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// schema.org day names, keyed by the Dutch day labels used in the Footer
// global's opening-hours list.
const DAY_MAP: Record<string, string> = {
  maandag: 'Monday',
  dinsdag: 'Tuesday',
  woensdag: 'Wednesday',
  donderdag: 'Thursday',
  vrijdag: 'Friday',
  zaterdag: 'Saturday',
  zondag: 'Sunday',
};

// "9.00" / "14.30" → "09:00" / "14:30"; null if it can't be parsed.
const toIsoTime = (value: string): string | null => {
  const match = value.trim().match(/^(\d{1,2})[.:](\d{2})$/);
  if (!match) {
    return null;
  }
  return `${match[1].padStart(2, '0')}:${match[2]}`;
};

// "9.00 - 14.00" (any dash) → { opens, closes }; null if unparseable.
const parseHours = (hours: string) => {
  const [openPart, closePart] = hours.split(/\s*[-–—]\s*/);
  if (!openPart || !closePart) {
    return null;
  }
  const opens = toIsoTime(openPart);
  const closes = toIsoTime(closePart);
  return opens && closes ? { opens, closes } : null;
};

// "1349 EK Almere" → { postalCode: "1349 EK", addressLocality: "Almere" }.
const parseCityLine = (line: string) => {
  const match = line.trim().match(/^(\d{4}\s?[A-Za-z]{2})\s+(.+)$/);
  if (!match) {
    return { addressLocality: line.trim() };
  }
  return { postalCode: match[1], addressLocality: match[2] };
};

/**
 * Server-rendered JSON-LD describing the bakery as a schema.org `Bakery`
 * (a LocalBusiness). All values come from the Payload globals — the same
 * source the visible footer/contact use — so structured data can't drift from
 * the page. High-value for a local business's search presence.
 */
export async function StructuredData() {
  const [footer, contact] = await Promise.all([getFooter(), getContact()]);

  const openingHoursSpecification = footer.openingHours
    .map(entry => {
      const dayOfWeek = DAY_MAP[entry.day.trim().toLowerCase()];
      const parsed = parseHours(entry.hours);
      if (!dayOfWeek || !parsed) {
        return null;
      }
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek,
        opens: parsed.opens,
        closes: parsed.closes,
      };
    })
    .filter(entry => entry !== null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'Bakkerij de Tureluur',
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    email: contact.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: footer.addressLine1,
      ...parseCityLine(footer.addressLine2),
      addressCountry: 'NL',
    },
    sameAs: footer.instagramHandle
      ? [`https://www.instagram.com/${footer.instagramHandle}`]
      : undefined,
    openingHoursSpecification:
      openingHoursSpecification.length > 0
        ? openingHoursSpecification
        : undefined,
  };

  return (
    <script
      type="application/ld+json"
      // `<` guards against a stray "</script>" in any CMS value breaking
      // out of the tag; JSON.stringify drops the `undefined` fields above.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}
