"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} dir="ltr">
      {value}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const t = useTranslations("stats");

  const stats = [
    { value: 50, suffix: "+", label: t("projects") },
    { value: 40, suffix: "+", label: t("clients") },
    { value: 7, suffix: "+", label: t("years") },
    { value: 24, suffix: "/7", label: t("support") },
  ];

  return (
    <section className="relative border-y border-brand-100 bg-linear-to-r from-brand-50 via-white to-brand-50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl font-black text-brand-600 sm:text-4xl">
              <Counter to={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-2 text-sm font-semibold text-gray-600">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
