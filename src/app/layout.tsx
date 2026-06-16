import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryPopup from "@/components/EnquiryPopup";
import MobileBottomNav from "@/components/MobileBottomNav";
import Providers from "@/components/Providers";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "ACE Sports Tech | Transforming Spaces into Sporting Destinations",
    template: "%s | ACE Sports Tech",
  },
  description: "ACE Sports Tech Pvt. Ltd. — India's premier sports infrastructure company. Designing, developing and delivering world-class stadiums, synthetic tracks, artificial turf, sports courts and academies.",
  keywords: ["sports infrastructure","synthetic running track","artificial turf","stadium development","sports courts","India"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "ACE Sports Tech | Transforming Spaces into Sporting Destinations",
    description: "Engineering high-performance sports environments across India.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ background: "#09090b" }}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileBottomNav />
          <EnquiryPopup />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
