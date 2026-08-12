"use client";

import { useEffect, useState } from "react";
import { HERO_VIDEO_ID, playHeroVideo } from "@/lib/playHeroVideo";

export default function HomeVideoUnlock() {
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    playHeroVideo();

    const video = document.getElementById(HERO_VIDEO_ID);
    if (!(video instanceof HTMLVideoElement)) return;

    const tryPlay = () => playHeroVideo();

    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("loadedmetadata", tryPlay);
    window.addEventListener("touchstart", tryPlay, { passive: true });
    window.addEventListener("pointerdown", tryPlay);
    window.addEventListener("click", tryPlay);
    window.addEventListener("ens:unlock-media", tryPlay);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") tryPlay();
    });

    const retry = window.setInterval(() => {
      if (!video.paused) {
        window.clearInterval(retry);
        setNeedsTap(false);
        return;
      }
      tryPlay();
    }, 250);

    const showTap = window.setTimeout(() => {
      if (video.paused) setNeedsTap(true);
    }, 2800);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("loadedmetadata", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("ens:unlock-media", tryPlay);
      window.clearInterval(retry);
      window.clearTimeout(showTap);
    };
  }, []);

  if (!needsTap) return null;

  return (
    <button
      type="button"
      aria-label="Play"
      className="absolute inset-0 z-10 cursor-pointer border-0 bg-transparent"
      onPointerDown={(e) => {
        e.preventDefault();
        playHeroVideo();
        setNeedsTap(false);
      }}
    />
  );
}
