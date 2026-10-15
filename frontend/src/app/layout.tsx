import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
  themeColor: "#fff8f0",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
