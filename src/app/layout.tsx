"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/context/AuthContext";
import { Roboto } from "next/font/google";
import React from "react";
import Navbar from "@/components/@core/Navbar";
import {usePathname} from "next/navigation";

const roboto = Roboto({
    weight: ["400", "500", "700"], // choose weights you need
    subsets: ["latin"],
    display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const pathname = usePathname();
    const hideNavbar = pathname === "/login" || pathname === "/register";

    return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.className} antialiased`}
      >
      <AuthProvider>
          {!hideNavbar && <Navbar />}
          {children}
      </AuthProvider>
      </body>
    </html>
  );
}
