import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sigenic Partner Portal",
  description: "The operating system for all partner interactions with Sigenic",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
