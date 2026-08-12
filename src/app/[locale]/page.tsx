import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HomeVideo from "@/components/HomeVideo";
import { buildMetadata } from "@/lib/seo";

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
    description: seo.description,
    alternates: seo.alternates,
    openGraph: seo.openGraph,
    twitter: seo.twitter,
    robots: seo.robots,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");

  const desktopSrc = locale === "en" ? "/intro-en.mp4" : "/intro.mp4";
  const mobileSrc =
    locale === "en" ? "/mobile-intro-en.mp4" : "/mobile-intro.mp4";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <h1 className="sr-only">
        {t("title1")} {t("titleHighlight")} {t("title2")}
      </h1>
      <p className="sr-only">{t("subtitle")}</p>
      <HomeVideo desktopSrc={desktopSrc} mobileSrc={mobileSrc} />
    </div>
  );
}
