"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowIcon, RocketIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";

export default function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-brand-700 via-brand-600 to-indigo-600 px-8 py-16 text-center text-white sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -top-24 inset-s-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 inset-e-1/4 h-64 w-64 rounded-full bg-brand-300/20 blur-3xl" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <RocketIcon className="h-8 w-8" />
              </div>
              <h2 className="mt-6 text-2xl font-black tracking-tight sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-brand-100">
                {t("subtitle")}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-xl transition-transform hover:scale-105"
                >
                  {t("button")}
                  <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="rounded-full border-2 border-white/40 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
                >
                  {t("buttonSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
