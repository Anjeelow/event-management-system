'use client'

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/app/ui/navbar";
import { AuthProvider } from "./authContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingSpinner from "./ui/loadingSpinner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Event Management System",
//   description: "create and join events effortlessly",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsRouteLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsRouteLoading(false);
    };

    const handleRouteChangeError = () => {
      setIsRouteLoading(false);
    };

    window.addEventListener('routeChangeStart', handleRouteChangeStart);
    window.addEventListener('routeChangeComplete', handleRouteChangeComplete);
    window.addEventListener('routeChangeError', handleRouteChangeError);

    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChangeStart);
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
      window.removeEventListener('routeChangeError', handleRouteChangeError);
    };
  }, [pathname]);

  return (
    <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          <AuthProvider>
            <Navbar />
            {isRouteLoading && <LoadingSpinner />}
            {children}
          </AuthProvider>
        </body>
    </html>
  );
}
