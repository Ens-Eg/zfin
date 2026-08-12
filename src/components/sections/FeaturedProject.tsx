"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { featuredFeatureKeys, type FeaturedFeatureKey } from "@/data/site";
import {
  BrainIcon,
  QrIcon,
  UtensilsIcon,
  TruckIcon,
  CreditCardIcon,
  LayoutIcon,
  ChartIcon,
  TagIcon,
  GlobeIcon,
  ArrowIcon,
  SparklesIcon,
} from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import HeroPhoneMockup, {
  type HeroChatTurn,
} from "@/components/sections/HeroPhoneMockup";

const featureIcons: Record<
  FeaturedFeatureKey,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  ai: BrainIcon,
  qr: QrIcon,
  table: UtensilsIcon,
  delivery: TruckIcon,
  payment: CreditCardIcon,
  dashboard: LayoutIcon,
  reports: ChartIcon,
  offers: TagIcon,
  multi: GlobeIcon,
};

export default function FeaturedProject({ full = false }: { full?: boolean }) {
  const t = useTranslations("featured");
  const keys = full ? featuredFeatureKeys : featuredFeatureKeys.slice(0, 6);

  const turns: HeroChatTurn[] = [
    {
      id: "recommend",
      userMessage: t("mockChat.turns.recommend.user"),
      linaMessage: t("mockChat.turns.recommend.lina"),
      products: [
        {
          id: "chicken",
          name: t("mockChat.turns.recommend.products.chicken"),
          priceAmount: 185,
          image:
            "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200&h=200&fit=crop&q=80",
        },
        {
          id: "salad",
          name: t("mockChat.turns.recommend.products.salad"),
          priceAmount: 95,
          image:
            "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop&q=80",
        },
      ],
    },
    {
      id: "spicy",
      userMessage: t("mockChat.turns.spicy.user"),
      linaMessage: t("mockChat.turns.spicy.lina"),
      products: [
        {
          id: "shawarma",
          name: t("mockChat.turns.spicy.products.shawarma"),
          priceAmount: 120,
          image:
            "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200&h=200&fit=crop&q=80",
        },
        {
          id: "wings",
          name: t("mockChat.turns.spicy.products.wings"),
          priceAmount: 140,
          image:
            "https://images.unsplash.com/photo-1527477396000-e27173b8ba01?w=200&h=200&fit=crop&q=80",
        },
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 text-white">
      {/* glows */}
      <div className="pointer-events-none absolute -top-40 inset-s-1/3 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 inset-e-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-500/15 px-4 py-1.5 text-sm font-bold text-brand-300">
                <SparklesIcon className="h-4 w-4" />
                {t("badge")}
              </span>
              <h2 className="mt-5 text-2xl font-black tracking-tight sm:text-4xl">
                {t("title")}{" "}
              </h2>
              <p className="mt-5 text-base leading-7 text-gray-300">
                {t("subtitle")}
              </p>
              {!full && (
                <Link
                  href="/showcases"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-500 to-indigo-500 px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-brand-500/30 transition-transform hover:scale-105"
                >
                  {t("cta")}
                  <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              )}
            </Reveal>
          </div>

          <Reveal delay={1} className="flex justify-center lg:justify-end">
            <HeroPhoneMockup businessName={t("name")} turns={turns} />
          </Reveal>
        </div>

        <Stagger className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {keys.map((key) => {
            const Icon = featureIcons[key];
            return (
              <StaggerItem key={key}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:border-brand-400/40 hover:bg-white/10">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="mt-4 font-extrabold">
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {t(`features.${key}.description`)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
