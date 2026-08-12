"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import HeroProductThumb from "@/components/sections/HeroProductThumb";
import { formatMockPrice } from "@/components/sections/formatMockPrice";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { isRtlLocale } from "@/lib/localeDirection";

export type HeroMockProduct = {
  id: string;
  name: string;
  priceAmount: number;
  image: string;
};

export type HeroChatTurn = {
  id: string;
  userMessage: string;
  linaMessage: string;
  products: HeroMockProduct[];
};

type HeroPhoneMockupProps = {
  businessName: string;
  turns: HeroChatTurn[];
  /** Shorter card for mobile — same demo, smaller footprint */
  compact?: boolean;
};

type QtyState = Record<string, number>;

type TurnPhase =
  | "user"
  | "typing"
  | "lina"
  | "products"
  | "qty"
  | "add"
  | "added"
  | "done";

const PHASE_ORDER: TurnPhase[] = [
  "user",
  "typing",
  "lina",
  "products",
  "qty",
  "add",
  "added",
  "done",
];

const PHASE_DURATIONS: Record<TurnPhase, number> = {
  user: 550,
  typing: 950,
  lina: 450,
  products: 500,
  qty: 420,
  add: 520,
  added: 1100,
  done: 650,
};

const LOOP_PAUSE_MS = 2400;
const BETWEEN_TURNS_MS = 700;

function phaseAtLeast(current: TurnPhase, min: TurnPhase): boolean {
  return PHASE_ORDER.indexOf(current) >= PHASE_ORDER.indexOf(min);
}

function buildInitialQty(turns: HeroChatTurn[]): QtyState {
  const qty: QtyState = {};
  turns.forEach((turn) => {
    turn.products.forEach((p) => {
      qty[p.id] = 1;
    });
  });
  return qty;
}

function TypingDots() {
  return (
    <span className="hero-chat-typing inline-flex items-center gap-1 px-0.5">
      <span className="h-1 w-1 rounded-full bg-slate-400" />
      <span className="h-1 w-1 rounded-full bg-slate-400" />
      <span className="h-1 w-1 rounded-full bg-slate-400" />
    </span>
  );
}

function MinusGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200/70 bg-white/90 p-0.5 shadow-sm shadow-slate-900/3">
      <button
        type="button"
        aria-label="Decrease"
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:opacity-25"
      >
        <MinusGlyph />
      </button>
      <span className="min-w-[1.35rem] px-0.5 text-center text-[11px] font-semibold tabular-nums text-slate-800">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(Math.min(9, value + 1))}
        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
      >
        <PlusGlyph />
      </button>
    </div>
  );
}

function ProductRow({
  product,
  qty,
  showQty,
  formatPrice,
}: {
  product: HeroMockProduct;
  qty: number;
  showQty: boolean;
  formatPrice: (n: number) => string;
}) {
  const lineTotal = product.priceAmount * qty;

  return (
    <div className="grid grid-cols-[2.75rem_1fr] gap-x-3 gap-y-2">
      <div className="relative row-span-2 self-start">
        <HeroProductThumb src={product.image} alt={product.name} />
        {showQty && qty > 0 && (
          <span className="absolute -top-1 -inset-e-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-700/90 px-1 text-[9px] font-semibold text-white">
            ×{qty}
          </span>
        )}
      </div>

      <p className="col-start-2 self-end text-[13px] font-medium leading-snug text-slate-800">
        {product.name}
      </p>

      {showQty && (
        <div className="hero-chat-animate-in col-start-2 flex items-center justify-between gap-2">
          <QuantityStepper value={qty} onChange={() => {}} />
          <p className="shrink-0 text-[12px] font-semibold tabular-nums text-slate-900">
            {formatPrice(qty > 1 ? lineTotal : product.priceAmount)}
          </p>
        </div>
      )}
    </div>
  );
}

