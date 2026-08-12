import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import LegalContent from "@/components/sections/LegalContent";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return buildMetadata({
    locale,
    path: "/privacy",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  const sections = t.raw("sections") as {
    title: string;
    body?: string;
    items?: string[];
  }[];

  const related = t.raw("related") as {
    label: string;
    title: string;
    description: string;
    cta: string;
    href: "/terms" | "/privacy";
  };

  const contact = t.raw("contactCta") as {
    title: string;
    body: string;
    button: string;
  };

  return (
    <>
      <PageHeader
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <LegalContent
        intro={t("intro")}
        sections={sections}
        closing={t("closing")}
        lastUpdated={t("lastUpdated")}
        tocLabel={t("toc")}
        sectionsLabel={t("sectionsLabel")}
        related={related}
        contact={contact}
      />
    </>
  );
}
