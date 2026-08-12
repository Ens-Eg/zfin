import { SITE_NAME, SITE_URL, localeUrl } from "@/lib/seo";

export default function JsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: "ENS – Enterprise Network Solutions",
        url: SITE_URL,
        logo: `${SITE_URL}/ENS.png`,
        image: `${SITE_URL}/ens-logo.png`,
        email: "info@ens.eg",
        telephone: "+201553841793",
        address: {
          "@type": "PostalAddress",
          streetAddress: "ابن الفارض مع المعاهده أمام محلات المدينة المنورة",
          addressCountry: "EG",
          addressLocality: "Egypt",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 30.7908273,
          longitude: 30.9797182,
        },
        areaServed: "EG",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: localeUrl(locale, ""),
        name: SITE_NAME,
        inLanguage: locale === "ar" ? "ar-EG" : "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
