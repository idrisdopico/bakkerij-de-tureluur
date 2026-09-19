'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  'error-callback': () => void;
  'expired-callback': () => void;
  theme: 'light' | 'dark' | 'auto';
};

type TurnstileApi = {
  render: (element: HTMLElement, options: TurnstileRenderOptions) => string;
  remove: (widgetId: string) => void;
};

const getTurnstile = () =>
  (window as unknown as { turnstile?: TurnstileApi }).turnstile;

export type TurnstileWidgetProps = {
  siteKey: string;
  /** Called with a fresh token on success, or an empty string on error/expiry. */
  onVerify: (token: string) => void;
};

/**
 * Renders the Cloudflare Turnstile widget and reports its token up via
 * `onVerify`. Loads the script once and renders explicitly so the token flows
 * into React state instead of a global callback. Keep `onVerify` stable
 * (`useCallback`) — it's an effect dependency, and the widget re-renders if it
 * changes identity.
 */
export function TurnstileWidget({ siteKey, onVerify }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isScriptReady, setIsScriptReady] = useState(false);

  // If the script was already loaded by an earlier mount, `onLoad` won't fire
  // again — detect it directly.
  useEffect(() => {
    if (getTurnstile()) {
      setIsScriptReady(true);
    }
  }, []);

  useEffect(() => {
    const turnstile = getTurnstile();
    const container = containerRef.current;
    if (!isScriptReady || !turnstile || !container || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = turnstile.render(container, {
      sitekey: siteKey,
      callback: token => onVerify(token),
      'error-callback': () => onVerify(''),
      'expired-callback': () => onVerify(''),
      theme: 'auto',
    });

    return () => {
      if (widgetIdRef.current) {
        turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [isScriptReady, siteKey, onVerify]);

  return (
    <>
      <Script
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => setIsScriptReady(true)}
      />
      <div ref={containerRef} />
    </>
  );
}
