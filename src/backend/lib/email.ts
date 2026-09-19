import { getPayloadClient } from './payload-client';

/**
 * Thin wrapper over Payload's configured email transport (see the `email`
 * adapter in `src/payload.config.ts`). Lives in the lib layer so the Payload
 * instance is only ever reached through here and `content.ts`, never directly
 * from feature code. When no SMTP credentials are set (local development),
 * Payload logs the message to the console instead of sending it.
 */

type SendEmailParams = {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
};

export async function sendEmail({
  to,
  replyTo,
  subject,
  text,
}: SendEmailParams): Promise<void> {
  const payload = await getPayloadClient();
  await payload.sendEmail({ to, replyTo, subject, text });
}
