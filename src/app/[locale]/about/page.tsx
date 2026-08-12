import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import AboutContent from "@/components/sections/AboutContent";
import Stats from "@/components/sections/Stats";
import CtaSection from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const meta = await getTranslations({ locale, namespace: "meta.pages" });
  return buildMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: meta("about"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <PageHeader badge={t("badge")} title={t("title")} />
      <AboutContent />
      <Stats />
      <CtaSection />
    </>
  );
}
