"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  ArrowIcon,
  CheckIcon,
  MailIcon,
  ShieldIcon,
} from "@/components/icons";
import { Reveal } from "@/components/motion";

export type LegalSection = {
  title: string;
  body?: string;
  items?: string[];
};

export type LegalRelated = {
  label: string;
  title: string;
  description: string;
  cta: string;
  href: "/terms" | "/privacy";
};

export type LegalContact = {
  title: string;
  body: string;
  button: string;
};

function sectionId(index: number) {
  return `legal-section-${index + 1}`;
}

export default function LegalContent({
  intro,
  sections,
  closing,
  lastUpdated,
  tocLabel,
  sectionsLabel,
  related,
  contact,
}: {
  intro: string;
  sections: LegalSection[];
  closing?: string;
  lastUpdated: string;
  tocLabel: string;
  sectionsLabel: string;
  related: LegalRelated;
  contact: LegalContact;
}) {
  const [activeId, setActiveId] = useState(sectionId(0));

  useEffect(() => {
    const elements = sections
      .map((_, i) => document.getElementById(sectionId(i)))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <section className="relative pb-24">
      <div className="pointer-events-none absolute top-10 -inset-s-24 h-72 w-72 rounded-full bg-brand-100/70 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -inset-e-20 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <Reveal>
          <div className="overflow-hidden rounded-[1.75rem] border border-brand-100 bg-linear-to-br from-white via-brand-50/40 to-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-bold text-brand-700 sm:text-sm">
                <ShieldIcon className="h-3.5 w-3.5" />
                {lastUpdated}
              </span>
              <span className="text-xs text-gray-400 sm:text-sm">
                {sectionsLabel}
              </span>
            </div>
            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">
              {intro}
            </p>
          </div>
        </Reveal>

        {/* Mobile TOC */}
        <Reveal delay={1} className="mt-8 lg:hidden">
          <div className="rounded-2xl border border-brand-100 bg-white/80 p-4 shadow-sm backdrop-blur">
            <p className="mb-3 text-xs font-bold tracking-wide text-brand-700 uppercase">
              {tocLabel}
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {sections.map((section, i) => {
                const id = sectionId(i);
                const active = activeId === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-brand-600 text-white shadow-md shadow-brand-500/25"
                        : "bg-brand-50 text-ink-800 hover:bg-brand-100"
                    }`}
                  >
                    {i + 1}. {section.title}
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]">
          {/* Desktop sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-bold tracking-wide text-brand-700 uppercase">
                {tocLabel}
              </p>
              <nav className="mt-4 space-y-1 border-s-2 border-brand-100">
                {sections.map((section, i) => {
                  const id = sectionId(i);
                  const active = activeId === id;
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`block border-s-2 -ms-0.5 ps-4 py-2 text-sm leading-6 transition-colors ${
                        active
                          ? "border-brand-600 font-bold text-brand-700"
                          : "border-transparent text-gray-500 hover:border-brand-300 hover:text-ink-800"
                      }`}
                    >
                      <span className="me-2 text-xs text-brand-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Sections */}
          <div className="min-w-0 space-y-5">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={Math.min(i, 5)}>
                <article
                  id={sectionId(i)}
                  className="scroll-mt-28 rounded-3xl border border-brand-100/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md hover:shadow-brand-500/5 sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-600 to-brand-400 text-sm font-black text-white shadow-lg shadow-brand-500/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-black tracking-tight text-ink-900 sm:text-xl">
                        {section.title}
                      </h2>
                      {section.body && (
                        <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                          {section.body}
                        </p>
                      )}
                      {section.items && section.items.length > 0 && (
                        <ul className="mt-5 space-y-3">
                          {section.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-sm leading-7 text-gray-600 sm:text-base"
                            >
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                                <CheckIcon className="h-3 w-3" />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}

            {closing && (
              <Reveal delay={2}>
                <div className="rounded-3xl border border-brand-200 bg-linear-to-br from-brand-50 to-white p-6 sm:p-8">
                  <p className="text-base font-medium leading-8 text-ink-800 sm:text-lg sm:leading-9">
                    {closing}
                  </p>
                </div>
              </Reveal>
            )}

            {/* Related + Contact */}
            <Reveal delay={2}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Link
                  href={related.href}
                  className="group flex flex-col rounded-3xl border border-brand-100 bg-white p-6 shadow-sm transition-all hover:border-brand-300 hover:shadow-md hover:shadow-brand-500/8 sm:p-7"
                >
                  <span className="text-xs font-bold tracking-wide text-brand-600 uppercase">
                    {related.label}
                  </span>
                  <h3 className="mt-2 text-lg font-extrabold text-ink-900">
                    {related.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-gray-500">
                    {related.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-700">
                    {related.cta}
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-700 via-brand-600 to-indigo-600 p-6 text-white shadow-lg shadow-brand-500/20 transition-transform hover:scale-[1.01] sm:p-7"
                >
                  <div className="pointer-events-none absolute -top-10 inset-e-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                      <MailIcon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold">
                      {contact.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-brand-100">
                      {contact.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                      {contact.button}
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
