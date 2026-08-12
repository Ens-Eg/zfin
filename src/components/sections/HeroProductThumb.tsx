import { cn } from "@/lib/cn";

const FOOD_TONES = [
  "from-amber-400/80 to-orange-500/70",
  "from-rose-400/80 to-red-500/70",
  "from-emerald-400/80 to-teal-500/70",
  "from-sky-400/80 to-indigo-500/70",
  "from-violet-400/80 to-purple-500/70",
  "from-lime-400/80 to-green-500/70",
] as const;

function toneFor(src: string) {
  let hash = 0;
  for (let i = 0; i < src.length; i += 1) {
    hash = (hash + src.charCodeAt(i) * (i + 1)) % FOOD_TONES.length;
  }
  return FOOD_TONES[hash] ?? FOOD_TONES[0];
}

type HeroProductThumbProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function HeroProductThumb({
  src,
  alt,
  className,
}: HeroProductThumbProps) {
  const isRemote = src.startsWith("http") || src.startsWith("/");

  if (isRemote && !src.startsWith("emoji:")) {
    return (
      <div
        className={cn(
          "relative h-11 w-11 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700",
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  const emoji = src.startsWith("emoji:") ? src.slice(6) : alt.slice(0, 1);

  return (
    <div
      className={cn(
        "relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br text-base shadow-inner",
        toneFor(src + alt),
        className,
      )}
      aria-hidden={alt ? undefined : true}
      title={alt}
    >
      <span className="drop-shadow-sm">{emoji}</span>
    </div>
  );
}
