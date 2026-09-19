import type { GlobalConfig } from 'payload';

import { isAdmin } from '../access/is-admin';
import { revalidateGlobal } from '../hooks/revalidate';

/**
 * "Over ons" (`src/components/about.tsx`) — who runs the bakery, and the
 * story paragraphs. `paragraphs` is rich text rather than plain text since
 * the section is genuinely multi-paragraph prose that may grow more
 * structure later (a link, emphasis); `RichText` from
 * `@payloadcms/richtext-lexical/react` renders it back out on the frontend.
 */
export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      label: 'Ondertitel',
      admin: {
        description: 'Bijvoorbeeld de namen van de eigenaren.',
      },
    },
    {
      name: 'paragraphs',
      type: 'richText',
      required: true,
      label: 'Tekst',
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('/')],
  },
};
