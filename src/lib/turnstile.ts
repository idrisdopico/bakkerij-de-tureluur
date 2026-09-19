/**
 * Server-side verification of a Cloudflare Turnstile token (the free CAPTCHA
 * guarding the order form). Called only from the order server action; the
 * secret never reaches the client. Fails closed — any missing config, network
 * error, or non-OK response is treated as "not verified" rather than letting
 * a submission through.
 */

const SITEVERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type SiteverifyResponse = {
  success: boolean;
};

type VerifyTurnstileParams = {
  token: string;
  /** The client IP, if known (best-effort — Turnstile works without it). */
  remoteIp?: string;
};

export async function verifyTurnstile({
  token,
  remoteIp,
}: VerifyTurnstileParams): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) {
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) {
    body.set('remoteip', remoteIp);
  }

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!response.ok) {
      return false;
    }
    const result = (await response.json()) as SiteverifyResponse;
    return result.success === true;
  } catch {
    return false;
  }
}
