/** Formats demo menu prices (EGP) for the ensmenu chat mockup. */
export function formatMockPrice(amount: number, isRtl: boolean): string {
  const formatted = amount.toLocaleString(isRtl ? "ar-EG" : "en-EG");
  return isRtl ? `${formatted} ج.م` : `EGP ${formatted}`;
}
