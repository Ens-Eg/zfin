"use client";

import { useEffect, useState } from "react";
import {
  HERO_VIDEO_ID,
  playHeroVideo,
  startFillVideo,
} from "@/lib/playHeroVideo";

export default function HomeVideoUnlock() {
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    playHeroVideo();

    const onPlaying = () => setNeedsTap(false);
    const onEnded = () => startFillVideo();

    window.addEventListener("ens:hero-playing", onPlaying);
    window.addEventListener("ens:unlock-media", playHeroVideo);
    window.addEventListener("touchstart", playHeroVideo, { passive: true });
    window.addEventListener("pointerdown", playHeroVideo);

    const video = document.getElementById(HERO_VIDEO_ID);
    if (video instanceof HTMLVideoElement) {
      video.addEventListener("ended", onEnded);
    }

    const timer = window.setTimeout(() => {
      const el = document.getElementById(HERO_VIDEO_ID);
      if (
        el instanceof HTMLVideoElement &&
        el.paused &&
        el.dataset.phase !== "fill" &&
        el.currentTime < 0.2
      ) {
        setNeedsTap(true);
      }
    }, 1200);

    return () => {
      window.removeEventListener("ens:hero-playing", onPlaying);
      window.removeEventListener("ens:unlock-media", playHeroVideo);
      window.removeEventListener("touchstart", playHeroVideo);
      window.removeEventListener("pointerdown", playHeroVideo);
      if (video instanceof HTMLVideoElement) {
        video.removeEventListener("ended", onEnded);
      }
      window.clearTimeout(timer);
    };
  }, []);

  if (!needsTap) return null;

  return (
    <button
      type="button"
      aria-label="Play"
      className="fixed inset-0 z-1 cursor-pointer border-0 bg-transparent"
      onPointerDown={(e) => {
        e.preventDefault();
        playHeroVideo();
        setNeedsTap(false);
      }}
    />
  );
}
