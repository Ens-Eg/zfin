"use client";

import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  UsersIcon,
  SparklesIcon,
  CodeIcon,
} from "@/components/icons";
import { useHeroOverlay } from "@/lib/useHeroOverlay";

const cards = [
  {
    key: "about",
    href: "/about",
    icon: UsersIcon,
  },
  {
    key: "services",
    href: "/services",
    icon: SparklesIcon,
  },
  {
    key: "development",
    href: "/services",
    icon: CodeIcon,
  },
] as const;

const SHOW_AFTER_MS = 18_000;

const iconMotion = {
  about: {
    animate: { y: [0, -4, 0], scale: [1, 1.06, 1] },
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const },
  },
  services: {
    animate: { rotate: [0, 12, -8, 0], scale: [1, 1.1, 1] },
    transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const },
  },
  development: {
    animate: { x: [0, 2, -2, 0], scale: [1, 1.08, 1] },
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" as const },
  },
};

export default function HomeFeatureCards() {
  const t = useTranslations("homeCards");
  const locale = useLocale();
  const visible = useHeroOverlay(SHOW_AFTER_MS);
  const isEnglish = locale === "en";

  return (
    <AnimatePresence>
      {visible && (
        <section
          aria-label={t("label")}
          className="pointer-events-none absolute inset-x-0 top-24 z-20 px-3 sm:top-28 sm:px-6"
        >
          <div className="pointer-events-auto mx-auto grid max-w-5xl grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-4">
            {cards.map(({ key, href, icon: Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={href}
                  dir="ltr"
                  className={`group relative flex h-full min-h-24 overflow-hidden rounded-2xl border border-white/25 bg-white/10 shadow-[0_8px_28px_rgba(27,19,37,0.08)] backdrop-blur-md transition-all hover:-translate-y-1 hover:border-white/40 hover:bg-white/15 sm:min-h-28 ${
                    isEnglish ? "flex-row-reverse" : ""
                  }`}
                  style={{
                    WebkitBackdropFilter: "blur(14px)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <div
                    className="min-w-0 flex-1 self-center p-3.5 text-start sm:p-4"
                    dir="auto"
                  >
                    <h2 className="text-xs font-bold tracking-tight text-brand-700 sm:text-sm">
                      {t(`${key}.title`)}
                    </h2>
                    <p className="mt-1 line-clamp-3 text-[11px] leading-4.5 text-gray-700 sm:mt-1.5 sm:line-clamp-none sm:text-xs sm:leading-5">
                      {t(`${key}.description`)}
                    </p>
                  </div>

                  <span className="relative flex w-16 shrink-0 items-stretch self-stretch overflow-hidden sm:w-20">
                    <motion.span
                      className="relative z-10 m-auto text-brand-700"
                      animate={iconMotion[key].animate}
                      transition={iconMotion[key].transition}
                    >
                      <Icon className="h-11 w-11 sm:h-14 sm:w-14" strokeWidth={1.5} />
                    </motion.span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </AnimatePresence>
  );
}
