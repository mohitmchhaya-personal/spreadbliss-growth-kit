import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = localFont({
  src: [
    { path: "./fonts/dm-sans-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/dm-sans-latin.woff2", weight: "600", style: "normal" },
    { path: "./fonts/dm-sans-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-latin.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spreadbliss Growth Kit",
  description: "Everything you need to share your organization's Spreadbliss profile.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full ${dmSans.variable} ${inter.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
