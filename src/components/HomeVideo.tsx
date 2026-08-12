import HomeVideoUnlock from "@/components/HomeVideoUnlock";
import { HERO_VIDEO_ID } from "@/lib/playHeroVideo";

export default function HomeVideo({ src }: { src: string }) {
  return (
    <>
      <video
        id={HERO_VIDEO_ID}
        className="ens-hero-video absolute inset-0 h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        {...{
          "webkit-playsinline": "true",
          "x5-playsinline": "true",
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var v=document.getElementById("${HERO_VIDEO_ID}");if(!v)return;v.muted=true;v.defaultMuted=true;v.playsInline=true;v.setAttribute("playsinline","true");v.setAttribute("webkit-playsinline","true");var p=v.play();if(p&&p.catch)p.catch(function(){});})();`,
        }}
      />
      <HomeVideoUnlock />
    </>
  );
}
