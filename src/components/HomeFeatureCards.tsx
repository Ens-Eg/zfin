"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  UsersIcon,
  SparklesIcon,
  CodeIcon,
} from "@/components/icons";
import { HERO_VIDEO_ID } from "@/lib/playHeroVideo";

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

export default function HomeFeatureCards() {
  const t = useTranslations("homeCards");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let showTimer: number | undefined;
    let started = false;

    const schedule = () => {
      if (started) return;
      started = true;
      showTimer = window.setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    };

    const onPlaying = () => schedule();
    window.addEventListener("ens:hero-playing", onPlaying);

    const video = document.getElementById(HERO_VIDEO_ID);
    if (video instanceof HTMLVideoElement) {
      if (!video.paused && video.currentTime > 0) schedule();
      video.addEventListener("playing", onPlaying);
    }

    return () => {
      window.removeEventListener("ens:hero-playing", onPlaying);
      if (video instanceof HTMLVideoElement) {
        video.removeEventListener("playing", onPlaying);
      }
      if (showTimer) window.clearTimeout(showTimer);
    };
  }, []);

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
                  className="group flex h-full items-start gap-3 rounded-2xl border border-white/25 bg-white/10 p-3.5 shadow-[0_8px_28px_rgba(27,19,37,0.08)] backdrop-blur-md transition-all hover:-translate-y-1 hover:border-white/40 hover:bg-white/15 sm:gap-3.5 sm:p-4"
                  style={{
                    WebkitBackdropFilter: "blur(14px)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <div className="min-w-0 flex-1 text-start" dir="auto">
                    <h2 className="text-xs font-bold tracking-tight text-ink-900 sm:text-sm">
                      {t(`${key}.title`)}
                    </h2>
                    <p className="mt-1 line-clamp-3 text-[11px] leading-4.5 text-gray-700 sm:mt-1.5 sm:line-clamp-none sm:text-xs sm:leading-5">
                      {t(`${key}.description`)}
                    </p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/35 bg-white/20 text-brand-700 shadow-sm backdrop-blur-sm transition-transform group-hover:scale-105 sm:h-9 sm:w-9">
                    <Icon className="h-4 w-4" />
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
