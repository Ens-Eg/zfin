"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HERO_VIDEO_ID, skipIntro } from "@/lib/playHeroVideo";

export default function HomeSkipIntro() {
  const t = useTranslations("hero");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hide = () => setShow(false);
    const maybeShow = () => {
      const video = document.getElementById(HERO_VIDEO_ID);
      if (video instanceof HTMLVideoElement && video.dataset.phase !== "fill") {
        setShow(true);
      }
    };

    window.addEventListener("ens:hero-playing", maybeShow);
    window.addEventListener("ens:hero-skipped", hide);
    window.addEventListener("ens:hero-fill", hide);

    const timer = window.setTimeout(maybeShow, 700);

    return () => {
      window.removeEventListener("ens:hero-playing", maybeShow);
      window.removeEventListener("ens:hero-skipped", hide);
      window.removeEventListener("ens:hero-fill", hide);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none absolute bottom-40 left-3 z-30 sm:bottom-44 sm:left-6">
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-2xl border border-white/35 bg-white/15 px-5 py-2.5 text-sm font-bold text-brand-700 shadow-[0_8px_28px_rgba(27,19,37,0.16)] backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/25"
            style={{
              WebkitBackdropFilter: "blur(14px)",
              backdropFilter: "blur(14px)",
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              skipIntro();
              setShow(false);
            }}
          >
            {t("skipIntro")}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
