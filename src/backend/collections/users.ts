import type { CollectionConfig } from 'payload';

/**
 * This collection *is* Payload's login system, not a content type — `/admin`
 * (and the `/login` redirect in `src/app/(frontend)/login`) authenticate
 * against it. `auth: true` gives it email/password auth with hashed
 * passwords and signed session cookies, handled entirely by Payload; nothing
 * in this app touches a password directly.
 *
 * Just one account for now (see AGENTS.md) — self-registration is
 * deliberately not exposed anywhere on the public site, so the only way to
 * create a user is via `/admin` while already logged in, or Payload's
 * "create first user" flow on a fresh database.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [],
};
