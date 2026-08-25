import HomeVideoInit from "@/components/HomeVideoInit";
import HomeVideoUnlock from "@/components/HomeVideoUnlock";
import {
  FILL_VIDEO_SRC,
  HERO_VIDEO_ID,
  MOBILE_FILL_VIDEO_SRC,
} from "@/lib/playHeroVideo";

export default function HomeVideo({
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
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `<div class="ens-hero-stage"><video id="${HERO_VIDEO_ID}" class="ens-hero-video" src="${mobileSrc}" data-desktop-src="${desktopSrc}" data-mobile-src="${mobileSrc}" data-fill-src="${fillSrc}" data-mobile-fill-src="${mobileFillSrc}" data-phase="intro" autoplay muted defaultmuted playsinline webkit-playsinline x5-playsinline preload="auto" disablepictureinpicture disableremoteplayback></video></div>`,
        }}
      />
      <HomeVideoInit
        desktopSrc={desktopSrc}
        mobileSrc={mobileSrc}
        fillSrc={fillSrc}
        mobileFillSrc={mobileFillSrc}
      />
      <HomeVideoUnlock />
    </>
  );
}
