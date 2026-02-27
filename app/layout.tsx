import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import AOSInit from "@/components/ui/AOSInit";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aiclex Technologies | High-Performance Digital & AI Agency",
  description: "Aiclex Technologies is a performance-driven digital & AI agency delivering custom websites, scalable mobile apps, and business automation systems to boost your ROI.",
  keywords: "Website Development, App Development, Custom Web Apps, AI Automation, Digital Agency, Aiclex Technologies",
  openGraph: {
    title: "Aiclex Technologies | Performance-Driven Digital Agency",
    description: "Build high-converting digital assets with Aiclex Technologies. We deliver websites, mobile apps, and AI solutions for maximum ROI.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
