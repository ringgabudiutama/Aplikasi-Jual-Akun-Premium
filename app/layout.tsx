import type { Metadata, Viewport } from "next";
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Rifora Premium — Akun Premium Legal & Bergaransi",
  description:
    "Toko akun premium terpercaya: AI Assistant, aplikasi desain, editing video, musik & hiburan streaming. Proses cepat, garansi resmi, admin fast response.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Rifora",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#4B3AF0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-bg text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
