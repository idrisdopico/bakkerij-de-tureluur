import { redirect } from 'next/navigation';

/**
 * `/login` is the entry point the bakery actually visits, but the real login
 * screen is Payload's own `/admin/login` — renaming Payload's internal admin
 * route to `/login` outright is possible (`admin.routes` in
 * `payload.config.ts`) but not done here: it requires the `(payload)` route
 * group's folder structure to mirror the new path exactly, and Payload's own
 * issue tracker has open reports of the admin panel breaking when that route
 * is moved away from the default. A plain redirect gets the same result
 * (visiting `/login` lands you in the login flow) without that risk. If the
 * literal `/login` path (not a redirect to it) turns out to matter, that
 * trade-off is worth revisiting.
 */
export default function LoginRedirectPage() {
  redirect('/admin/login');
}
