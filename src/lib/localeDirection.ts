export function isRtlLocale(locale: string): boolean {
  return locale === "ar" || locale.startsWith("ar-");
}
