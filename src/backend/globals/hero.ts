import type { GlobalConfig } from 'payload';

import { isAdmin } from '../access/is-admin';
import { revalidateGlobal } from '../hooks/revalidate';

/**
 * The homepage's `#home` section (`src/components/hero.tsx`) — headline,
 * tagline, and the background photo. The two call-to-action buttons stay
 * hard-coded in the component (they're structural: a `mailto:` link and a
 * `#assortiment` in-page anchor, not prose), so only what's genuinely
 * editable "text and images" is modeled here.
 */
export const Hero: GlobalConfig = {
  slug: 'hero',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Titel (H1)',
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      label: 'Tagline',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Achtergrondfoto',
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('/')],
  },
};
