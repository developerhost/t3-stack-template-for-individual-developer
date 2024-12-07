"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";
import * as gtag from "src/lib/gtag";

export default function GA() {
  const pathname = usePathname();
  const previousPathname = useRef("");

  // ページ遷移時にページビューを送信
  useEffect(() => {
    if (previousPathname.current && previousPathname.current !== pathname) {
      gtag.pageview(pathname);
    }
    previousPathname.current = pathname;
  }, [pathname]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());

           gtag('config', '${gtag.GA_MEASUREMENT_ID}', {
             page_path: window.location.pathname,
           });
           `,
        }}
      />
    </>
  );
}
