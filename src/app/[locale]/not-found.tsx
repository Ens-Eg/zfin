import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-36 pb-20 text-center">
      <p className="text-sm font-bold tracking-widest text-brand-600">404</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-gray-600">{t("body")}</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-linear-to-r from-brand-600 to-indigo-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/25"
      >
        {t("home")}
      </Link>
    </div>
  );
}
