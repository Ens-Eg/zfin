"use client";

import { useEffect, useState } from "react";

export default function HomeVideo({
  desktopSrc,
  mobileSrc,
}: {
  desktopSrc: string;
  mobileSrc: string;
}) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMobile === null) {
    return <div className="h-full w-full bg-ink-900" aria-hidden />;
  }

  return (
    <video
      key={isMobile ? "mobile" : "desktop"}
      src={isMobile ? mobileSrc : desktopSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/ens-logo.png"
      className="h-full w-full object-cover"
      aria-hidden
    />
  );
}
