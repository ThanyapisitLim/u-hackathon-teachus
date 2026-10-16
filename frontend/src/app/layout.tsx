import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const sans = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pawproud.pawproud-u-hackathon.workers.dev"),
  title: "PawProud — Let your dog answer first",
  description: "A try-before-you-subscribe dog food service that learns from observable reactions.",
  icons: { icon: "/brand/pawproud-app-icon.webp" },
  openGraph: {
    title: "PawProud",
    description: "Try small. Buy one bowl. Subscribe only after proof.",
    images: ["/brand/pawproud-app-icon.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf7f1",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
