import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, LayoutGrid, Image as ImageIcon } from "lucide-react";
import CTABanner from "@/components/CTABanner";

import { servicesService } from "@/services/servicesService";
import { getAssetUrl } from "@/config/apiConfig";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await servicesService.getAllServices();
  const service = res.data?.find((s) => s.slug === params.id || s.serviceId?.toString() === params.id);
  
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | ACE Sports Tech`,
    description: service.shortDescription || service.description?.substring(0, 100),
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const [servicesRes, featuresRes, mediaRes, featureMediaRes] = await Promise.all([
    servicesService.getAllServices(),
    servicesService.getAllFeatures(),
    servicesService.getAllServiceMedia(),
    servicesService.getAllFeatureMedia(),
  ]);

  const service = servicesRes.data?.find((s) => s.slug === params.id || s.serviceId?.toString() === params.id);

  if (!service) {
    notFound();
  }

  const serviceFeatures = featuresRes.data?.filter(f => f.serviceId === service.serviceId) || [];
  const serviceMedia = mediaRes.data?.filter(m => m.serviceId === service.serviceId).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)) || [];
  
  const featureIds = serviceFeatures.map(f => f.featureId).filter(Boolean);
  const relevantFeatureMedia = featureMediaRes.data?.filter(fm => fm.featureId ? featureIds.includes(fm.featureId) : false) || [];

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

  const mainImageUrls = serviceMedia.length > 0 ? extractUrls(serviceMedia[0].mediaUrl) : [];
  const mainImage = (mainImageUrls.length > 0
    ? getAssetUrl(mainImageUrls[0])
    : null) || "https://images.unsplash.com/photo-1574629810360-7efbb1925846?q=80&w=2070";

  const allImages = [
    ...serviceMedia.flatMap(m => extractUrls(m.mediaUrl).map(url => getAssetUrl(url))),
    ...relevantFeatureMedia.flatMap(fm => extractUrls(fm.mediaUrl).map(url => getAssetUrl(url)))
  ].filter(Boolean);

  return (
    <>
      <article className="min-h-screen bg-slate-50 pt-20">
        {/* Article Header (Hero) */}
        <header className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-20 bg-[#060f1e] overflow-hidden">
          <div className="absolute inset-0">
            <img src={mainImage} alt={service.title} className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e] via-[#060f1e]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060f1e]/90 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 w-full">
            <Link href="/services" className="inline-flex items-center gap-2 text-[#39FF14] text-xs font-bold uppercase tracking-widest mb-8 hover:text-white transition-colors">
              <ArrowLeft size={14} /> Back to Services
            </Link>
            
            {service.serviceTypeName && (
              <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-[#060f1e] bg-[#39FF14] uppercase rounded-full">
                {service.serviceTypeName}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-tight mb-6 max-w-4xl">
              {service.title}
            </h1>
            
            {service.shortDescription && (
              <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-3xl border-l-4 border-[#39FF14] pl-6 py-2">
                {service.shortDescription}
              </p>
            )}
          </div>
        </header>

        {/* Article Body */}
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16 lg:py-24 bg-white shadow-xl -mt-12 relative z-20 rounded-t-[40px] border border-slate-200">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left side: Content & Details */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Overview Section */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <LayoutGrid className="text-[#39FF14]" size={28} />
                  <h2 className="text-3xl font-display font-bold text-slate-900">Service Overview</h2>
                </div>
                <div className="prose prose-lg prose-slate max-w-none">
                  <p className="text-lg md:text-xl text-slate-700 leading-loose">
                    {service.description || service.shortDescription || "Details coming soon."}
                  </p>
                </div>
              </section>

              {/* Features Section */}
              {serviceFeatures.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <CheckCircle2 className="text-[#39FF14]" size={28} />
                    <h2 className="text-3xl font-display font-bold text-slate-900">What's Included</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceFeatures.map((feat, index) => {
                      const fMedia = relevantFeatureMedia.find(fm => fm.featureId === feat.featureId);
                      const fMediaUrls = fMedia ? extractUrls(fMedia.mediaUrl) : [];
                      return (
                        <div key={feat.featureId || index} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-[#39FF14]/50 transition-colors group">
                          {fMediaUrls.length > 0 && (
                            <div className="w-full h-40 mb-4 rounded-xl overflow-hidden bg-slate-200">
                              <img src={getAssetUrl(fMediaUrls[0])!} alt={feat.featureName || "Feature"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.featureName}</h3>
                          {feat.description && (
                            <p className="text-slate-600 leading-relaxed text-sm">
                              {feat.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Right side: Sidebar / Gallery Highlights */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                
                {/* CTA Card inside Sidebar */}
                <div className="md:w-1/3">
                <div className="bg-white p-8 border border-slate-200 shadow-sm sticky top-28">
                  <h3 className="font-display font-bold text-xl uppercase tracking-wide text-slate-900 mb-6">Need expert consultation?</h3>
                  <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                    Our team is ready to discuss your specific requirements and provide a customized quote for your facility.
                  </p>
                  <Link 
                    href="/contact" className="btn-electric w-full justify-center">
                    Request a Quote
                  </Link>
                </div>

              </div>

              </div>
            </div>

          </div>

          {/* Full Media Gallery */}
          {allImages.length > 0 && (
            <div className="mt-20 pt-16 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-10">
                <ImageIcon className="text-[#39FF14]" size={28} />
                <h2 className="text-3xl font-display font-bold text-slate-900">Media Gallery</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allImages.map((img, idx) => (
                  <div key={idx} className="aspect-video rounded-2xl overflow-hidden shadow-sm group cursor-pointer bg-slate-100">
                    <img src={img as string} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTABanner
        title="Ready to Transform Your Vision into Reality?"
        subtitle="Contact us today to discuss your sports infrastructure requirements with our expert team."
        ctaLabel="Contact Our Team"
        ctaHref="/contact"
        secondaryLabel="Explore Projects"
        secondaryHref="/projects"
      />
    </>
  );
}
