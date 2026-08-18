"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import {
  MenuIcon,
  XIcon,
  GlobeIcon,
  ArrowIcon,
  SparklesIcon,
  FileTextIcon,
  ShieldIcon,
} from "@/components/icons";
import {
  NavHomeIcon,
  NavServicesIcon,
  NavShowcasesIcon,
  NavAboutIcon,
  NavContactIcon,
} from "@/components/NavIcons";

const links = [
  { href: "/", key: "home", icon: NavHomeIcon },
  { href: "/services", key: "services", icon: NavServicesIcon },
  { href: "/showcases", key: "showcases", icon: NavShowcasesIcon },
  { href: "/about", key: "about", icon: NavAboutIcon },
  { href: "/contact", key: "contact", icon: NavContactIcon },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<(typeof links)[number]["key"] | null>(
    null,
  );
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setHovered(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const otherLocale = locale === "ar" ? "en" : "ar";

  return (
    <>
      {/* scroll progress line */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-60 h-0.75 bg-linear-to-r from-brand-600 via-brand-400 to-indigo-500 ltr:origin-left rtl:origin-right"
      />

      {/* floating island */}
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed inset-x-0 top-4 z-50 px-3 sm:px-6"
      >
        <div
          className={`mx-auto max-w-5xl rounded-full p-px transition-all duration-500 ${
            scrolled
              ? "bg-linear-to-r from-brand-400/60 via-brand-200/50 to-indigo-400/60 shadow-[0_10px_40px_rgba(124,58,237,0.18)]"
              : "bg-linear-to-r from-brand-200/50 via-white/60 to-brand-200/50"
          }`}
        >
          <nav
            className={`flex items-center justify-between gap-3 rounded-full px-4 py-2.5 backdrop-blur-2xl transition-colors duration-500 sm:px-5 ${
              scrolled ? "bg-white/90" : "bg-white/65"
            }`}
          >
            {/* logo */}
            <Link href="/" className="group flex shrink-0 items-center">
              <Image
                src="/ens-logo.png"
                alt="ENS Egypt"
                width={207}
                height={55}
                className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
                sizes="120px"
                priority
              />
            </Link>

            {/* desktop links */}
            <ul className="hidden items-center gap-0.5 lg:flex">
              {links.map((link) => {
                const active = pathname === link.href;
                const Icon = link.icon;
                return (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      onMouseEnter={() => setHovered(link.key)}
                      onMouseLeave={() => setHovered(null)}
                      className={`group relative flex items-center rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                        active
                          ? "text-brand-700"
                          : "text-gray-600 hover:text-brand-700"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full border border-brand-300/60 bg-brand-100 shadow-[0_0_18px_rgba(139,92,246,0.2)]"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      )}
                      <span className="relative flex items-center gap-1.5">
                        <Icon
                          className="h-4 w-4 shrink-0"
                          active={active}
                          hovered={hovered === link.key}
                        />
                        {t(link.key)}
                      </span>
                      {/* hover underline sweep */}
                      {!active && (
                        <span className="absolute inset-x-4 -bottom-0.5 h-px origin-center scale-x-0 bg-linear-to-r from-transparent via-brand-500 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* desktop actions */}
            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href={pathname}
                locale={otherLocale}
                className="group flex h-10 items-center gap-1.5 rounded-full border border-brand-200 bg-white/70 px-4 text-sm font-bold text-gray-700 transition-all hover:border-brand-400 hover:text-brand-700"
              >
                <GlobeIcon className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                {otherLocale === "ar" ? (
                  <span className="font-ar">العربية</span>
                ) : (
                  "EN"
                )}
              </Link>
              <Link
                href="/contact"
                className="group relative flex h-10 items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-brand-600 to-indigo-500 px-5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-brand-500/50"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <SparklesIcon className="relative h-4 w-4" />
                <span className="relative">{t("getStarted")}</span>
              </Link>
            </div>

            {/* mobile actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href={pathname}
                locale={otherLocale}
                className="group flex h-9 items-center gap-1 rounded-full border border-brand-200 bg-white/70 px-3 text-xs font-bold text-gray-700"
              >
                <GlobeIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45" />
                {otherLocale === "ar" ? (
                  <span className="font-ar">ع</span>
                ) : (
                  "EN"
                )}
              </Link>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-200 bg-white/70 text-ink-900 transition-colors hover:bg-brand-100"
              >
                {open ? (
                  <XIcon className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white/95 backdrop-blur-2xl lg:hidden"
          >
            {/* glows */}
            <div className="pointer-events-none absolute -top-24 inset-s-1/4 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 inset-e-0 h-72 w-72 rounded-full bg-indigo-300/25 blur-3xl" />

            <nav className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-2 px-8 pt-24 pb-12">
              {links.map((link, i) => {
                const active = pathname === link.href;
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onMouseEnter={() => setHovered(link.key)}
                      onMouseLeave={() => setHovered(null)}
                      className={`group flex items-center justify-between border-b border-brand-100 py-4 text-xl font-black transition-colors ${
                        active
                          ? "text-brand-600"
                          : "text-ink-900 hover:text-brand-600"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          className="h-6 w-6 shrink-0"
                          active={active}
                          hovered={hovered === link.key}
                        />
                        {t(link.key)}
                      </span>
                      <ArrowIcon className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-brand-600 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-600 to-indigo-500 py-4 text-base font-bold text-white shadow-xl shadow-brand-500/30"
                >
                  <SparklesIcon className="h-5 w-5" />
                  {t("getStarted")}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.58, duration: 0.4 }}
                className="mt-6 border-t border-brand-100 pt-2"
              >
                <Link
                  href="/terms"
                  className="flex items-center justify-between py-3 text-sm font-semibold text-gray-600 transition-colors hover:text-brand-600"
                >
                  <span className="flex items-center gap-2.5">
                    <FileTextIcon className="h-4 w-4 shrink-0" />
                    {tf("terms")}
                  </span>
                  <ArrowIcon className="h-4 w-4 text-gray-400 rtl:rotate-180" />
                </Link>
                <Link
                  href="/privacy"
                  className="flex items-center justify-between py-3 text-sm font-semibold text-gray-600 transition-colors hover:text-brand-600"
                >
                  <span className="flex items-center gap-2.5">
                    <ShieldIcon className="h-4 w-4 shrink-0" />
                    {tf("privacy")}
                  </span>
                  <ArrowIcon className="h-4 w-4 text-gray-400 rtl:rotate-180" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
