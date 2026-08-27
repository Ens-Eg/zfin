import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/gtm";

export default function GoogleAdsTag() {
  return (
    <>
      <Script
        id="google-ads-gtag-js"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
