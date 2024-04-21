// Make sure to import the ProjectsProvider from its file location
"use client";
import { ProjectsProvider } from "./contexts/ProjectsContext"; // Adjust the path as necessary
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "./_components/ui/toaster";
import PacmanLoader from "react-spinners/PacmanLoader";
import { createContext, useEffect, useState } from "react";
import { LoadingContext } from "./_Providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let [loading, setloading] = useState(false);
  const setLoading = (values) => {
    setloading(values);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ProjectsProvider>
          <LoadingContext.Provider value={{ setLoading, loading }}>
            <div className="flex flex-col min-h-screen w-screen content">
              <Header />
              <main className="flex flex-grow flex-col ">{children}</main>
              <Toaster />
              <Footer />
            </div>
            <div
              className={`fixed top-0 left-0 w-full h-full opacity-50 ${loading ? "bg-slate-400" : "hidden"}`}
            ></div>
            <div
              className={`fixed top-[calc(50%-200px)] left-[calc(50%-500px)] ${loading ? "" : "hidden"}`}
            >
              <PacmanLoader
                color="#36d7b7"
                loading={true}
                size={200}
                className="absolute top-1/2 left-1/2 opacity-80 z-[90]"
              />
            </div>
          </LoadingContext.Provider>
        </ProjectsProvider>
      </body>
    </html>
  );
}
