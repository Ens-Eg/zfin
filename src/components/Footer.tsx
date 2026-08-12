"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  TiktokIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  WhatsappIcon,
  FileTextIcon,
  ShieldIcon,
} from "@/components/icons";

const socials = [
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
  { icon: TiktokIcon, href: "https://tiktok.com", label: "TikTok" },
];

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const quickLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/services", label: t("nav.services") },
    { href: "/showcases", label: t("nav.showcases") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ] as const;

  const serviceKeys = ["web", "systems", "mobile", "ai"] as const;

  if (isHome) {
    return (
      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3 pb-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/50 bg-white/25 px-3 py-2 shadow-lg backdrop-blur-md">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/40 text-gray-700 transition-all hover:border-white hover:bg-white/70 hover:text-brand-700"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div
            dir="ltr"
            className="pointer-events-auto grid w-full grid-cols-2 items-center gap-2 rounded-2xl border border-white/50 bg-white/25 px-4 py-3 shadow-lg backdrop-blur-md sm:px-6 sm:py-3.5 lg:grid-cols-3"
          >
            <p
              dir="auto"
              className="justify-self-start text-start text-[10px] font-semibold text-gray-700 sm:text-xs"
            >
              © {new Date().getFullYear()} {t("footer.rights")}
            </p>

            <div className="hidden items-center justify-center gap-2 justify-self-center text-[10px] font-semibold text-gray-700 sm:gap-3 sm:text-xs lg:flex">
              <Link
                href="/terms"
                className="inline-flex items-center gap-1 rounded-full px-1.5 py-1 transition-colors hover:text-brand-700 sm:gap-1.5 sm:px-2"
              >
                <span>{t("footer.terms")}</span>
                <FileTextIcon className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
              </Link>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-1 rounded-full px-1.5 py-1 transition-colors hover:text-brand-700 sm:gap-1.5 sm:px-2"
              >
                <span>{t("footer.privacy")}</span>
                <ShieldIcon className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
              </Link>
            </div>

            <Link href="/" className="group inline-flex shrink-0 justify-self-end">
              <Image
                src="/ens-logo.png"
                alt="ENS Egypt"
                width={207}
                height={55}
                className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden bg-ink-900 text-white">
      <div className="pointer-events-none absolute -top-40 inset-s-1/4 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 inset-e-1/4 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="gap-2  flex justify-center items-center">
              <Image
                src="/ENS.png"
                alt="ENS Egypt"
                width={120}
                height={120}
                className="h-full w-auto"
              />
            </div>
            <p className="mt-4 text-sm leading-7 text-gray-400">
              {t("footer.description")}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-300 transition-all hover:bg-brand-600 hover:text-white hover:scale-110"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-300">
              {t("footer.quickLinks")}
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 transition-colors hover:text-brand-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-300">
              {t("footer.servicesTitle")}
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceKeys.map((key) => (
                <li key={key}>
                  <Link
                    href="/services"
                    className="text-xs text-gray-400 transition-colors hover:text-brand-300"
                  >
                    {t(`services.items.${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-300">
              {t("footer.support")}
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <span className="text-sm leading-6 text-gray-400">
                  {t("contact.info.address.value")}
                </span>
              </li>
              <li>
                <a
                  href="mailto:info@ens.eg"
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-brand-300"
                >
                  <MailIcon className="h-5 w-5 shrink-0 text-brand-400" />
                  info@ens.eg
                </a>
              </li>
              <li>
                <a
                  href="tel:+201553841793"
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-brand-300"
                >
                  <PhoneIcon className="h-5 w-5 shrink-0 text-brand-400" />
                  <span dir="ltr">+20 15 53841793</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201553841793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-brand-300"
                >
                  <WhatsappIcon className="h-5 w-5 shrink-0 text-brand-400" />
                  {t("footer.whatsapp")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          dir="ltr"
          className="mt-14 grid grid-cols-1 items-center gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <p
            dir="auto"
            className="justify-self-center text-center text-xs text-gray-500 sm:justify-self-start sm:text-start"
          >
            © {new Date().getFullYear()} {t("footer.rights")}
          </p>
          <div className="hidden items-center justify-center gap-4 text-[11px] text-gray-500 sm:text-xs lg:flex">
            <Link
              href="/terms"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-300"
            >
              {t("footer.terms")}
              <FileTextIcon className="h-3.5 w-3.5 shrink-0" />
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-300"
            >
              {t("footer.privacy")}
              <ShieldIcon className="h-3.5 w-3.5 shrink-0" />
            </Link>
          </div>
          <Link href="/" className="justify-self-center sm:justify-self-end">
            <Image
              src="/ens-logo.png"
              alt="ENS Egypt"
              width={207}
              height={55}
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
