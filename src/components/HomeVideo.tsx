import HomeVideoUnlock from "@/components/HomeVideoUnlock";
import { HERO_VIDEO_ID } from "@/lib/playHeroVideo";

export default function HomeVideo({
  desktopSrc,
  mobileSrc,
}: {
  desktopSrc: string;
  mobileSrc: string;
}) {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `<video id="${HERO_VIDEO_ID}" class="ens-hero-video" src="${mobileSrc}" data-desktop-src="${desktopSrc}" data-mobile-src="${mobileSrc}" autoplay muted playsinline webkit-playsinline x5-playsinline preload="auto" style="position:fixed;inset:0;z-index:0;width:100%;height:100%;min-height:100dvh;object-fit:cover;background:#000;pointer-events:none"></video>`,
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
  var next=mobile?(v.getAttribute("data-mobile-src")||""):(v.getAttribute("data-desktop-src")||"");
  if(next&&v.getAttribute("src")!==next) v.setAttribute("src", next);
  v.loop=false;
  v.muted=true;
  v.defaultMuted=true;
  v.playsInline=true;
  v.setAttribute("playsinline","true");
  v.setAttribute("webkit-playsinline","true");
  v.setAttribute("muted","");
  var done=false;
  function go(){
    if(done)return;
    v.muted=true;
    var p=v.play();
    if(p&&p.then)p.then(function(){window.dispatchEvent(new Event("ens:hero-playing"));}).catch(function(){});
  }
  go();
  v.addEventListener("canplay",go);
  v.addEventListener("loadeddata",go);
  v.addEventListener("playing",function(){window.dispatchEvent(new Event("ens:hero-playing"));});
  v.addEventListener("ended",function(){
    done=true;
    v.dataset.ended="1";
    try{
      if(v.duration&&isFinite(v.duration)) v.currentTime=Math.max(0,v.duration-0.05);
    }catch(e){}
    v.pause();
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
