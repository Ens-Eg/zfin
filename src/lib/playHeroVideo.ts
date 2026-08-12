export const HERO_VIDEO_ID = "ens-hero-video";

export function playHeroVideo() {
  const video = document.getElementById(HERO_VIDEO_ID);
  if (!(video instanceof HTMLVideoElement)) return;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "true");
  video.setAttribute("webkit-playsinline", "true");
  video.setAttribute("muted", "");

  void video.play().catch(() => {});
}
