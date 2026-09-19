import type { GlobalConfig } from 'payload';

import { isAdmin } from '../access/is-admin';
import { revalidateGlobal } from '../hooks/revalidate';

/**
 * The site footer (`src/components/footer.tsx`) — brand tagline, opening
 * hours, address, and socials. The contact email itself isn't duplicated
 * here: the footer reads it from the `Contact` global (see
 * `src/backend/lib/content.ts`), so there's one place to update it rather
 * than two that can drift out of sync.
 */
export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      required: true,
      label: 'Tagline',
    },
    {
      name: 'openingHours',
      type: 'array',
      required: true,
      label: 'Openingstijden',
      minRows: 1,
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
          label: 'Dag',
        },
        {
          name: 'hours',
          type: 'text',
          required: true,
          label: 'Tijden',
        },
      ],
    },
    {
      name: 'addressLine1',
      type: 'text',
      required: true,
      label: 'Adresregel 1 (straat)',
    },
    {
      name: 'addressLine2',
      type: 'text',
      required: true,
      label: 'Adresregel 2 (postcode + plaats)',
    },
    {
      name: 'instagramHandle',
      type: 'text',
      required: true,
      label: 'Instagram-gebruikersnaam (zonder @)',
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('/')],
  },
};
