import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Cairo, Source_Sans_3 } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import AppShell from "@/components/AppShell";
import GoogleAdsTag from "@/components/GoogleAdsTag";
import { GoogleTagManagerNoScript } from "@/components/GoogleTagManagerNoScript";
import JsonLd from "@/components/JsonLd";
import { GTM_ID } from "@/lib/gtm";
import { SITE_NAME, SITE_URL, buildMetadata } from "@/lib/seo";
import "../globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-en",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const seo = buildMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
  });
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s | ${SITE_NAME}`,
    },
    description: seo.description,
    icons: {
      icon: "/ENS.png",
      apple: "/ENS.png",
    },
    alternates: seo.alternates,
    openGraph: seo.openGraph,
    twitter: seo.twitter,
    robots: seo.robots,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const isArabic = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className={`${cairo.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <head>
        <GoogleAdsTag />
      </head>
      <GoogleTagManager gtmId={GTM_ID} />
      <body
        className={`min-h-full flex flex-col ${isArabic ? cairo.className : sourceSans.className}`}
      >
        <GoogleTagManagerNoScript />
        <JsonLd locale={locale} />
        <NextIntlClientProvider>
          <AppShell>{children}</AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
