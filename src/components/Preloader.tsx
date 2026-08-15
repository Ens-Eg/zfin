"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { playHeroVideo } from "@/lib/playHeroVideo";

const BOT_UA = /bot|crawler|spider|google|bing|yandex|baidu|duckduck|slurp/i;

const PURPLE = ["#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#5b21b6"];
const GREY = ["#9ca3af", "#6b7280", "#4b5563", "#374151", "#1f2937"];

function HexRing({
  size,
  color,
  duration,
  reverse,
  dash,
  delay = 0,
}: {
  size: number;
  color: string;
  duration: number;
  reverse?: boolean;
  dash?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="absolute"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 0.7, scale: 1, rotate: reverse ? -360 : 360 }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration, repeat: Infinity, ease: "linear", delay },
      }}
    >
      <polygon
        points="50,3 93,26.5 93,73.5 50,97 7,73.5 7,26.5"
        fill="none"
        stroke={color}
        strokeWidth="0.7"
        strokeDasharray={dash}
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function OrbitDot({
  radius,
  size,
  color,
  duration,
  delay,
}: {
  radius: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
      initial={{ opacity: 0 }}
      animate={{ rotate: 360, opacity: 1 }}
      transition={{
        rotate: { duration, repeat: Infinity, ease: "linear", delay },
        opacity: { duration: 0.4, delay },
      }}
    >
      <span
        className="absolute top-0 left-1/2 rounded-full"
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          background: color,
          boxShadow: `0 0 12px ${color}`,
        }}
      />
    </motion.div>
  );
}

function EnsMark() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_12px_28px_rgba(124,58,237,0.28)]">
      <defs>
        <linearGradient id="ensPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={PURPLE[1]} />
          <stop offset="40%" stopColor={PURPLE[3]} />
          <stop offset="100%" stopColor={PURPLE[4]} />
        </linearGradient>
        <linearGradient id="ensGrey" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={GREY[1]} />
          <stop offset="50%" stopColor={GREY[3]} />
          <stop offset="100%" stopColor={GREY[4]} />
        </linearGradient>
        <filter id="ensGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* grey ribbon draws first (back) */}
      <motion.path
        d="M142 176 C142 176 142 104 142 104 C142 78 122 58 96 58 L50 58"
        fill="none"
        stroke="url(#ensGrey)"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#ensGlow)"
        initial={{ pathLength: 0, opacity: 0.2 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />

      {/* purple ribbon */}
      <motion.path
        d="M58 24 C58 24 58 96 58 96 C58 122 78 142 104 142 L150 142"
        fill="none"
        stroke="url(#ensPurple)"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#ensGlow)"
        initial={{ pathLength: 0, opacity: 0.2 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
      />
    </svg>
  );
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return (
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export default function Preloader() {
  const t = useTranslations("preloader");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (BOT_UA.test(navigator.userAgent)) return;

    const prev = document.body.style.overflow;

    if (isIOS()) {
      const onPlaying = () => {
        setVisible(true);
        document.body.style.overflow = "hidden";
        window.setTimeout(() => setVisible(false), 1800);
      };
      window.addEventListener("ens:hero-playing", onPlaying, { once: true });
      playHeroVideo();
      return () => {
        window.removeEventListener("ens:hero-playing", onPlaying);
        document.body.style.overflow = prev;
      };
    }

    setVisible(true);
    document.body.style.overflow = "hidden";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduced ? 900 : 2400;
    const timer = window.setTimeout(() => setVisible(false), hold);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        playHeroVideo();
      }}
    >
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex h-dvh w-full items-center justify-center overflow-hidden bg-linear-to-b from-white via-[#f4f2f8] to-[#d8d4e2]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(16px)",
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          onPointerDown={() => {
            playHeroVideo();
            window.dispatchEvent(new Event("ens:unlock-media"));
          }}
          onTouchStart={() => {
            playHeroVideo();
            window.dispatchEvent(new Event("ens:unlock-media"));
          }}
          role="status"
          aria-live="polite"
          aria-label={t("loading")}
        >
          {/* ambient orbs — logo halves */}
          <motion.div
            className="pointer-events-none absolute -top-24 -left-16 h-112 w-md rounded-full bg-brand-400/30 blur-[90px]"
            animate={{ x: [0, 30, 0], y: [0, 18, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-10 -bottom-28 h-104 w-104 rounded-full bg-gray-400/25 blur-[90px]"
            animate={{ x: [0, -24, 0], y: [0, -16, 0], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_62%)]" />

          {/* faint grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(124,58,237,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.12) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
              maskImage: "radial-gradient(circle at center, black 18%, transparent 72%)",
            }}
          />

          <div className="relative flex flex-col items-center px-6">
            {/* orbital stage */}
            <div className="relative mb-8 flex h-52 w-52 items-center justify-center sm:h-60 sm:w-60">
              <HexRing size={236} color="rgba(124,58,237,0.35)" duration={18} dash="4 8" />
              <HexRing
                size={200}
                color="rgba(75,85,99,0.4)"
                duration={14}
                reverse
                dash="10 6"
                delay={0.1}
              />
              <HexRing
                size={164}
                color="rgba(109,40,217,0.55)"
                duration={10}
                dash="2 10"
                delay={0.18}
              />

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <OrbitDot radius={98} size={6} color={PURPLE[3]} duration={4.2} delay={0} />
                <OrbitDot radius={80} size={4} color={GREY[3]} duration={5.4} delay={0.6} />
                <OrbitDot radius={118} size={5} color={PURPLE[2]} duration={6.8} delay={1.1} />
              </div>

              <motion.div
                className="relative z-10 h-28 w-28 sm:h-32 sm:w-32"
                initial={{ scale: 0.55, rotate: -18, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="h-full w-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                >
                  <EnsMark />
                </motion.div>
              </motion.div>
            </div>

            {/* stylized ENS wordmark — 3-bar E + NS */}
            <div dir="ltr" className="flex items-center gap-3 sm:gap-3.5">
              <div className="flex w-8 flex-col justify-center gap-1.75 sm:w-9 sm:gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-0.75 origin-left rounded-full bg-linear-to-r from-brand-400 via-brand-600 to-brand-800 shadow-[0_0_12px_rgba(124,58,237,0.45)] sm:h-[3.5px]"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{
                      delay: 1.05 + i * 0.14,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                ))}
              </div>
              <motion.span
                className="bg-linear-to-r from-brand-500 via-brand-700 to-brand-900 bg-clip-text text-[2rem] font-black tracking-[0.28em] text-transparent sm:text-4xl"
                initial={{ opacity: 0, x: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: 1.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                NS
              </motion.span>
            </div>

            <motion.p
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="mt-4 max-w-xs text-center text-[11px] font-medium tracking-[0.18em] text-gray-500 sm:text-xs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.55, duration: 0.5 }}
            >
              {t("tagline")}
            </motion.p>

            {/* energy bar */}
            <div className="mt-8 h-0.5 w-40 overflow-hidden rounded-full bg-brand-200 sm:w-52">
              <motion.div
                className="h-full origin-left rounded-full bg-linear-to-r from-gray-500 via-brand-500 to-brand-700 shadow-[0_0_10px_rgba(124,58,237,0.45)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.15, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
