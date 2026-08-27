/** Google Tag Manager — manages Ads, Analytics, and other tags from one place. */
export const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-PFPTGFHS";

/** Google Ads tag ID — loaded on-site via gtag.js (see layout.tsx). */
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "AW-18048331734";