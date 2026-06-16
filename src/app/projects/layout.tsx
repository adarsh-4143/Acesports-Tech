import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects | ACE Sports Tech",
  description: "ACE Sports Tech portfolio — stadiums, tracks, turfs, courts and academies across India.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
