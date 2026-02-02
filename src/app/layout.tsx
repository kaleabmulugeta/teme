import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const notoEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-noto-ethiopic",
  subsets: ["ethiopic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TEME Upholstery | Premium Leather & Custom Interiors",
  description: "በኢትዮጵያ ምርጥ የቆዳ ዲዛይን እና ሽፋን አገልግሎት | Ethiopia's premier upholstery and leather design service for cars, cinemas, and architectural projects.",
  keywords: ["upholstery", "leather", "car interior", "Ethiopia", "Addis Ababa", "cinema seats", "custom furniture"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${notoEthiopic.variable} antialiased bg-background text-foreground selection:bg-foreground selection:text-background`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll>
              <Header />
              <main>{children}</main>
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
