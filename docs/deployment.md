# Deployment

The site is hosted on **Vercel**, with **Neon** Postgres and **Vercel Blob** for
uploads. Deploys are owned by **GitHub Actions** (not Vercel's own git
integration): every push to `main` lints, type-checks, builds on Vercel, and
deploys production.

- **Production:** https://bakkerij-de-tureluur.vercel.app
- **Admin:** `/admin` (or `/login`, which redirects there)

## Platform pieces

| Piece          | What                       | Notes                                                                 |
| -------------- | -------------------------- | --------------------------------------------------------------------- |
| Vercel project | `bakkerij-de-tureluur`     | Linked via `vercel link` (creates `.vercel/project.json`, gitignored) |
| Database       | Neon Postgres              | Reused across local + prod; `DATABASE_URL`                            |
| File storage   | Vercel Blob (public store) | Enabled only when `BLOB_READ_WRITE_TOKEN` is set; else local disk     |
| CI/CD          | GitHub Actions             | `.github/workflows/deploy.yml`                                        |

## Environment variables (Vercel → Settings → Environment Variables)

Set for **Production and Preview** (the pipeline builds Preview on PRs). Only
`PAYLOAD_SECRET` + `DATABASE_URL` are required to boot.

| Variable                         | Type       | Purpose                                                        |
| -------------------------------- | ---------- | -------------------------------------------------------------- |
| `PAYLOAD_SECRET`                 | Secret     | Signs Payload tokens/cookies. Keep stable.                     |
| `DATABASE_URL`                   | Secret     | Neon Postgres connection string                                |
| `BLOB_READ_WRITE_TOKEN`          | Config     | Auto-added when the Blob store is attached                     |
| `NEXT_PUBLIC_SITE_URL`           | Config     | Real origin (canonical/OG/sitemap/JSON-LD)                     |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | **Config** | Turnstile site key — public by design, must be `--type config` |
| `TURNSTILE_SECRET_KEY`           | Secret     | Turnstile secret (server-side verify)                          |
| `SMTP_USER` / `SMTP_PASS`        | Secret     | Gmail address + **App Password** for order emails              |
| `ORDER_TO_EMAIL`                 | Secret     | Fixed address orders are sent to                               |

> Don't wrap values in quotes when adding via CLI — a quoted `DATABASE_URL`
> becomes an invalid URL and the build fails on `new URL(...)`.

## CI/CD — how it works

`.github/workflows/deploy.yml`:

- **push to `main`** → `verify` (lint + type-check) → `deploy` (`vercel deploy
--prod`)
- **PR into `main`** → same checks + a Vercel **preview** build (no prod change)

The build runs **on Vercel**, not on the runner (`vercel deploy`, not
`vercel build --prebuilt`). Why: the env vars are stored _Sensitive_ and can't
be pulled to a runner, and this is a **public repo** — building server-side means
no secret ever reaches GitHub. `vercel.json` sets `git.deploymentEnabled: false`
so Vercel's own git auto-deploys are off and Actions is the sole deployer.

**Required GitHub secrets** (repo → Settings → Secrets and variables → Actions):

| Secret              | Where to get it                       |
| ------------------- | ------------------------------------- |
| `VERCEL_TOKEN`      | https://vercel.com/account/tokens     |
| `VERCEL_ORG_ID`     | `orgId` in `.vercel/project.json`     |
| `VERCEL_PROJECT_ID` | `projectId` in `.vercel/project.json` |

## Gotchas we actually hit (read before changing deploy)

1. **Blob needs a schema push.** The `media` table was created in dev with
   local-disk storage, so it lacked the Blob plugin's `_objectKey` column. The
   production build doesn't push schema, so it failed with
   `column "_objectkey" does not exist`. Fix: run the seed (or any Payload init)
   in dev mode against the target DB **with `BLOB_READ_WRITE_TOKEN` set**, which
   pushes the column. `pnpm generate:types` then adds `_objectKey` to
   `payload-types.ts`.
2. **Import map must include the Blob component.** `importMap.js` generated with
   Blob off omits `VercelBlobClientUploadHandler`; in production (Blob on) the
   admin crashed to a **blank/black page**. Fix: regenerate with Blob active and
   commit:
    ```bash
    BLOB_READ_WRITE_TOKEN=… pnpm payload generate:importmap
    ```
3. **Media files must be in Blob.** Images uploaded locally live on your disk,
   not Blob, so they 404 in production. Re-upload them (re-seed with the Blob
   token, or re-upload in `/admin`) so they get a Blob-backed `_objectKey`.
4. **`NEXT_PUBLIC_` Turnstile key** is flagged by the CLI as a public credential
   — add it with `--type config` (it's meant to be public), not `secret`.

## First-time setup (from scratch)

```bash
# 1. Create & link the Vercel project (don't connect git auto-deploy)
npm i -g vercel && vercel login && vercel link

# 2. Attach storage in the dashboard: Blob store, and point DATABASE_URL at Neon
vercel blob create-store <name> --access public --yes   # sets BLOB_READ_WRITE_TOKEN

# 3. Add env vars (Production + Preview) — see the table above
vercel env add PAYLOAD_SECRET production
# …etc.  NEXT_PUBLIC_TURNSTILE_SITE_KEY uses --type config

# 4. Sync schema + content + media to the target DB (dev-push model)
DATABASE_URL=… BLOB_READ_WRITE_TOKEN=… pnpm seed

# 5. Regenerate the import map with Blob active, and commit it
BLOB_READ_WRITE_TOKEN=… pnpm payload generate:importmap

# 6. Add the 3 GitHub secrets, then push — Actions deploys from there on
```

## Manual deploy (bypassing CI)

```bash
vercel deploy --prod        # builds on Vercel with its own env
vercel ls bakkerij-de-tureluur   # check status
vercel inspect <deployment-url> --logs   # build logs if it errors
```
