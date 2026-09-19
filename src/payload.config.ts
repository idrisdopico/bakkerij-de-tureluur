import { postgresAdapter } from '@payloadcms/db-postgres';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
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
import { Bestellen } from './backend/globals/bestellen';
import { Contact } from './backend/globals/contact';
import { Footer } from './backend/globals/footer';
import { Hero } from './backend/globals/hero';
import { Principles } from './backend/globals/principles';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Fail fast on missing critical config rather than booting with an empty
// string — an empty `secret` silently disables meaningful cookie/token signing,
// and an empty `connectionString` defers a confusing failure to the first query.
const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Set it in your .env (see .env.example).`,
    );
  }
  return value;
};

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
  globals: [Hero, Principles, About, Assortiment, Contact, Footer, Bestellen],
  editor: lexicalEditor(),
  secret: requireEnv('PAYLOAD_SECRET'),
  // Email is only wired up when SMTP credentials are present (a real Gmail
  // App Password, set in production / a configured `.env`). Without them —
  // local development, most likely — Payload falls back to logging emails to
  // the console, so `payload.sendEmail` still works without a mail server,
  // and startup doesn't fail trying to verify an unconfigured transport. The
  // order flow (`src/backend/actions/submit-order.ts`) always sends to the
  // fixed `ORDER_TO_EMAIL`, never a customer-supplied address.
  email:
    process.env.SMTP_USER && process.env.SMTP_PASS
      ? nodemailerAdapter({
          defaultFromAddress: process.env.SMTP_USER,
          defaultFromName: 'Bakkerij de Tureluur',
          transportOptions: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          },
        })
      : undefined,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: requireEnv('DATABASE_URL'),
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
