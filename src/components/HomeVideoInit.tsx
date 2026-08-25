"use client";

import { useEffect } from "react";
import {
  FILL_VIDEO_SRC,
  HERO_VIDEO_ID,
  MOBILE_FILL_VIDEO_SRC,
  isHeroMobile,
  playHeroVideo,
  startFillVideo,
} from "@/lib/playHeroVideo";

export default function HomeVideoInit({
  desktopSrc,
  mobileSrc,
  fillSrc = FILL_VIDEO_SRC,
  mobileFillSrc = MOBILE_FILL_VIDEO_SRC,
}: {
  desktopSrc: string;
  mobileSrc: string;
  fillSrc?: string;
  mobileFillSrc?: string;
}) {
  useEffect(() => {
    const video = document.getElementById(HERO_VIDEO_ID);
    if (!(video instanceof HTMLVideoElement)) return;

    const mobile = isHeroMobile();
    const intro = mobile ? mobileSrc : desktopSrc;
    const fill = mobile ? mobileFillSrc : fillSrc;

    if (intro && video.getAttribute("src") !== intro) {
      video.setAttribute("src", intro);
    }

    video.dataset.phase = "intro";
    delete video.dataset.mfill;
    video.loop = false;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("muted", "");

    if (mobile) {
      document.documentElement.classList.add("ens-hero-mobile");
    } else {
      document.documentElement.classList.remove("ens-hero-mobile");
    }

    const onPlaying = () => {
      window.dispatchEvent(new Event("ens:hero-playing"));
    };

    const go = () => {
      if (
        video.dataset.phase !== "fill" &&
        (video.ended ||
          (video.duration > 0 && video.currentTime >= video.duration - 0.08))
      ) {
        startFill();
        return;
      }
      playHeroVideo();
    };

    const startFill = () => {
      if (video.dataset.phase === "fill") {
        video.loop = true;
        playHeroVideo();
        return;
      }
      video.dataset.phase = "fill";
      video.loop = true;
      video.src = fill;
      if (mobile) video.dataset.mfill = "1";
      playHeroVideo();
      window.dispatchEvent(new Event("ens:hero-fill"));
    };

    const onTimeUpdate = () => {
      if (video.dataset.phase !== "intro") return;
      if (video.duration > 0 && video.currentTime >= video.duration - 0.12) {
        startFill();
      }
    };

    go();
    video.addEventListener("canplay", go);
    video.addEventListener("loadeddata", go);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("ended", startFill);
    video.addEventListener("timeupdate", onTimeUpdate);
    document.addEventListener("touchstart", go, { passive: true });
    document.addEventListener("pointerdown", go);

    return () => {
      video.removeEventListener("canplay", go);
      video.removeEventListener("loadeddata", go);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", startFill);
      video.removeEventListener("timeupdate", onTimeUpdate);
      document.removeEventListener("touchstart", go);
      document.removeEventListener("pointerdown", go);
      document.documentElement.classList.remove("ens-hero-mobile");
    };
  }, [desktopSrc, mobileSrc, fillSrc, mobileFillSrc]);

  return null;
}
