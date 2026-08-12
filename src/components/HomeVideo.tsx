"use client";

import { useEffect, useRef } from "react";

export default function HomeVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("muted", "");

    const tryPlay = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("loadedmetadata", tryPlay);

    const unlock = () => tryPlay();
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("click", unlock);

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const retry = window.setInterval(() => {
      if (video.paused) tryPlay();
      else window.clearInterval(retry);
    }, 300);
    const stopRetry = window.setTimeout(() => window.clearInterval(retry), 12000);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("loadedmetadata", tryPlay);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(retry);
      window.clearTimeout(stopRetry);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover"
      {...{ "webkit-playsinline": "true", "x5-playsinline": "true" }}
    />
  );
}
