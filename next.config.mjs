import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF first (smaller than WebP at equivalent quality on photos like
    // the hero); Next falls back to WebP, then the original format, based
    // on what the requesting browser's `Accept` header supports.
    formats: ['image/avif', 'image/webp'],
    // Payload-managed images live outside `public/` once uploaded: Vercel
    // Blob in production (see `src/payload.config.ts`), or this
    // app's own `/api/media/file/...` route locally. Both need to be
    // allow-listed for `next/image` to optimize them.
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
};

// `.mjs` (rather than adding `"type": "module"` to package.json) keeps this
// change scoped to just this file — `withPayload` is an ESM-only export, and
// this is the lighter-touch of the two ways Payload's docs offer to satisfy
// that.
export default withPayload(nextConfig);
