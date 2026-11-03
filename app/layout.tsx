import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Geist, Geist_Mono } from "next/font/google";
import { NotificationProvider } from "@/context/NotificationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium | A messaging platform",
  description: "Messaging platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <NotificationProvider>{children}</NotificationProvider>
        </Providers>
      </body>
    </html>
  );
}
