import type { GlobalConfig } from 'payload';

import { isAdmin } from '../access/is-admin';
import { revalidateGlobal } from '../hooks/revalidate';

/**
 * The `#assortiment` section's surrounding copy (`src/components/
 * assortiment.tsx`) — its two intro blocks and the "Overzicht assortiment"
 * heading. The individual products themselves are the separate `Products`
 * collection, not modeled here, since they're a repeated list rather than a
 * fixed block of prose.
 */
export const Assortiment: GlobalConfig = {
  slug: 'assortiment',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'introOneHeading',
      type: 'text',
      required: true,
      label: 'Titel intro 1',
    },
    {
      name: 'introOne',
      type: 'richText',
      required: true,
      label: 'Intro 1',
    },
    {
      name: 'introTwoHeading',
      type: 'text',
      required: true,
      label: 'Titel intro 2',
    },
    {
      name: 'introTwo',
      type: 'richText',
      required: true,
      label: 'Intro 2',
    },
    {
      name: 'overviewHeading',
      type: 'text',
      required: true,
      label: 'Titel productoverzicht',
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('/')],
  },
};
