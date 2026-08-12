"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { heroTagKeys } from "@/data/site";
import {
  SparklesIcon,
  ArrowIcon,
  ChartIcon,
  ShieldIcon,
  HeartIcon,
  RocketIcon,
} from "@/components/icons";

const rows = [
  { key: "analysis", pct: 100 },
  { key: "design", pct: 92 },
  { key: "develop", pct: 78 },
  { key: "launch", pct: 60 },
] as const;

const stats = [
  { key: "performance", icon: ChartIcon },
  { key: "uptime", icon: ShieldIcon },
  { key: "satisfaction", icon: HeartIcon },
  { key: "growth", icon: RocketIcon },
] as const;

function HeroDashboard() {
  const t = useTranslations("hero.dashboard");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.45 }}
      className="relative mx-auto mt-20 max-w-4xl px-4 sm:px-6"
    >
      <div className="absolute -inset-6 rounded-[2.5rem] bg-brand-300/25 blur-3xl" />
      <div className="relative rounded-3xl border border-brand-100 bg-white/90 p-6 shadow-2xl shadow-brand-500/10 backdrop-blur-xl sm:p-8">
        {/* header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            {t("title")}
          </span>
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
            {t("badge")}
          </span>
        </div>

        {/* progress rows */}
        <div className="mt-6 space-y-4">
          {rows.map(({ key, pct }, i) => (
            <div key={key}>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-semibold text-gray-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-brand-200 text-[10px] font-black text-brand-600">
                    {i + 1}
                  </span>
                  {t(`rows.${key}.label`)}
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  {t(`rows.${key}.tag`)}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-100/80">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.1,
                    delay: 0.2 + i * 0.15,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full bg-linear-to-r from-brand-600 via-brand-400 to-indigo-400"
                />
              </div>
            </div>
          ))}
        </div>

        {/* stat tiles */}
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(({ key, icon: Icon }, i) => (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              key={key}
              className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4"
            >
              <Icon className="h-4.5 w-4.5 text-brand-600" />
              <div className="mt-2 text-[11px] font-semibold text-gray-500">
                {t(`stats.${key}.label`)}
              </div>
              <div className="mt-1 text-xl font-black text-ink-900" dir="ltr">
                {t(`stats.${key}.value`)}
              </div>
              <div
                className="mt-0.5 text-[11px] font-bold text-brand-600"
                dir="ltr"
              >
                ↗ {t(`stats.${key}.delta`)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* timeline */}
        <div className="mt-7 border-t border-brand-100 pt-5">
          <div className="relative flex justify-between">
            <div className="absolute inset-x-4 top-1.25 h-px bg-brand-100" />
            {(["t1", "t2", "t3", "t4"] as const).map((tk, i) => (
              <div
                key={tk}
                className="relative flex flex-col items-center gap-2 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.7 + i * 0.12,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className={`h-2.5 w-2.5 rounded-full ${
                    i < 3
                      ? "bg-brand-500 shadow-[0_0_10px_rgba(124,58,237,0.6)]"
                      : "bg-brand-200"
                  }`}
                />
                <span className="max-w-20 text-[10px] font-semibold leading-4 text-gray-500 sm:max-w-none sm:text-[11px]">
                  {t(`timeline.${tk}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-grid pt-36 pb-20 sm:pt-44 sm:pb-28">
      {/* background glows */}
      <div className="pointer-events-none absolute -top-32 inset-s-[10%] h-96 w-96 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-40 inset-e-[5%] h-80 w-80 rounded-full bg-indigo-300/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700"
          >
            <SparklesIcon className="h-4 w-4" />
            {t("badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-3xl font-black leading-[1.2] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl"
          >
            {t("title1")}{" "}
            <span className="text-brand-600">{t("titleHighlight")}</span>{" "}
            {t("title2")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-full bg-linear-to-r from-brand-600 to-brand-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-500/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-brand-500/40"
            >
              {t("cta")}
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
            <Link
              href="/showcases"
              className="rounded-full border-2 border-brand-200 bg-white px-8 py-4 text-base font-bold text-brand-700 transition-all hover:border-brand-400 hover:bg-brand-50"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </div>

        <HeroDashboard />
      </div>

      {/* marquee of specialties */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative mt-16 overflow-hidden"
        dir="ltr"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />
        <div className="marquee-track flex w-max animate-marquee gap-4">
          {[...heroTagKeys, ...heroTagKeys].map((key, i) => (
            <span
              key={`${key}-${i}`}
              className="whitespace-nowrap rounded-full border border-brand-100 bg-white px-6 py-3 text-sm font-bold text-gray-700 shadow-sm"
            >
              {t(`tags.${key}`)}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
