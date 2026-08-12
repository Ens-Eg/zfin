"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  BrainIcon,
  ShieldIcon,
  CheckIcon,
  SparklesIcon,
} from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

type CardKey = "ai" | "web" | "mobile" | "security" | "cloud" | "integration";

const particles = [
  { top: "18%", left: "12%", delay: "0s" },
  { top: "70%", left: "20%", delay: "0.6s" },
  { top: "30%", left: "82%", delay: "1.2s" },
  { top: "78%", left: "70%", delay: "1.8s" },
  { top: "12%", left: "55%", delay: "2.4s" },
  { top: "55%", left: "45%", delay: "3s" },
];

/* ---------- mini illustrations ---------- */

function AiGraphic() {
  return (
    <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-4 sm:p-5">
      {/* chat header */}
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-brand-500 to-indigo-500">
          <BrainIcon className="h-4 w-4 text-white" />
        </div>
        <div className="h-2 w-20 rounded-full bg-brand-200/80" />
        <span className="ms-auto flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
      </div>

      {/* chat bubbles */}
      <div className="mt-4 space-y-2.5">
        <div className="ms-auto w-3/5 rounded-2xl rounded-ee-sm bg-white p-2.5 shadow-sm">
          <div className="h-1.5 w-full rounded-full bg-brand-100" />
          <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-brand-100/70" />
        </div>
        <div className="w-3/4 rounded-2xl rounded-ss-sm bg-linear-to-r from-brand-600 to-indigo-500 p-2.5 shadow-md shadow-brand-500/20">
          <div className="h-1.5 w-full rounded-full bg-white/45" />
          <div className="mt-1.5 h-1.5 w-4/5 rounded-full bg-white/30" />
          <div className="mt-2 flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                className="h-1.5 w-1.5 rounded-full bg-white"
              />
            ))}
          </div>
        </div>
      </div>

      {/* analytics strip */}
      <div className="mt-4 flex items-end justify-between gap-3 border-t border-brand-100 pt-4">
        <div className="flex flex-1 items-end gap-1.5" style={{ height: 44 }}>
          {[35, 60, 45, 80, 55, 95, 70].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.08 }}
              className="flex-1 rounded-t-md bg-linear-to-t from-brand-600 to-brand-400"
            />
          ))}
        </div>
        <div className="text-end">
          <div className="text-lg font-black text-ink-900" dir="ltr">
            98%
          </div>
          <div className="h-1.5 w-12 rounded-full bg-brand-200" />
        </div>
      </div>
    </div>
  );
}

