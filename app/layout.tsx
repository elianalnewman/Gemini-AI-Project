import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "Answer all your questions with the click of a button",
  metadataBase: new URL("https://your-domain.com"), // <-- ADD YOUR DOMAIN
  openGraph: {
    title: "AI Assistant",
    description: "Answer all your questions with the click of a button",
    url: "https://your-domain.com",
    siteName: "AI Assistant",
    type: "website", // website | article | system | app
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Assistant Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Assistant",
    description: "Answer all your questions with the click of a button",
    images: ["https://your-domain.com/og-image.png"],
    site: "@yourTwitterHandle",
    creator: "@yourTwitterHandle",
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
