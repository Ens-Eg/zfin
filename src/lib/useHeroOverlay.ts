"use client";

import { useEffect, useState } from "react";
import { HERO_VIDEO_ID } from "@/lib/playHeroVideo";

export function useHeroOverlay(delayMs = 18_000) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let showTimer: number | undefined;
    let started = false;

    const showNow = () => {
      started = true;
      if (showTimer) window.clearTimeout(showTimer);
      setVisible(true);
    };

    const schedule = () => {
      if (started) return;
      started = true;
      showTimer = window.setTimeout(() => setVisible(true), delayMs);
    };

    const video = document.getElementById(HERO_VIDEO_ID);
    if (video instanceof HTMLVideoElement && video.dataset.phase === "fill") {
      showNow();
    } else if (
      video instanceof HTMLVideoElement &&
      !video.paused &&
      video.currentTime > 0
    ) {
      schedule();
    }

    window.addEventListener("ens:hero-playing", schedule);
    window.addEventListener("ens:hero-skipped", showNow);
    if (video instanceof HTMLVideoElement) {
      video.addEventListener("playing", schedule);
    }

    return () => {
      window.removeEventListener("ens:hero-playing", schedule);
      window.removeEventListener("ens:hero-skipped", showNow);
      if (video instanceof HTMLVideoElement) {
        video.removeEventListener("playing", schedule);
      }
      if (showTimer) window.clearTimeout(showTimer);
    };
  }, [delayMs]);

  return visible;
}
