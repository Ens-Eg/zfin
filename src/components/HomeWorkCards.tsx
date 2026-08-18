"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  projectKeys,
  projectLogos,
  projectLogoBg,
  type ProjectKey,
} from "@/data/site";
import { useHeroOverlay } from "@/lib/useHeroOverlay";

const SHOW_AFTER_MS = 18_000;
const previewKeys = projectKeys.slice(0, 6) as ProjectKey[];

export default function HomeWorkCards() {
  const t = useTranslations("showcases");
  const th = useTranslations("homeWork");
  const visible = useHeroOverlay(SHOW_AFTER_MS);

  const track = [...previewKeys, ...previewKeys];

  return (
    <AnimatePresence>
      {visible && (
        <section
          aria-label={th("title")}
          className="pointer-events-none absolute inset-x-0 bottom-40 z-20 px-3 sm:bottom-44 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mx-auto max-w-5xl"
          >
            <div className="mb-2.5 flex items-center justify-between gap-3 px-1">
              <h2 className="text-xs font-bold tracking-tight text-brand-700 sm:text-sm">
                {th("title")}
              </h2>
              <Link
                href="/showcases"
                className="text-[11px] font-semibold text-brand-700 transition-colors hover:text-brand-800 sm:text-xs"
              >
                {th("viewAll")}
              </Link>
            </div>

            <div className="overflow-hidden" dir="ltr">
              <div className="marquee-track flex w-max gap-3 animate-marquee sm:gap-3.5">
                {track.map((key, i) => (
                  <Link
                    key={`${key}-${i}`}
                    href="/showcases"
                    dir="ltr"
                    className="group flex w-64 shrink-0 items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-3.5 py-3 shadow-[0_8px_28px_rgba(27,19,37,0.08)] backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20 sm:w-72 sm:gap-3.5 sm:px-4 sm:py-3.5"
                    style={{
                      WebkitBackdropFilter: "blur(14px)",
                      backdropFilter: "blur(14px)",
                    }}
                  >
                    <span className="min-w-0 flex-1 text-start" dir="auto">
                      <span className="block truncate text-xs font-bold text-ink-900 sm:text-sm">
                        {t(`projects.${key}.name`)}
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] text-gray-600 sm:text-[11px]">
                        {t(`projects.${key}.category`)}
                      </span>
                    </span>
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/30 sm:h-14 sm:w-14 ${projectLogoBg[key]}`}
                    >
                      <Image
                        src={projectLogos[key]}
                        alt={t(`projects.${key}.name`)}
                        width={56}
                        height={56}
                        className="h-8 w-auto max-w-[80%] object-contain transition-transform group-hover:scale-105 sm:h-9"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      )}
    </AnimatePresence>
  );
}
