"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { PrivyProvider } from "@privy-io/react-auth";
import { Toaster } from "./_components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyProvider appId="clv2imcvj0cibq4ygimrot8a4">
          <div className="flex flex-col min-h-screen w-screen">
            <Header />
            <main className="flex flex-grow flex-col ">{children}</main>
            <Toaster />
            <Footer />
          </div>
        </PrivyProvider>
      </body>
    </html>
  );
}
