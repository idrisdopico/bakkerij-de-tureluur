import type { CollectionConfig } from 'payload';

import { isAdmin } from '../access/is-admin';
import {
  revalidateCollectionChange,
  revalidateCollectionDelete,
} from '../hooks/revalidate';

/**
 * The assortiment's product list (`src/components/assortiment.tsx`'s
 * `PRODUCTS` array today) — the one section that's a repeated list of
 * documents rather than a single block of text, so it's a Collection, not a
 * Global like every other section. `foto` is optional: without one, the
 * public site falls back to `ProductImagePlaceholder`, same as it does today
 * for every product (see `src/components/product-card.tsx`).
 */
export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'naam',
    defaultColumns: ['order', 'naam', 'gewicht'],
  },
  // Default field to sort the admin list view by (a top-level collection
  // option, not an `admin` one).
  defaultSort: 'order',
  // Explicit, rather than relying on Payload's pluralization guess for a
  // `products` slug — keeps the generated `payload-types.ts` name (`Product`)
  // stable and predictable for `src/backend/lib/content.ts` to import.
  typescript: {
    interface: 'Product',
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      label: 'Volgorde',
      admin: {
        description:
          'Bepaalt de volgorde in het overzicht (oplopend). Het huidige assortiment gebruikt 1–17.',
      },
    },
    {
      name: 'naam',
      type: 'text',
      required: true,
      label: 'Naam',
    },
    {
      name: 'ingr',
      type: 'textarea',
      required: true,
      label: 'Ingrediënten',
    },
    {
      name: 'gewicht',
      type: 'text',
      required: true,
      label: 'Gewicht',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
      admin: {
        description:
          'Optioneel — zonder foto toont de site een placeholder-icoon.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCollectionChange('/')],
    afterDelete: [revalidateCollectionDelete('/')],
  },
};
