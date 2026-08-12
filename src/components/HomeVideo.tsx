"use client";

import { useEffect, useRef } from "react";

export default function HomeVideo({
  desktopSrc,
  mobileSrc,
}: {
  desktopSrc: string;
  mobileSrc: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("muted", "");

    const tryPlay = () => {
      if (!video.paused) return;
      void video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("loadedmetadata", tryPlay);

    const unlock = () => tryPlay();
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("touchend", unlock, { passive: true });
    window.addEventListener("click", unlock);

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const retry = window.setInterval(() => {
      if (video.paused) tryPlay();
      else window.clearInterval(retry);
    }, 400);
    const stopRetry = window.setTimeout(() => window.clearInterval(retry), 10000);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("loadedmetadata", tryPlay);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("touchend", unlock);
      window.removeEventListener("click", unlock);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(retry);
      window.clearTimeout(stopRetry);
    };
  }, [desktopSrc, mobileSrc]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/ens-logo.png"
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden
      className="h-full w-full object-cover"
      // iOS Safari inline playback (Low Power Mode / Safari)
      {...{ "webkit-playsinline": "true", "x5-playsinline": "true" }}
    >
      <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" />
      <source src={desktopSrc} type="video/mp4" />
    </video>
  );
}
