import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | ACE Sports Tech",
  description: "ACE Sports Tech — India's premier sports infrastructure company with 10+ years and 150+ projects.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
