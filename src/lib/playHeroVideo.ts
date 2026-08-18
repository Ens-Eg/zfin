export const HERO_VIDEO_ID = "ens-hero-video";
export const FILL_VIDEO_SRC = "/fill.mp4";
export const MOBILE_FILL_VIDEO_SRC = "/mfill.mp4";

function heroVideo() {
  const video = document.getElementById(HERO_VIDEO_ID);
  return video instanceof HTMLVideoElement ? video : null;
}

export function isHeroMobile() {
  const ua = navigator.userAgent || "";
  const ios =
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return ios || window.innerWidth < 768 || /Android|Mobile/i.test(ua);
}

export function fillVideoSrc(video = heroVideo()) {
  if (!video) {
    return isHeroMobile() ? MOBILE_FILL_VIDEO_SRC : FILL_VIDEO_SRC;
  }
  const mobile =
    video.getAttribute("data-mobile-fill-src") || MOBILE_FILL_VIDEO_SRC;
  const desktop = video.getAttribute("data-fill-src") || FILL_VIDEO_SRC;
  return isHeroMobile() ? mobile : desktop;
}

function prime(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "true");
  video.setAttribute("webkit-playsinline", "true");
  video.setAttribute("muted", "");
}

function tryPlay(video: HTMLVideoElement) {
  prime(video);
  void video
    .play()
    .then(() => {
      window.dispatchEvent(new Event("ens:hero-playing"));
    })
    .catch(() => {});
}

export function playHeroVideo() {
  const video = heroVideo();
  if (!video) return;

  if (video.dataset.phase === "fill") {
    video.loop = true;
    tryPlay(video);
    return;
  }

  const introDone =
    video.ended ||
    (video.duration > 0 && video.currentTime >= video.duration - 0.08);

  if (introDone) {
    startFillVideo();
    return;
  }

  tryPlay(video);
}

export function startFillVideo(src?: string) {
  const video = heroVideo();
  if (!video) return;

  if (video.dataset.phase === "fill") {
    video.loop = true;
    tryPlay(video);
    return;
  }

  video.dataset.phase = "fill";
  video.loop = true;
  prime(video);
  video.src = src || fillVideoSrc(video);
  if (isHeroMobile()) {
    document.documentElement.classList.add("ens-hero-mobile");
    video.dataset.mfill = "1";
  }
  tryPlay(video);
  window.dispatchEvent(new Event("ens:hero-fill"));
}

export function skipIntro() {
  startFillVideo();
  window.dispatchEvent(new Event("ens:hero-skipped"));
}
