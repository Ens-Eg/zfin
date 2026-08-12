"use client";

import { motion } from "framer-motion";

export default function PageHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-grid pt-40 pb-16 sm:pt-48 sm:pb-20">
      <div className="pointer-events-none absolute -top-32 inset-s-[15%] h-80 w-80 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-10 inset-e-[10%] h-64 w-64 rounded-full bg-indigo-300/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-700"
        >
          {badge}
        </motion.span>
        <h1 className="mt-5 text-3xl font-black tracking-tight text-ink-900 sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
