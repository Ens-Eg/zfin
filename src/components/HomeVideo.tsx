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
          __html: `<video id="${HERO_VIDEO_ID}" class="ens-hero-video" src="${mobileSrc}" data-desktop-src="${desktopSrc}" data-mobile-src="${mobileSrc}" data-fill-src="${fillSrc}" data-mobile-fill-src="${mobileFillSrc}" data-phase="intro" autoplay muted playsinline webkit-playsinline x5-playsinline preload="auto" style="position:fixed;inset:0;z-index:0;width:100%;height:100%;min-height:100dvh;object-fit:cover;background:#000;pointer-events:none"></video><video src="${fillSrc}" muted playsinline preload="auto" style="display:none"></video><video src="${mobileFillSrc}" muted playsinline preload="auto" style="display:none"></video>`,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
  var v=document.getElementById("${HERO_VIDEO_ID}");
  if(!v)return;
  var ua=navigator.userAgent||"";
  var ios=/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  var mobile=ios||window.innerWidth<768||/Android|Mobile/i.test(ua);
  var intro=mobile?(v.getAttribute("data-mobile-src")||""):(v.getAttribute("data-desktop-src")||"");
  var fill=mobile?(v.getAttribute("data-mobile-fill-src")||"${MOBILE_FILL_VIDEO_SRC}"):(v.getAttribute("data-fill-src")||"${FILL_VIDEO_SRC}");
  if(intro&&v.getAttribute("src")!==intro) v.setAttribute("src", intro);
  v.dataset.phase="intro";
  v.loop=false;
  v.muted=true;
  v.defaultMuted=true;
  v.playsInline=true;
  v.setAttribute("playsinline","true");
  v.setAttribute("webkit-playsinline","true");
  v.setAttribute("muted","");
  function go(){
    if(v.dataset.phase!=="fill"&&(v.ended||(v.duration>0&&v.currentTime>=v.duration-0.08))){
      startFill();
      return;
    }
    v.muted=true;
    var p=v.play();
    if(p&&p.then)p.then(function(){window.dispatchEvent(new Event("ens:hero-playing"));}).catch(function(){});
  }
  function startFill(){
    if(v.dataset.phase==="fill"){
      v.loop=true;
      go();
      return;
    }
    v.dataset.phase="fill";
    v.loop=true;
    v.src=fill;
    go();
    window.dispatchEvent(new Event("ens:hero-fill"));
  }
  go();
  v.addEventListener("canplay",go);
  v.addEventListener("loadeddata",go);
  v.addEventListener("playing",function(){window.dispatchEvent(new Event("ens:hero-playing"));});
  v.addEventListener("ended",startFill);
  v.addEventListener("timeupdate",function(){
    if(v.dataset.phase!=="intro") return;
    if(v.duration>0&&v.currentTime>=v.duration-0.12) startFill();
  });
  document.addEventListener("touchstart",go,{passive:true});
  document.addEventListener("pointerdown",go);
})();`,
        }}
      />
      <HomeVideoUnlock />
    </>
  );
}
