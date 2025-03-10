'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID as string;
export const GA_MEASUREMENT_ID = "G-NNTKLKFCD6" as string;

// Check if GA ID exists
const isGoogleAnalyticsEnabled = GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== '';

type WindowWithGA = Window & {
  gtag: (
    command: string,
    action: string,
    params?: Record<string, any>
  ) => void;
};

declare const window: WindowWithGA;

// Send pageview event to Google Analytics
export const pageview = (url: string) => {
  if (!isGoogleAnalyticsEnabled) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track specific events
export const event = ({ action, params }: { 
  action: string, 
  params: Record<string, any> 
}) => {
  if (!isGoogleAnalyticsEnabled) return;
  window.gtag('event', action, params);
};

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isGoogleAnalyticsEnabled) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    pageview(url);
  }, [pathname, searchParams]);

  if (!isGoogleAnalyticsEnabled) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}