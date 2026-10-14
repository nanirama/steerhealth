// components/Common/PageLoaderWrapper.tsx
"use client";

import { useState, useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy load GlobalLoader to reduce initial bundle
const GlobalLoader = dynamic(() => import("@/components/Common/GlobalLoader"), {
  ssr: false,
});

export default function PageLoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Use startTransition to mark state updates as low priority
    startTransition(() => {
      setLoading(true);
    });

    // Use requestIdleCallback for non-urgent work
    const idleCallback = 'requestIdleCallback' in window
      ? requestIdleCallback(() => setLoading(false))
      : setTimeout(() => setLoading(false), 100);

    return () => {
      if ('requestIdleCallback' in window) {
        cancelIdleCallback(idleCallback as number);
      } else {
        clearTimeout(idleCallback as number);
      }
    };
  }, [pathname]);

  return (
    <>
      {loading && <GlobalLoader />}
      {children}
    </>
  );
}