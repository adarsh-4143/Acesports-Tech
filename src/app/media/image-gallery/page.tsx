import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import Lightbox from "@/components/Lightbox";
import { mediaService } from "@/services/mediaService";
import { getAssetUrl } from "@/config/apiConfig";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Image Gallery",
  description: "ACE Sports Tech image gallery — stadiums, tracks, turfs, courts and academies across India.",
};

export default async function ImageGalleryPage({ searchParams }: { searchParams: { image?: string } }) {
  const selectedGalleryId = searchParams?.image;

  const [galleriesRes, detailsRes] = await Promise.all([
    mediaService.getAllImageGalleries(),
    mediaService.getAllImageDetails(),
  ]);

  const rawGalleries = galleriesRes.data || [];
  const rawDetails = detailsRes.data || [];

  const extractUrls = (urlStr: string | null | undefined): string[] => {
    if (!urlStr) return [];
    if (urlStr.startsWith('[')) {
      try {
        const parsed = JSON.parse(urlStr);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch (e) {}
    }
    return urlStr.split(',').map(s => s.trim()).filter(Boolean);
  };

  const dynamicProjects = rawGalleries.map((g, i) => {
    const details = rawDetails.filter(d => d.galleryId === g.imageId).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    
    const coverUrls = extractUrls(g.imageUrl);
    const coverImage = (coverUrls.length > 0 ? getAssetUrl(coverUrls[0]) : null) || "https://images.unsplash.com/photo-1574629810360-7efbb1925846?q=80&w=2070";
    
    // Map all detail images handling potential comma separated strings
    const detailUrls = details.flatMap(d => extractUrls(d.imageUrl).map(url => getAssetUrl(url)));

    return {
      id: g.imageId?.toString() || `gallery-${i}`,
      title: g.title || "Image Gallery",
      description: g.description || "",
      category: "Gallery Album",
      location: "",
      year: "",
      image: coverImage,
      images: [
        ...coverUrls.map(url => getAssetUrl(url)), 
        ...detailUrls
      ].filter(Boolean) as string[],
    };
  });

  const selectedGallery = dynamicProjects.find(p => p.id === selectedGalleryId);

  return (
    <>
      {selectedGallery && <Lightbox gallery={selectedGallery} />}
      
      <Hero
        variant="page"
        eyebrow="Media"
        headline="Image Gallery"
        subheadline="Explore our portfolio of landmark sports infrastructure across India."
        ctaPrimary={{ label: "Start a Project", href: "/contact" }}
        imageSrc="/services/stadium.png"
      />

      {/* Projects grid */}
      <section className="relative section-pad overflow-hidden bg-slate-50">
        <AnimatedBackgroundLight />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-5"
          style={{ background: "radial-gradient(ellipse, rgba(0, 122, 255,0.4) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between mb-10">
            <SectionHeading eyebrow="Gallery" title="Our Work in Pictures" className="mb-0" theme="light" />
            <span className="bg-slate-200 px-4 py-2 text-xs text-slate-600 font-mono rounded">{dynamicProjects.length} albums</span>
          </div>
          
          {dynamicProjects.length === 0 ? (
            <div className="text-center py-16 text-slate-500">No galleries available.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {dynamicProjects.map((p, i) => (
                <Link key={p.id} href={`?image=${p.id}`} scroll={false} className="block group">
                  <div className="pointer-events-none relative">
                    <div className="absolute inset-0 z-20 cursor-pointer pointer-events-auto" />
                    <ProjectCard {...p} index={i} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner
        title="Your Project Could Be Next"
        subtitle="Join the growing list of organizations that trust ACE Sports Tech for world-class sporting infrastructure."
        ctaLabel="Discuss Your Project"
        ctaHref="/contact"
        secondaryLabel="Our Services"
        secondaryHref="/services"
      />
    </>
  );
}
