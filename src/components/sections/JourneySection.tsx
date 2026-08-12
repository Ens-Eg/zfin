"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  SparklesIcon,
  SearchIcon,
  PenIcon,
  CodeIcon,
  ShieldIcon,
  RocketIcon,
  HeartIcon,
} from "@/components/icons";
import { Reveal } from "@/components/motion";

const steps = [
  { key: "idea", icon: SparklesIcon },
  { key: "analysis", icon: SearchIcon },
  { key: "design", icon: PenIcon },
  { key: "develop", icon: CodeIcon },
  { key: "test", icon: ShieldIcon },
  { key: "launch", icon: RocketIcon },
  { key: "support", icon: HeartIcon },
] as const;

export default function JourneySection() {
  const t = useTranslations("journey");
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute top-10 -inset-s-32 h-96 w-96 rounded-full bg-brand-100/70 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
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

        <div ref={trackRef} className="relative mt-16">
          {/* base line */}
          <div className="absolute top-0 bottom-0 inset-s-7 w-1 -translate-x-1/2 rounded-full bg-brand-100 rtl:translate-x-1/2 sm:inset-s-8" />
          {/* progress line */}
          <motion.div
            style={{ scaleY: progress }}
            className="absolute top-0 bottom-0 inset-s-7 w-1 origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-brand-500 to-indigo-500 rtl:translate-x-1/2 sm:inset-s-8"
          />

          <div className="space-y-10">
            {steps.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="relative flex items-start gap-6 sm:gap-8"
              >
                {/* node */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-600 to-brand-400 text-white shadow-lg shadow-brand-500/30 sm:h-16 sm:w-16">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>

                <div className="group flex-1 rounded-3xl border border-brand-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-black text-brand-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-extrabold text-ink-900 sm:text-xl">
                      {t(`steps.${key}.title`)}
                    </h3>
                  </div>
                  <p className="mt-3 leading-8 text-gray-600">
                    {t(`steps.${key}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
