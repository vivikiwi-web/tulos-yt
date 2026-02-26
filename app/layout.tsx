import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Tulos Ecommerce App for shopping",
  description: "An ecommerce app built with Next.js, TypeScript, and Clerk for authentication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${raleway.variable} antialiased`}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
