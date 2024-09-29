import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Wallpal - Transform Your Screen in Seconds!",
  description:
    "Create unique, personalized wallpapers for your devices with Wallpal. Customize colors, patterns, and text to match your style.",
  keywords: [
    "wallpaper",
    "generator",
    "custom",
    "design",
    "personalized",
    "Wallpal",
  ],
  authors: [{ name: "Golam Rabbani" }, { name: "Kaushik Das" }],
  creator: "CanWeBe!",
  publisher: "CanWeBe!",
  openGraph: {
    title: "Wallpal - Transform Your Screen in Seconds!",
    description:
      "Create unique, personalized wallpapers for your devices with Wallpal.",
    url: "https://wallpal.vercel.app",
    siteName: "Wallpal",
    images: [
      {
        url: "https://wallpal.vercel.app/ogimage.png",
        width: 1200,
        height: 630,
        alt: "Wallpal - Transform Your Screen in Seconds Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wallpal - Transform Your Screen in Seconds!",
    description:
      "Create unique, personalized wallpapers for your devices with Wallpal.",
    creator: "@wallpal",
    images: ["https://wallpal.vercel.app/ogimage.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "76C2hWhD9MhyJAHhDRqU-1zoKf3sK3pSFZxhqnXmRo4",
  },
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main className="container">
          <Nav />
          {children}
        </main>
        <Toaster />
        <NextTopLoader color="#2463EB" zIndex={999} />
      </body>
    </html>
  );
}