function RecommendationBlock({
  products,
  quantities,
  phase,
  formatPrice,
  subtotalLabel,
  addLabel,
  addedLabel,
}: {
  products: HeroMockProduct[];
  quantities: QtyState;
  phase: TurnPhase;
  formatPrice: (n: number) => string;
  subtotalLabel: (amount: string) => string;
  addLabel: string;
  addedLabel: string;
}) {
  const showQty = phaseAtLeast(phase, "qty");
  const showAdd = phaseAtLeast(phase, "add");
  const isAdded = phaseAtLeast(phase, "added");

  const subtotal = products.reduce(
    (sum, p) => sum + p.priceAmount * (quantities[p.id] ?? 1),
    0,
  );

  return (
    <div className="mt-2.5 space-y-2.5 border-t border-slate-200/30 pt-2.5">
      <div className="space-y-3.5">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="hero-chat-animate-in"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <ProductRow
              product={product}
              qty={quantities[product.id] ?? 1}
              showQty={showQty}
              formatPrice={formatPrice}
            />
          </div>
        ))}
      </div>

      {showAdd && (
        <p className="hero-chat-animate-in text-[11px] font-medium text-slate-500">
          {subtotalLabel(formatPrice(subtotal))}
        </p>
      )}

      {showAdd && (
        <button
          type="button"
          disabled={isAdded}
          className={cn(
            "hero-chat-animate-in flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[11px] font-medium transition-all",
            isAdded
              ? "text-emerald-600"
              : "border border-brand-200/70 bg-brand-50/40 text-brand-700",
          )}
        >
          {isAdded ? (
            <>
              <CheckIcon className="h-3 w-3" />
              {addedLabel}
            </>
          ) : (
            addLabel
          )}
        </button>
      )}
    </div>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="hero-chat-animate-in flex justify-end">
      <p className="max-w-[88%] rounded-2xl rounded-ee-md bg-slate-800/95 px-3 py-2 text-[12px] leading-snug text-white">
        {children}
      </p>
    </div>
  );
}

