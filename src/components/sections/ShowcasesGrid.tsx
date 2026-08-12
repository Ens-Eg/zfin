"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { projectKeys, projectLogos, projectLogoBg } from "@/data/site";
import { ArrowIcon } from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export default function ShowcasesGrid({
  preview = false,
}: {
  preview?: boolean;
}) {
  const t = useTranslations("showcases");
  const keys = preview ? projectKeys.slice(0, 3) : projectKeys;

  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute top-0 inset-e-0 h-96 w-96 rounded-full bg-brand-100/70 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {preview && (
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-700">
              {t("badge")}
            </span>
            <h2 className="mt-4 text-2xl font-black tracking-tight text-ink-900 sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              {t("subtitle")}
            </p>
          </Reveal>
        )}

        <Stagger className={`${preview ? "mt-16" : "mt-0"} grid gap-8 sm:grid-cols-2 lg:grid-cols-3`}>
          {keys.map((key) => (
            <StaggerItem key={key} className="h-full">
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm transition-all hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-500/10"
              >
                <div
                  className={`relative flex h-48 items-center justify-center overflow-hidden ${projectLogoBg[key]}`}
                >
                  <Image
                    src={projectLogos[key]}
                    alt={t(`projects.${key}.name`)}
                    width={220}
                    height={120}
                    className="relative h-28 w-auto max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                    {t(`projects.${key}.category`)}
                  </span>
                  <h3 className="mt-3 text-xl font-extrabold text-ink-900">
                    {t(`projects.${key}.name`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-gray-600">
                    {t(`projects.${key}.description`)}
                  </p>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>

        {preview && (
          <Reveal delay={2} className="mt-12 text-center">
            <Link
              href="/showcases"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-brand-200 bg-white px-8 py-4 text-base font-bold text-brand-700 transition-all hover:border-brand-400 hover:bg-brand-50"
            >
              {t("viewAll")}
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
