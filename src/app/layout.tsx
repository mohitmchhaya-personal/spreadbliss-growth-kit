import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spreadbliss Growth Kit",
  description: "Everything you need to share your organization's Spreadbliss profile.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
