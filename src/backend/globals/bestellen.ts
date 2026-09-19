import type { GlobalConfig } from 'payload';

import { isAdmin } from '../access/is-admin';
import { revalidateGlobal } from '../hooks/revalidate';

/**
 * Settings for the order feature (`src/components/cart/*`): whether ordering
 * is enabled at all, which days a customer may pick up on, and the pickup
 * policy shown at checkout. Everything here is deliberately editable in
 * `/admin` so the owner can change the rules (add a pickup day, reword the
 * "collect before 13:00" note, or switch ordering off) without a code change.
 *
 * The pickup days are the single source of truth for both the checkout day
 * options and the server-side allow-list `submit-order.ts` validates against,
 * so a customer can never submit a day the owner hasn't offered.
 */
export const Bestellen: GlobalConfig = {
  slug: 'bestellen',
  // Explicit interface name, like the other collections/globals, so the
  // generated `payload-types.ts` name stays `Bestellen` for content.ts.
  typescript: {
    interface: 'Bestellen',
  },
  access: {
    // The public checkout reads these settings unauthenticated.
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'ordersEnabled',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      label: 'Bestellen ingeschakeld',
      admin: {
        description:
          'Zet uit om het winkelmandje en bestelformulier tijdelijk van de site te halen.',
      },
    },
    {
      name: 'pickupDays',
      type: 'array',
      required: true,
      label: 'Afhaaldagen',
      minRows: 1,
      admin: {
        description:
          'De dagen waarop klanten hun bestelling kunnen afhalen — de klant kiest er één bij het bestellen.',
      },
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
          label: 'Dag',
        },
      ],
    },
    {
      name: 'pickupPolicy',
      type: 'textarea',
      required: true,
      label: 'Afhaalvoorwaarden',
      admin: {
        description:
          'Korte toelichting die de klant bij het bestellen ziet (bijvoorbeeld over het tijdstip van afhalen).',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('/')],
  },
};
