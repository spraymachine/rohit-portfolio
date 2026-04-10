import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohit Kumar | Photography",
  description:
    "Automotive & Wildlife Photography by Rohit Kumar. Cinematic visuals that capture speed, nature, and the extraordinary.",
  keywords: ["photography", "automotive", "wildlife", "portrait", "cinematic"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-black text-white antialiased">
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
