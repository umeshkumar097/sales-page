import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
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
  title: {
    default: "Aiclex Technologies | High-Performance Digital & AI Agency",
    template: "%s | Aiclex Technologies"
  },
  description: "Aiclex Technologies is a top-rated digital & AI agency. We build custom websites, scalable Web & Mobile Apps, E-commerce platforms, CRM solutions, and business AI automation systems to multiply your ROI and scale your growth.",
  keywords: [
    "Website Development", "App Development Company", "Custom Web Apps", "AI Automation", 
    "Digital Marketing Agency", "Aiclex Technologies", "B2B Lead Generation", 
    "E-commerce Development", "CRM Software Development", "SEO Services", 
    "High Converting Landing Pages", "Software Development Company India", "Web Design"
  ],
  authors: [{ name: "Aiclex Technologies" }],
  creator: "Aiclex Technologies",
  publisher: "Aiclex Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://m.aiclex.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Aiclex Technologies | Performance-Driven Digital Agency",
    description: "Build high-converting digital assets with Aiclex Technologies. We deliver world-class websites, mobile apps, and AI automation solutions for maximum ROI.",
    url: "https://m.aiclex.in",
    siteName: "Aiclex Technologies",
    images: [
      {
        url: "/logo.png", // Assuming the logo is used as an OG image for now
        width: 1200,
        height: 630,
        alt: "Aiclex Technologies - Digital & AI Agency",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aiclex Technologies | Digital & AI Agency",
    description: "Build high-converting digital assets with Aiclex Technologies.",
    creator: "@AiclexTech",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "huG4wJWVVpLn6VnSCx84f7oAW_tUNLP3xj19DNFvXDs",
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
        <GoogleAnalytics gaId="G-XM6FSJ7G61" />
        
        {/* Google Ads Tracking */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=AW-11514904878`}
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11514904878');
            `,
          }}
        />

        <AOSInit />
        {children}
      </body>
    </html>
  );
}
