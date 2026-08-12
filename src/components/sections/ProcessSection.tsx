"use client";

import { useTranslations } from "next-intl";
import { SearchIcon, PenIcon, CodeIcon, RocketIcon } from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const steps = [
  { key: "discover", icon: SearchIcon },
  { key: "design", icon: PenIcon },
  { key: "develop", icon: CodeIcon },
  { key: "launch", icon: RocketIcon },
] as const;

export default function ProcessSection() {
  const t = useTranslations("services.page.process");

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute top-1/4 inset-s-1/3 h-80 w-80 rounded-full bg-brand-100/70 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-700">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-ink-900 sm:text-3xl">
            {t("title")}
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ key, icon: Icon }, i) => (
            <StaggerItem key={key} className="h-full">
              <div className="relative h-full rounded-3xl border border-brand-100 bg-white p-7 shadow-sm transition-colors hover:border-brand-300">
                <span className="absolute top-6 inset-e-6 text-4xl font-black text-brand-100">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-brand-100 p-3 text-brand-700">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-ink-900">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  {t(`steps.${key}.description`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
