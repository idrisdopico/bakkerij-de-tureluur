import type { GlobalConfig } from 'payload';

import { isAdmin } from '../access/is-admin';
import { revalidateGlobal } from '../hooks/revalidate';

/**
 * The `#contact` section (`src/components/contact.tsx`). Just a copy line
 * and the email address — see that component's own comment for why this is
 * plain, prominent text rather than a `mailto:`-driven form.
 *
 * `email` is the single source of truth for the bakery's contact address:
 * `Footer` reads it from here too (see `src/backend/lib/content.ts`) rather
 * than storing its own copy, so there's exactly one place to update it.
 */
export const Contact: GlobalConfig = {
  slug: 'contact',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'copy',
      type: 'text',
      required: true,
      label: 'Introtekst',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-mailadres',
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('/')],
  },
};
