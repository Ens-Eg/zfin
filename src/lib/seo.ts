import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://ens.eg";
export const SITE_NAME = "ENS Egypt";

export function localeUrl(locale: string, path = "") {
  const normalized = !path || path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${normalized}`;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image = "/ens-logo.png",
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const url = localeUrl(locale, path);
  const ogLocale = locale === "ar" ? "ar_EG" : "en_US";
  const languages: Record<string, string> = {
    "x-default": localeUrl(routing.defaultLocale, path),
  };
  for (const l of routing.locales) {
    languages[l] = localeUrl(l, path);
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: ogLocale,
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_EG"],
      images: [{ url: image, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
