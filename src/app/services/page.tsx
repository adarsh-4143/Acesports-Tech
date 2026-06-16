import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import { servicesService } from "@/services/servicesService";
import { getAssetUrl } from "@/config/apiConfig";
import { CheckCircle, ArrowRight, Zap } from "lucide-react";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "Services",
  description: "ACE Sports Tech — stadium development, synthetic tracks, artificial turf, sports courts, academies and technology solutions.",
};

const accentColors = ["#007AFF","#007AFF","#007AFF","#BF5AF2","#FF3B5C","#007AFF","#007AFF"];

export default async function ServicesPage() {
  const [servicesRes, featuresRes, mediaRes, featureMediaRes] = await Promise.all([
    servicesService.getAllServices(),
    servicesService.getAllFeatures(),
    servicesService.getAllServiceMedia(),
    servicesService.getAllFeatureMedia(),
  ]);

  const rawServices = servicesRes.data || [];
  const allFeatures = featuresRes.data || [];
  const allMedia = mediaRes.data || [];
  const allFeatureMedia = featureMediaRes.data || [];

  const dynamicServices = rawServices.map((service) => {
    const serviceFeatures = allFeatures
      .filter((f) => f.serviceId === service.serviceId)
      .map((f) => f.featureName || f.description || "");

    const serviceMedia = allMedia
      .filter((m) => m.serviceId === service.serviceId)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    const image = (serviceMedia.length > 0 && serviceMedia[0].mediaUrl
      ? getAssetUrl(serviceMedia[0].mediaUrl)
      : null) || "/services/multisport.png"; // fallback image

    return {
      id: service.slug || service.serviceId?.toString() || "",
      shortTitle: service.title || "Service",
      title: service.title || "Service",
      description: service.shortDescription || "",
      longDescription: service.description || "",
      features: serviceFeatures.length > 0 ? serviceFeatures : ["Professional installation", "Turnkey solutions"],
      image,
    };
  });

  return (
    <>
      <Hero
        variant="page"
        eyebrow="What We Build"
        headline="Sports Infrastructure Services"
        subheadline="End-to-end design, engineering and construction — delivered to international standards."
        ctaPrimary={{ label: "Get a Quote", href: "/contact" }}
        imageSrc="/services/multisport.png"
      />

      {/* Quick nav */}
      <section className="sticky top-20 z-30 border-b bg-white border-slate-200 shadow-sm" style={{ backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {dynamicServices.map((s, i) => (
              <a key={s.id} href={`#${s.id}`}
                className="shrink-0 px-4 py-2 text-xs font-display font-semibold tracking-[0.12em] uppercase transition-all duration-300 border border-slate-200 text-slate-500 hover:[border-color:var(--hover-color)] hover:[color:var(--hover-color)] hover:bg-slate-50 rounded"
                style={{ "--hover-color": accentColors[i] } as React.CSSProperties}
              >
                {s.shortTitle}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services detail */}
      {dynamicServices.map((service, i) => {
        const color = accentColors[i];
        const isEven = i % 2 === 0;
        return (
          <section
            key={service.id}
            id={service.id}
            className="relative section-pad overflow-hidden"
            style={{ background: isEven ? "#ffffff" : "linear-gradient(135deg, #0B1F3A 0%, #09090b 100%)" }}
          >
            {isEven ? <AnimatedBackgroundLight /> : <AnimatedBackground />}
            <div className={`absolute inset-0 ${isEven ? 'grid-pattern-light opacity-50' : 'grid-pattern opacity-15'} pointer-events-none`} />
            {/* Color glow */}
            <div className="absolute pointer-events-none opacity-8"
              style={{
                [isEven ? "right" : "left"]: "-100px", top: "50%", transform: "translateY(-50%)",
                width: "400px", height: "400px", borderRadius: "50%",
                background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
              }} />
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />

            <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                <div className={!isEven ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-px" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                    <span className="sport-badge" style={{ background: `${color}10`, color, border: `1px solid ${color}30` }}>
                      Service {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className={`font-display font-bold ${isEven ? 'text-slate-900' : 'text-white'} text-3xl lg:text-5xl uppercase leading-tight mb-4`}>
                    {service.title}
                  </h2>
                  <div className="h-0.5 w-16 mb-5" style={{ background: `linear-gradient(90deg, ${color}, transparent)`, boxShadow: `0 0 8px ${color}60` }} />
                  <p className={`${isEven ? 'text-slate-600' : 'text-white/60'} leading-relaxed mb-3`}>{service.description}</p>
                  <p className={`${isEven ? 'text-slate-500' : 'text-white/40'} text-sm leading-relaxed mb-12`}>{service.longDescription}</p>
                  <Link href={`/services/${service.id}`} className="btn-electric">
                    <Zap size={13} />
                    View Details
                  </Link>
                </div>

                <div className={!isEven ? "lg:order-1" : ""}>
                  <div className={`overflow-hidden ${isEven ? "bg-slate-50 border" : "glass-electric"}`} style={{ borderColor: `${color}25` }}>
                    <div className="h-48 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[#09090b]/20 z-10" />
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-7">
                      <p className="text-xs font-display font-semibold tracking-[0.25em] uppercase mb-6" style={{ color }}>
                        What&apos;s Included
                      </p>
                      <ul className="space-y-4">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                          <span className={`${isEven ? 'text-slate-600' : 'text-white/65'} text-sm leading-relaxed`}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  </div>

                  {/* Service number accent */}
                  <div className="absolute -z-10 font-display font-bold opacity-[0.03] text-[180px] leading-none select-none"
                    style={{ color, top: "50%", [isEven ? "right" : "left"]: "0", transform: "translateY(-50%)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CTABanner
        title="Have a Project in Mind?"
        subtitle="Our specialists are ready to help you plan, design and deliver your facility."
        ctaLabel="Request Consultation"
        ctaHref="/contact"
        secondaryLabel="See Our Projects"
        secondaryHref="/projects"
      />
    </>
  );
}