function BrowserGraphic() {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-100 bg-brand-50/50">
      <div
        className="flex items-center gap-1.5 border-b border-brand-100 bg-white px-3 py-2"
        dir="ltr"
      >
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <div className="ms-2 h-3.5 flex-1 rounded-full bg-brand-50" />
      </div>
      <div className="p-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-10 rounded-lg bg-linear-to-r from-brand-500 to-indigo-400"
        />
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 rounded-md bg-white shadow-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneGraphic() {
  return (
    <div className="flex justify-center">
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 rounded-2xl border border-brand-200 bg-white p-1.5 shadow-lg shadow-brand-500/10"
      >
        <div className="rounded-xl bg-brand-50/70 p-1.5">
          <div className="mx-auto h-1 w-8 rounded-full bg-brand-200" />
          <div className="mt-2 h-8 rounded-lg bg-linear-to-br from-brand-500 to-indigo-400" />
          <div className="mt-1.5 grid grid-cols-2 gap-1">
            <div className="h-4 rounded-md bg-white shadow-sm" />
            <div className="h-4 rounded-md bg-white shadow-sm" />
          </div>
          <div className="mt-1.5 h-3 rounded-full bg-brand-400" />
        </div>
      </motion.div>
    </div>
  );
}

function ShieldGraphic() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <motion.span
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-brand-400/70"
        />
        <span className="absolute inset-2 rounded-full border border-brand-300/60" />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-brand-600 to-indigo-600 shadow-lg shadow-brand-500/40">
          <ShieldIcon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="flex items-center gap-1.5"
          >
            <CheckIcon className="h-3 w-3 text-emerald-500" />
            <div className="h-1.5 w-16 rounded-full bg-brand-100" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CloudGraphic() {
  return (
    <div className="space-y-2">
      {[0, 1].map((row) => (
        <div
          key={row}
          className="flex items-center gap-2 rounded-xl border border-brand-100 bg-white px-3 py-2.5 shadow-sm"
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: row * 0.4 }}
            className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
          />
          <div className="h-1.5 flex-1 rounded-full bg-brand-50" />
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-3 w-1 rounded-full bg-brand-400/70" />
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between px-1 pt-1">
        <div className="h-1.5 w-14 rounded-full bg-brand-100" />
        <span className="text-xs font-black text-brand-600" dir="ltr">
          99.9%
        </span>
      </div>
    </div>
  );
}

function IntegrationGraphic() {
  const nodes = [
    { label: "Pay", x: 40, y: 30 },
    { label: "ERP", x: 40, y: 110 },
    { label: "CRM", x: 360, y: 30 },
    { label: "API", x: 360, y: 110 },
  ];
  return (
    <svg viewBox="0 0 400 140" className="w-full max-w-md">
      {nodes.map((n) => (
        <motion.line
          key={n.label}
          x1={n.x}
          y1={n.y}
          x2={200}
          y2={70}
          stroke="rgba(124,58,237,0.4)"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g
          key={n.label}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 250 }}
        >
          <rect
            x={n.x - 26}
            y={n.y - 15}
            width="52"
            height="30"
            rx="10"
            fill="rgba(124,58,237,0.06)"
            stroke="rgba(124,58,237,0.25)"
          />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fill="#6a21d1"
            fontSize="11"
            fontWeight="700"
          >
            {n.label}
          </text>
        </motion.g>
      ))}
      {/* hub */}
      <motion.circle
        cx="200"
        cy="70"
        r="26"
        fill="none"
        stroke="rgba(139,92,246,0.35)"
        animate={{ r: [26, 32, 26], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <circle cx="200" cy="70" r="22" fill="url(#hubGrad)" />
      <text
        x="200"
        y="75"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="12"
        fontWeight="900"
      >
        ENS
      </text>
      <defs>
        <linearGradient id="hubGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- card shell with glow / tilt / particles ---------- */

function BentoCard({
  cardKey,
  graphic,
  layout,
}: {
  cardKey: CardKey;
  graphic: ReactNode;
  layout: "big" | "small" | "wide";
}) {
  const t = useTranslations("bento.cards");
  const ref = useRef<HTMLDivElement>(null);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 20 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--glow-x", `${x}px`);
    el.style.setProperty("--glow-y", `${y}px`);
    el.style.setProperty("--glow-intensity", "1");
    rotateXRaw.set(((y - rect.height / 2) / rect.height) * -5);
    rotateYRaw.set(((x - rect.width / 2) / rect.width) * 5);
  };

  const onMouseLeave = () => {
    ref.current?.style.setProperty("--glow-intensity", "0");
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  };

  const text = (
    <div className={layout === "wide" ? "lg:max-w-sm" : ""}>
      <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
        {t(`${cardKey}.label`)}
      </span>
      <h3
        className={`mt-2 font-extrabold text-ink-900 ${
          layout === "big" ? "text-xl sm:text-2xl" : "text-base"
        }`}
      >
        {t(`${cardKey}.title`)}
      </h3>
      <p
        className={`mt-2 leading-7 text-gray-600 ${
          layout === "big" ? "text-base" : "text-sm"
        }`}
      >
        {t(`${cardKey}.description`)}
      </p>
    </div>
  );

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="h-full"
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`bento-card h-full p-6 sm:p-7 ${
          layout === "wide"
            ? "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
            : "flex flex-col gap-6"
        }`}
      >
        <div className="bento-spotlight" />
        {particles.map((p, i) => (
          <span
            key={i}
            className="bento-particle"
            style={{ top: p.top, left: p.left, animationDelay: p.delay }}
          />
        ))}

        {layout === "big" ? (
          <>
            <div className="relative flex-1">{graphic}</div>
            <div className="relative">{text}</div>
          </>
        ) : layout === "wide" ? (
          <>
            <div className="relative">{text}</div>
            <div className="relative flex-1 lg:max-w-lg">{graphic}</div>
          </>
        ) : (
          <>
            <div className="relative">{graphic}</div>
            <div className="relative mt-auto">{text}</div>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ---------- section ---------- */

const cards: {
  key: CardKey;
  layout: "big" | "small" | "wide";
  graphic: ReactNode;
  className: string;
}[] = [
  {
    key: "ai",
    layout: "big",
    graphic: <AiGraphic />,
    className: "lg:col-span-2 lg:row-span-2",
  },
  { key: "web", layout: "small", graphic: <BrowserGraphic />, className: "" },
  { key: "mobile", layout: "small", graphic: <PhoneGraphic />, className: "" },
  {
    key: "security",
    layout: "small",
    graphic: <ShieldGraphic />,
    className: "",
  },
  { key: "cloud", layout: "small", graphic: <CloudGraphic />, className: "" },
  {
    key: "integration",
    layout: "wide",
    graphic: <IntegrationGraphic />,
    className: "sm:col-span-2 lg:col-span-4",
  },
];

export default function MagicBento() {
  const t = useTranslations("bento");

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute top-1/4 -inset-e-32 h-96 w-96 rounded-full bg-brand-100/70 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-700">
            <SparklesIcon className="h-4 w-4" />
            {t("badge")}
          </span>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-ink-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            {t("subtitle")}
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ key, layout, graphic, className }) => (
            <StaggerItem key={key} className={`h-full ${className}`}>
              <BentoCard cardKey={key} graphic={graphic} layout={layout} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
