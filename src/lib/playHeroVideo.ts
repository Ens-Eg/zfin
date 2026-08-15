export const HERO_VIDEO_ID = "ens-hero-video";

export function playHeroVideo() {
  const video = document.getElementById(HERO_VIDEO_ID);
  if (!(video instanceof HTMLVideoElement)) return;
  if (video.dataset.ended === "1") return;

  video.loop = false;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "true");
  video.setAttribute("webkit-playsinline", "true");
  video.setAttribute("muted", "");

  void video
    .play()
    .then(() => {
      window.dispatchEvent(new Event("ens:hero-playing"));
    })
    .catch(() => {});
}

export function markHeroVideoEnded() {
  const video = document.getElementById(HERO_VIDEO_ID);
  if (!(video instanceof HTMLVideoElement)) return;
  video.dataset.ended = "1";
  try {
    if (video.duration && Number.isFinite(video.duration)) {
      video.currentTime = Math.max(0, video.duration - 0.05);
    }
  } catch {
    /* ignore */
  }
  video.pause();
}
