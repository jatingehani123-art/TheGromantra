"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { KineticTypographyLoader } from "@/components/ui/loading-animation";

export function SiteLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // Initial page load — show loader for 1.8s then fade out
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1800);
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
      setIsFading(false);
    }, 2400); // 1800ms display + 600ms fade
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Route change — show loader briefly
  useEffect(() => {
    setIsLoading(true);
    setIsFading(false);
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 600);
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
      setIsFading(false);
    }, 1200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            opacity: isFading ? 0 : 1,
            transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: isFading ? "none" : "auto",
          }}
        >
          <KineticTypographyLoader />
        </div>
      )}
      <div
        style={{
          opacity: isLoading && !isFading ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
