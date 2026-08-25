"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import WhatsAppChat from "@/components/WhatsAppChat";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      document.documentElement.classList.remove("ens-hero-mobile");
    }
  }, [isHome]);

  return (
    <>
      <Preloader />
      <div
        className={
          isHome
            ? "relative flex h-dvh flex-col overflow-x-hidden max-md:bg-[#dde5e8]"
            : "flex min-h-full flex-col"
        }
      >
        <Navbar />
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        <Footer />
      </div>
      <WhatsAppChat />
    </>
  );
}
