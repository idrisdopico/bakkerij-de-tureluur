import type { GlobalConfig } from 'payload';

import { isAdmin } from '../access/is-admin';
import { revalidateGlobal } from '../hooks/revalidate';

/**
 * "Onze uitgangspunten" (`src/components/principles.tsx`) — an ordered list
 * of principles plus a closing tagline. Numbering (01, 02, ...) stays
 * computed from the array's position in the frontend, same as today; nothing
 * here stores a number, so reordering items in the admin panel is all it
 * takes to renumber them.
 */
export const Principles: GlobalConfig = {
  slug: 'principles',
  // Explicit, rather than relying on Payload's singularization of the
  // `principles` slug (which generates `Principle`) — keeps the generated
  // `payload-types.ts` name `Principles`, matching this global, its
  // `getPrinciples()` accessor and `src/components/principles.tsx`.
  typescript: {
    interface: 'Principles',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Uitgangspunten',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      label: 'Slotzin',
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('/')],
  },
};
