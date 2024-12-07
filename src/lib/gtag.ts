declare global {
  interface Window {
    gtag: (command: string, id: string, config: { page_path: string }) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

/** ページビューを送信 */
export const pageview = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  window.gtag("config", GA_MEASUREMENT_ID ?? "", {
    page_path: url,
  });
};
