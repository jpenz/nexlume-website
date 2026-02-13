import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
  title: "Nexlume | Precision Fiber Optic Solutions",
  description:
    "Custom fiber optic cable assemblies for data centers, 5G networks, and broadband deployments. Configure online, get instant quotes, or upload your plans for AI-powered analysis.",
  keywords: [
    "fiber optic cable assembly",
    "custom fiber optic cable",
    "data center cabling",
    "5G fiber optic",
    "FTTH fiber",
    "MTP MPO assemblies",
    "fiber optic configurator",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
