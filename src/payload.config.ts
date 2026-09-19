import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Media } from './backend/collections/media';
import { Products } from './backend/collections/products';
import { Users } from './backend/collections/users';
import { About } from './backend/globals/about';
import { Assortiment } from './backend/globals/assortiment';
import { Contact } from './backend/globals/contact';
import { Footer } from './backend/globals/footer';
import { Hero } from './backend/globals/hero';
import { Principles } from './backend/globals/principles';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * This file is deliberately thin — a single composition root that wires
 * together the collections/globals/access/hooks defined under
 * `src/backend/`, plus which database and file storage to use. It lives at
 * `src/payload.config.ts` (Payload's own default lookup location, matching
 * its official templates) so no extra `PAYLOAD_CONFIG_PATH` env var is
 * needed for `payload`'s CLI (`generate:types`, migrations, etc.) to find
 * it; everything it composes is defined elsewhere, one concern per file —
 * see `src/backend/` and its own file layout for the reasoning.
 *
 * File storage: Vercel Blob is only wired in when `BLOB_READ_WRITE_TOKEN` is
 * set (i.e. in a real Vercel deployment with Blob storage attached).
 * Without it — local development, most likely — Payload falls back to its
 * default local-disk storage under `public/media`, so uploads work locally
 * without needing a Blob store just to run `pnpm dev`.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products],
  globals: [Hero, Principles, About, Assortiment, Contact, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: process.env.BLOB_READ_WRITE_TOKEN
    ? [
        vercelBlobStorage({
          collections: { media: true },
          token: process.env.BLOB_READ_WRITE_TOKEN,
          // Vercel's own serverless functions cap request bodies at 4.5MB;
          // uploading straight from the browser to Blob storage sidesteps
          // that limit for larger photos.
          clientUploads: true,
        }),
      ]
    : [],
});
