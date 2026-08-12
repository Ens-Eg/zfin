"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { serviceKeys, type ServiceKey } from "@/data/site";
import {
  CodeIcon,
  CpuIcon,
  SmartphoneIcon,
  BrainIcon,
  CartIcon,
  PaletteIcon,
  PlugIcon,
  ServerIcon,
  CheckIcon,
  ArrowIcon,
} from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const serviceIcons: Record<
  ServiceKey,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  web: CodeIcon,
  systems: CpuIcon,
  mobile: SmartphoneIcon,
  ai: BrainIcon,
  ecommerce: CartIcon,
  uiux: PaletteIcon,
  apis: PlugIcon,
  hosting: ServerIcon,
};

export default function ServicesGrid({
  preview = false,
  showFeatures = true,
}: {
  preview?: boolean;
  showFeatures?: boolean;
}) {
  const t = useTranslations("services");
  const keys = preview ? serviceKeys.slice(0, 4) : serviceKeys;

  return (
    <section className={`relative ${preview ? "py-24" : "pt-36 pb-24 sm:pt-40"}`}>
      <div className="pointer-events-none absolute top-1/3 -inset-s-32 h-96 w-96 rounded-full bg-brand-100/70 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-700">
            {t("badge")}
          </span>
          {preview ? (
            <h2 className="mt-4 text-2xl font-black tracking-tight text-ink-900 sm:text-4xl">
              {t("title")}
            </h2>
          ) : (
            <h1 className="mt-4 text-2xl font-black tracking-tight text-ink-900 sm:text-4xl">
              {t("page.title")}
            </h1>
          )}
          <p className="mt-4 text-base leading-7 text-gray-600">
            {preview ? t("subtitle") : t("page.subtitle")}
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {keys.map((key) => {
            const Icon = serviceIcons[key];
            return (
              <StaggerItem key={key} className="h-full">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex h-full flex-col rounded-3xl border border-brand-100 bg-white p-7 shadow-sm transition-all hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand-600 to-brand-400 text-white shadow-lg shadow-brand-500/25 transition-transform group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-ink-900">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-gray-600">
                    {t(`items.${key}.description`)}
                  </p>
                  {showFeatures && (
                    <ul className="mt-5 space-y-2 border-t border-brand-50 pt-5">
                      {[0, 1, 2, 3].map((i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <CheckIcon className="h-4 w-4 shrink-0 text-brand-500" />
                          {t(`items.${key}.features.${i}`)}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {preview && (
          <Reveal delay={2} className="mt-12 text-center">
            <Link
              href="/services"
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