function LinaAvatar({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass =
    size === "lg" ? "h-11 w-11" : size === "md" ? "h-8 w-8" : "h-7 w-7";

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full ring-2 ring-brand-500/20 ring-offset-1 ring-offset-[#fafaf9]",
        sizeClass,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/AiAvatar.png" alt="" className="h-full w-full object-cover" />
    </div>
  );
}

function LinaBubble({
  assistantName,
  children,
  recommendation,
  isTyping,
  animateIn,
}: {
  assistantName: string;
  children?: React.ReactNode;
  recommendation?: React.ReactNode;
  isTyping?: boolean;
  animateIn?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        animateIn && !isTyping && "hero-chat-animate-in",
      )}
    >
      <LinaAvatar size="md" />
      <div className="min-w-0 max-w-[94%] flex-1 text-start">
        <p className="mb-1 text-[11px] font-semibold text-brand-600/90">
          {assistantName}
        </p>
        {isTyping ? (
          <div className="hero-chat-animate-in inline-flex rounded-2xl rounded-es-md bg-slate-100/90 px-3.5 py-2.5">
            <TypingDots />
          </div>
        ) : (
          <>
            {children && (
              <p className="text-[12px] leading-relaxed text-slate-700">
                {children}
              </p>
            )}
            {recommendation && (
              <div className="mt-2 border-s border-brand-200/50 ps-2.5">
                {recommendation}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function HeroPhoneMockup({
  businessName,
  turns,
  compact = false,
}: HeroPhoneMockupProps) {
  const t = useTranslations("featured.mockChat");
  const locale = useLocale();
  const isRtl = isRtlLocale(locale);

  const formatPrice = useCallback(
    (amount: number) => formatMockPrice(amount, isRtl),
    [isRtl],
  );

  const subtotalLabel = useCallback(
    (amount: string) => t("subtotalLine", { amount }),
    [t],
  );

  const [quantities] = useState<QtyState>(() => buildInitialQty(turns));
  const [addedTurns, setAddedTurns] = useState<Set<string>>(new Set());
  const [turnIndex, setTurnIndex] = useState(0);
  const [phase, setPhase] = useState<TurnPhase>("user");
  const [loopId, setLoopId] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (phase !== "added") return;
    const turnId = turns[turnIndex]?.id;
    if (!turnId) return;
    setAddedTurns((prev) => new Set(prev).add(turnId));
  }, [phase, turnIndex, turns]);

  useEffect(() => {
    const duration = reduceMotion ? 120 : PHASE_DURATIONS[phase];

    const timer = window.setTimeout(() => {
      if (phase === "done") {
        if (turnIndex < turns.length - 1) {
          window.setTimeout(
            () => {
              setTurnIndex((i) => i + 1);
              setPhase("user");
            },
            reduceMotion ? 0 : BETWEEN_TURNS_MS,
          );
          return;
        }

        window.setTimeout(
          () => {
            setAddedTurns(new Set());
            setTurnIndex(0);
            setPhase("user");
            setLoopId((id) => id + 1);
          },
          reduceMotion ? 200 : LOOP_PAUSE_MS,
        );
        return;
      }

      const nextIndex = PHASE_ORDER.indexOf(phase) + 1;
      const nextPhase = PHASE_ORDER[nextIndex];
      if (nextPhase) setPhase(nextPhase);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [phase, turnIndex, turns.length, reduceMotion, loopId]);

  const cartItemCount = useMemo(() => {
    let count = 0;
    turns.forEach((turn) => {
      if (!addedTurns.has(turn.id)) return;
      turn.products.forEach((p) => {
        count += quantities[p.id] ?? 1;
      });
    });
    return count;
  }, [turns, addedTurns, quantities]);

  return (
    <div
      className={cn(
        "hero-lina-chat-mockup relative mx-auto w-full shrink-0 overflow-visible",
        compact && "hero-lina-chat-mockup--compact",
        compact
          ? "h-[min(360px,72vw)] max-w-70 sm:h-100 sm:max-w-75 lg:max-w-100"
          : "h-110 max-w-[320px] sm:h-120 sm:max-w-87.5",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-linear-to-b from-brand-400/20 via-brand-400/5 to-transparent blur-xl sm:-inset-4 lg:-inset-5"
      />

      <div className="hero-lina-chat-card flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-white/15 bg-[#fafaf9] shadow-[0_1px_2px_rgba(15,23,42,0.03),0_16px_40px_-14px_rgba(15,23,42,0.35)]">
        <header
          className={cn(
            "shrink-0 border-b border-brand-100/50 bg-linear-to-b from-brand-50/40 to-white/80 px-3 py-2 sm:px-3.5 sm:py-2.5",
            compact ? "h-15 sm:h-17 lg:h-19" : "h-18",
          )}
        >
          <div className="flex h-full items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3 text-start">
              <div className="relative">
                <LinaAvatar size="lg" />
                <span className="absolute bottom-0 inset-e-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold tracking-tight text-slate-900">
                  {t("assistantName")}
                </p>
                <p className="text-[10px] font-medium text-brand-600/80">
                  {t("status")}
                </p>
              </div>
            </div>
            <div className="flex h-10 shrink-0 flex-col justify-center text-end">
              <p className="truncate text-[9px] font-medium uppercase tracking-wider text-slate-400">
                {businessName}
              </p>
              <p
                className={cn(
                  "mt-0.5 min-h-3.5 text-[10px] leading-snug text-slate-500 transition-opacity duration-300",
                  cartItemCount > 0
                    ? "hero-chat-animate-in opacity-100"
                    : "opacity-0 lg:invisible",
                )}
                aria-hidden={cartItemCount === 0}
              >
                {t("itemsInCart", { count: cartItemCount || 0 })}
              </p>
            </div>
          </div>
        </header>

        <div className="hero-chat-scroll min-h-0 flex-1 space-y-3.5 overflow-hidden overscroll-none px-3 py-3 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
          {turns.map((turn, index) => {
            if (index !== turnIndex) return null;

            const effectivePhase = phase;

            const showUser = phaseAtLeast(effectivePhase, "user");
            const showTyping =
              index === turnIndex && effectivePhase === "typing";
            const showLina =
              phaseAtLeast(effectivePhase, "lina") && !showTyping;
            const showProducts = phaseAtLeast(effectivePhase, "products");

            if (!showUser && !showTyping && !showLina) return null;

            return (
              <div key={`${turn.id}-${loopId}`} className="space-y-2.5">
                {showUser && <UserBubble>{turn.userMessage}</UserBubble>}

                {(showTyping || showLina) && (
                  <LinaBubble
                    assistantName={t("assistantName")}
                    isTyping={showTyping}
                    animateIn={showLina}
                    recommendation={
                      showLina && showProducts && turn.products.length > 0 ? (
                        <RecommendationBlock
                          products={turn.products}
                          quantities={quantities}
                          phase={effectivePhase}
                          formatPrice={formatPrice}
                          subtotalLabel={subtotalLabel}
                          addLabel={t("addToCart")}
                          addedLabel={t("addedToCart")}
                        />
                      ) : undefined
                    }
                  >
                    {showLina ? turn.linaMessage : undefined}
                  </LinaBubble>
                )}
              </div>
            );
          })}
        </div>

        <footer
          className={cn(
            "shrink-0 border-t border-slate-200/40 px-3 py-2",
            compact ? "h-11 sm:h-12 lg:h-13" : "h-13",
          )}
        >
          <div
            aria-hidden
            className="flex h-full items-center gap-2 rounded-lg bg-slate-100/60 px-2.5 py-1.5"
          >
            <span className="flex-1 text-start text-[11px] text-slate-400">
              {t("inputPlaceholder")}
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded text-[10px] text-brand-500/50">
              ↑
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
