import type { Metadata, Viewport } from "next";
import { Fredoka, Noto_Sans_Thai, Nunito_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pawproud.pawproud-u-hackathon.workers.dev"),
  title: "PawProud — Let your dog answer first",
  description: "A try-before-you-subscribe dog food service that learns from observable reactions.",
  icons: { icon: "/brand/pawproud-app-icon.webp" },
  openGraph: {
    title: "PawProud",
    description:
      "Try small. Find a match across trusted brands. Refill only after proof.",
    images: ["/brand/pawproud-app-icon.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff8f0",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fredoka.variable} ${nunitoSans.variable} ${notoSansThai.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
