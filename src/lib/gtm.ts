/** Google Tag Manager — manages Ads, Analytics, and other tags from one place. */
export const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-PFPTGFHS";

/** Google Ads tag ID — loaded on-site via gtag.js (see layout.tsx). */
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "AW-18048331734";

/** Google Analytics 4 measurement ID. */
export const GA4_ID =
  process.env.NEXT_PUBLIC_GA4_ID?.trim() || "G-SN6PQX2WD3";

/** Google Ads WhatsApp click conversion. */
export const GOOGLE_ADS_WHATSAPP_CONVERSION =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION?.trim() ||
  "AW-18048331734/TUd3CP-ihOkcENbfjp5D";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

/** Fire GA4 + Ads WhatsApp events, then run callback (with timeout fallback). */
export function trackWhatsAppConversion(
  whatsappUrl: string,
  onDone: () => void,
) {
  const done = (() => {
    let called = false;
    return () => {
      if (called) return;
      called = true;
      onDone();
    };
  })();

  const timer = window.setTimeout(done, 1000);

  if (typeof window.gtag === "function") {
    window.gtag("event", "whatsapp_click", {
      link_url: whatsappUrl,
      method: "whatsapp",
    });

    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_WHATSAPP_CONVERSION,
      event_callback: () => {
        window.clearTimeout(timer);
        done();
      },
    });
    return;
  }

  window.clearTimeout(timer);
  done();
}
