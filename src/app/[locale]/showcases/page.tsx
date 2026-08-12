import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import FeaturedProject from "@/components/sections/FeaturedProject";
import ShowcasesGrid from "@/components/sections/ShowcasesGrid";
import CtaSection from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "showcases" });
  return buildMetadata({
    locale,
    path: "/showcases",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function ShowcasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("showcases");

  return (
    <>
      <PageHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
      <FeaturedProject full />
      <ShowcasesGrid />
      <CtaSection />
    </>
  );
}
