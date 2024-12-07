import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "./_components/layout/Header";
import Container from "./_components/layout/Container";
import Footer from "./_components/layout/Footer";
import ToastProvider from "./_components/providers/ToastProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "1-infinity 1/2をひたすら当てていくゲーム",
  description:
    "1-infinity は1/2をひたすら当てていき、ベスト記録を目指すシンプルなブラウザゲームです。",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${GeistSans.variable}`}>
      <body
        className={cn(
          "mt-16 min-h-screen bg-background bg-gradient-to-b from-black to-blue-950 font-sans text-white antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>
          <Header />
          <ToastProvider />
          <Container>{children}</Container>
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
