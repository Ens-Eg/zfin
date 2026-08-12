"use client";

import { useTranslations } from "next-intl";
import {
  EyeIcon,
  TargetIcon,
  HeartIcon,
  UsersIcon,
  CpuIcon,
  CheckIcon,
  ShieldIcon,
  SparklesIcon,
  TagIcon,
} from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const whyItems = [
  { key: "team", icon: UsersIcon },
  { key: "custom", icon: CpuIcon },
  { key: "quality", icon: CheckIcon },
  { key: "support", icon: ShieldIcon },
  { key: "tech", icon: SparklesIcon },
  { key: "pricing", icon: TagIcon },
] as const;

export default function AboutContent() {
  const t = useTranslations("about");

  const pillars = [
    {
      key: "vision",
      icon: EyeIcon,
      title: t("vision.title"),
      desc: t("vision.description"),
    },
    {
      key: "mission",
      icon: TargetIcon,
      title: t("mission.title"),
      desc: t("mission.description"),
    },
    {
      key: "values",
      icon: HeartIcon,
      title: t("values.title"),
      desc: t("values.description"),
    },
  ];

  return (
    <>
      {/* intro */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <p className="text-base leading-8 text-gray-700">{t("intro1")}</p>
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-6 text-base leading-8 text-gray-700">
              {t("intro2")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* vision / mission / values */}
      <section className="relative py-4 pb-20">
        <div className="pointer-events-none absolute top-0 -inset-s-32 h-80 w-80 rounded-full bg-brand-100/70 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Stagger className="grid gap-6 md:grid-cols-3">
            {pillars.map(({ key, icon: Icon, title, desc }) => (
              <StaggerItem key={key} className="h-full">
                <div className="h-full rounded-3xl border border-brand-100 bg-linear-to-b from-brand-50/80 to-white p-8 shadow-sm transition-colors hover:border-brand-300">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand-600 to-brand-400 text-white shadow-lg shadow-brand-500/25">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-ink-900">
                    {title}
                  </h3>
                  <p className="mt-3 leading-8 text-gray-600">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* why us */}
      <section className="relative overflow-hidden bg-ink-900 py-24 text-white">
        <div className="pointer-events-none absolute -top-40 inset-s-1/3 h-96 w-96 rounded-full bg-brand-600/25 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-brand-400/40 bg-brand-500/15 px-4 py-1.5 text-sm font-bold text-brand-300">
              {t("why.badge")}
            </span>
            <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-4xl">
              {t("why.title")}
            </h2>
          </Reveal>

          <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map(({ key, icon: Icon }) => (
              <StaggerItem key={key}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:border-brand-400/40 hover:bg-white/10">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="mt-4 font-extrabold">
                    {t(`why.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {t(`why.items.${key}.description`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={2} className="mx-auto mt-16 max-w-3xl text-center">
            <p className="text-base leading-8 text-brand-100">{t("closing")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
