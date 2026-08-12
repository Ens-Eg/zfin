"use client";

import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowIcon,
  ChatIcon,
  ExternalLinkIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TiktokIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/icons";
import { Reveal } from "@/components/motion";

const PHONE = "201553841793";
const MAP_LAT = 30.7908273;
const MAP_LNG = 30.9797182;

const socials = [
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: TiktokIcon, href: "https://tiktok.com", label: "TikTok" },
  {
    icon: WhatsappIcon,
    href: `https://wa.me/${PHONE}`,
    label: "WhatsApp",
  },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "Youtube" },
] as const;

const btnBase =
  "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold leading-none transition-colors active:scale-[0.98] sm:px-2.5 sm:py-1.5 sm:text-[11px]";
const btnPrimary = `${btnBase} bg-brand-600 text-white hover:bg-brand-700`;
const btnWhatsapp = `${btnBase} border border-emerald-500/25 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15`;
const btnMuted = `${btnBase} border border-brand-100 bg-brand-50/60 text-ink-800 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700`;

function ChannelIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-100 bg-brand-50 text-brand-600">
      {children}
    </span>
  );
}

function PhoneChannelRow({
  icon: Icon,
  label,
  phone,
  tel,
  wa,
  callLabel,
  whatsappLabel,
}: {
  icon: typeof PhoneIcon;
  label: string;
  phone: string;
  tel: string;
  wa: string;
  callLabel: string;
  whatsappLabel: string;
}) {
  return (
    <div className="flex min-h-14 flex-col gap-2 border-b border-brand-50 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-2.5 text-start">
        <ChannelIcon>
          <Icon className="size-3.5" />
        </ChannelIcon>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
            {label}
          </p>
          <a
            href={`tel:${tel}`}
            dir="ltr"
            className="mt-0.5 block text-sm font-bold tabular-nums tracking-tight text-ink-900 transition-colors hover:text-brand-600"
          >
            {phone}
          </a>
        </div>
      </div>
      <div className="ms-10 flex flex-wrap items-center gap-1.5 sm:ms-0 sm:shrink-0">
        <a href={`tel:${tel}`} className={btnPrimary}>
          <PhoneIcon className="size-2.5 sm:size-3" />
          {callLabel}
        </a>
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
          className={btnWhatsapp}
        >
          <WhatsappIcon className="size-2.5 sm:size-3" />
          {whatsappLabel}
        </a>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const mapHl = locale === "ar" ? "ar" : "en";
  const mapEmbed = `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}+(ENSEGYPT)&z=17&hl=${mapHl}&output=embed`;
  const mapLink = `https://www.google.com/maps/place/ENSEGYPT/@30.790922,30.979344,17z/data=!4m6!3m5!1s0x14f7cb82610f9871:0xf63814b1b38dcf46!8m2!3d30.7908273!4d30.9797182!16s%2Fg%2F11kpmwvzgv?hl=${mapHl}`;

  return (
    <section className="relative overflow-x-hidden bg-grid pb-16 pt-28 text-ink-900 md:pt-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -inset-s-20 top-0 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -inset-e-16 bottom-0 h-48 w-48 rounded-full bg-brand-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700"
        >
          <ArrowIcon className="size-4 rotate-180 transition-transform group-hover:-translate-x-0.5 rtl:rotate-0 rtl:group-hover:translate-x-0.5" />
          {t("backHome")}
        </Link>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
            <Reveal>
              <header className="max-w-xl text-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700">
                  <ChatIcon className="size-3.5" />
                  {t("badge")}
                </div>
                <h1 className="mt-4 text-3xl font-black tracking-tight text-ink-900 md:text-4xl">
                  {t("title")}
                </h1>
                <p className="mt-4 text-sm font-medium leading-relaxed text-gray-500 md:text-base">
                  {t("subtitle")}
                </p>
                <p className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-gray-500">
                  <ChatIcon
                    className="mt-0.5 size-4 shrink-0 text-brand-500"
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">{t("responseNote")}</span>
                </p>
              </header>
            </Reveal>

            <Reveal delay={1}>
              <a
                href={`https://wa.me/${PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl border border-emerald-200/80 bg-linear-to-br from-emerald-50 via-white to-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md sm:p-6"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-8 -inset-e-6 h-28 w-28 rounded-full bg-emerald-400/20 blur-2xl"
                />
                <div className="relative z-10 flex flex-col gap-4 text-start">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold tracking-wide text-emerald-700">
                        {t("whatsapp.eyebrow")}
                      </p>
                      <h2 className="mt-1.5 text-xl font-black leading-snug text-ink-900 sm:text-2xl">
                        {t("whatsapp.title")}
                      </h2>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 transition-transform group-hover:scale-105 sm:h-14 sm:w-14">
                      <WhatsappIcon className="size-6 sm:size-7" />
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-gray-500">
                    {t("whatsapp.description")}
                  </p>
                  <span className="inline-flex w-fit items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                    {t("whatsapp.responseTime")}
                  </span>
                </div>
              </a>
            </Reveal>

            <Reveal delay={2}>
              <section aria-labelledby="social-heading">
                <h2
                  id="social-heading"
                  className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-brand-600"
                >
                  {t("socialTitle")}
                </h2>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="group flex min-h-23 flex-col items-center justify-center gap-1.5 rounded-2xl border border-brand-100/80 bg-white/90 px-2 py-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md sm:min-h-25 sm:gap-2 sm:px-3 sm:py-4"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-[11px] font-bold text-ink-800 sm:text-xs">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            </Reveal>
          </div>

          <Reveal delay={1} className="min-w-0 lg:sticky lg:top-28">
            <article className="overflow-hidden rounded-2xl border border-brand-100/80 bg-white/90 shadow-sm backdrop-blur-sm">
              <div className="border-b border-brand-50 px-4 py-2.5 sm:px-5 sm:py-3">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
                  {t("detailsTitle")}
                </h2>
              </div>

              <div className="px-4 sm:px-5">
                <PhoneChannelRow
                  icon={PhoneIcon}
                  label={t("channels.support.label")}
                  phone={`+${PHONE}`}
                  tel={`+${PHONE}`}
                  wa={PHONE}
                  callLabel={t("call")}
                  whatsappLabel={t("whatsappBtn")}
                />

                <div className="border-b border-brand-50 py-3">
                  <div className="relative overflow-hidden rounded-xl border border-emerald-500/15 bg-linear-to-r from-emerald-500/8 via-brand-500/6 to-transparent px-3 py-2.5 text-start">
                    <div className="relative flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600">
                        <WhatsappIcon className="size-3.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <p className="text-sm font-black text-brand-600 sm:text-[15px]">
                            {t("channels.ai.label")}
                          </p>
                          <span className="inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-emerald-700">
                            {t("channels.ai.soon")}
                          </span>
                          <span className="inline-flex rounded-full border border-brand-300/40 bg-brand-500/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-brand-700">
                            {t("channels.ai.aiBadge")}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] font-medium text-gray-500">
                          {t("channels.ai.note")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-14 flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <div className="flex min-w-0 flex-1 items-center gap-2.5 text-start">
                    <ChannelIcon>
                      <MailIcon className="size-3.5" />
                    </ChannelIcon>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                        {t("channels.email.label")}
                      </p>
                      <a
                        href={`mailto:${t("channels.email.value")}`}
                        className="mt-0.5 block truncate text-sm font-bold text-ink-900 transition-colors hover:text-brand-600"
                      >
                        {t("channels.email.value")}
                      </a>
                    </div>
                  </div>
                  <div className="ms-10 sm:ms-0 sm:shrink-0">
                    <a
                      href={`mailto:${t("channels.email.value")}`}
                      className={btnPrimary}
                    >
                      <MailIcon className="size-2.5 sm:size-3" />
                      {t("sendEmail")}
                    </a>
                  </div>
                </div>
              </div>
            </article>

            <article className="mt-3 overflow-hidden rounded-2xl border border-brand-100/80 bg-white/90 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3 border-b border-brand-50 px-4 py-2.5 sm:px-5 sm:py-3">
                <div className="min-w-0 text-start">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
                    {t("location.title")}
                  </h2>
                  <p className="mt-0.5 text-sm font-medium text-gray-600">
                    {t("location.country")}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {t("info.address.value")}
                  </p>
                </div>
                <ChannelIcon>
                  <MapPinIcon className="size-3.5" />
                </ChannelIcon>
              </div>
              <div className="border-b border-brand-50 p-3 sm:p-4">
                <div className="overflow-hidden rounded-xl border border-brand-100/80 bg-brand-50/40 shadow-sm">
                  <iframe
                    src={mapEmbed}
                    title={t("location.title")}
                    className="h-38 w-full border-0 sm:h-42"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="px-4 py-2.5 sm:px-5 sm:py-3">
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnMuted}
                >
                  <ExternalLinkIcon className="size-2.5 sm:size-3" />
                  {t("location.openMaps")}
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
