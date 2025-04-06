import type { Metadata } from "next";
import { Nunito, PT_Sans } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Duitku",
  description: "Catat Duitku",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Duitku" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${nunito.variable} ${ptSans.variable} antialiased relative`}
      >
        <div className="texture" />
        {children}
      </body>
    </html>
  );
}