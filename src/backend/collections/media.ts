import type { CollectionConfig } from 'payload';

import { isAdmin } from '../access/is-admin';

/**
 * Backs every image used across the editable sections (the hero background,
 * product photos). Where the files actually land — local disk in
 * development, Vercel Blob in production — is decided once, by the
 * conditional storage plugin in `payload.config.ts`; this collection only
 * describes the shape of an upload (plus the alt text every image needs),
 * not where it's stored.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    // Public site pages need to read images unauthenticated.
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Alt text for screen readers and SEO — describe what the photo shows, not just its filename.',
      },
    },
  ],
};
