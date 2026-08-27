"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/icons";
import { usePathname } from "@/i18n/navigation";
import { WHATSAPP_CHAT_NUMBER } from "@/data/site";
import { trackWhatsAppConversion } from "@/lib/gtm";

const defaultMessage = {
  ar: "مرحبًا، أريد الاستفسار عن خدماتكم",
  en: "Hello, I would like to inquire about your services",
} as const;

export default function WhatsAppChat() {
  const t = useTranslations("whatsappChat");
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lang = locale === "ar" ? "ar" : "en";
  const text = encodeURIComponent(defaultMessage[lang]);
  const whatsappUrl = `https://wa.me/${WHATSAPP_CHAT_NUMBER}?text=${text}`;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackWhatsAppConversion(whatsappUrl, () => {
      window.location.href = whatsappUrl;
    });
  };

  return (
    <div
      className={`fixed z-50 w-[min(17.5rem,calc(100vw-2rem))] end-4 bottom-4 sm:end-6 sm:bottom-6 ${
        isHome ? "max-md:end-3 max-md:bottom-[18rem] max-md:w-[min(17rem,calc(100vw-1.5rem))]" : ""
      }`}
    >
      <a
        href={whatsappUrl}
        aria-label={t("label")}
        onClick={handleClick}
        className={`group block overflow-hidden rounded-2xl border transition-transform hover:-translate-y-0.5 active:scale-[0.99] ${
          isHome
            ? "max-md:border-white/30 max-md:bg-white/10 max-md:shadow-[0_8px_28px_rgba(27,19,37,0.08)] max-md:backdrop-blur-md border-black/5 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
            : "border-black/5 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
        }`}
        style={
          isHome
            ? {
                WebkitBackdropFilter: "blur(14px)",
                backdropFilter: "blur(14px)",
              }
            : undefined
        }
      >
        <div
          className={`flex items-center gap-2.5 px-3 py-2.5 text-white ${
            isHome
              ? "bg-[#075E54]/80 max-md:bg-[#075E54]/55 max-md:backdrop-blur-sm"
              : "bg-[#075E54]"
          }`}
        >
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 ring-2 ring-white/20">
            <Image
              src="/ens-logo.png"
              alt=""
              width={36}
              height={36}
              className="h-7 w-auto object-contain brightness-0 invert"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold leading-tight">
              {t("sender")}
            </span>
            <span className="mt-0.5 flex items-center gap-1 text-[10px] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
              {t("online")}
            </span>
          </span>
          <WhatsappIcon className="h-5 w-5 shrink-0 text-white/90" />
        </div>

        <div
          className={`px-3 py-3 ${isHome ? "max-md:bg-transparent" : ""}`}
          style={isHome ? undefined : { background: "#ECE5DD" }}
        >
          <div
            className={`relative max-w-[92%] rounded-xl rounded-es-sm px-3 py-2 shadow-sm ${
              isHome
                ? "max-md:border max-md:border-white/30 max-md:bg-white/20 max-md:backdrop-blur-sm bg-white"
                : "bg-white"
            }`}
          >
            <p dir="auto" className="text-[13px] leading-5 text-ink-900">
              {t("message")}
            </p>
            <p className="mt-1 text-end text-[10px] text-gray-400">
              {t("time")}
            </p>
          </div>
        </div>

        <div
          className={`flex items-center justify-center gap-2 border-t px-3 py-2.5 text-xs font-bold text-[#25D366] transition-colors group-hover:bg-[#f0fdf4] ${
            isHome
              ? "max-md:border-white/20 max-md:bg-white/10 max-md:group-hover:bg-white/15 border-gray-100 bg-white"
              : "border-gray-100 bg-white"
          }`}
        >
          <WhatsappIcon className="h-4 w-4" />
          {t("reply")}
        </div>
      </a>
    </div>
  );
}
