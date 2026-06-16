import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import AnimatedBackground from "@/components/AnimatedBackground";
import { mediaService } from "@/services/mediaService";
import { getAssetUrl } from "@/config/apiConfig";

export const metadata: Metadata = {
  title: "Video Gallery",
  description: "Watch our projects come to life. Video gallery of ACE Sports Tech installations.",
};

export default async function VideoGalleryPage() {
  const res = await mediaService.getAllVideoGalleries();
  const videos = res.data || [];

  return (
    <>
      <Hero
        variant="page"
        eyebrow="Media"
        headline="Video Gallery"
        subheadline="Experience the scale and precision of our sporting infrastructure projects."
        ctaPrimary={{ label: "View Services", href: "/services" }}
        imageSrc="/services/multisport.png"
      />

      <section className="relative section-pad overflow-hidden" style={{ background: "#09090b" }}>
        <AnimatedBackground />
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none opacity-10"
          style={{ background: "radial-gradient(ellipse, #BF5AF2 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between mb-10">
            <SectionHeading eyebrow="Watch" title="Featured Installations" className="mb-0 text-white" />
            <span className="bg-white/10 px-4 py-2 text-xs text-white/60 font-mono rounded border border-white/5 backdrop-blur-md">
              {videos.length} videos
            </span>
          </div>
          
          {videos.length === 0 ? (
            <div className="text-center py-16 text-white/50 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
              No videos available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((v, i) => {
                let rawUrl = v.urlVideo ? v.urlVideo.trim() : "";
                let isLocalVideo = rawUrl.startsWith("/uploads") || rawUrl.endsWith(".mp4") || rawUrl.endsWith(".webm") || rawUrl.endsWith(".mov");
                
                let renderUrl = rawUrl;
                
                if (isLocalVideo) {
                  renderUrl = getAssetUrl(rawUrl) || "";
                } else {
                  // Robust YouTube URL parsing
                  const ytMatch = rawUrl.match(/(?:youtube\.com\/(?:shorts\/|[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
                  if (ytMatch && ytMatch[1]) {
                    renderUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
                  } else if (rawUrl.includes("vimeo.com")) {
                    // Just in case they paste a Vimeo link
                    const vimeoMatch = rawUrl.match(/vimeo\.com\/(?:.*#|.*\/videos\/)?([0-9]+)/);
                    if (vimeoMatch && vimeoMatch[1]) {
                      renderUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
                    }
                  }
                }

                return (
                  <div key={v.videoId || i} className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-black border border-white/5">
                      {renderUrl ? (
                        isLocalVideo ? (
                          <video 
                            src={renderUrl} 
                            controls 
                            className="w-full h-full absolute inset-0 object-contain bg-black"
                            preload="metadata"
                          />
                        ) : (
                          <iframe 
                            src={renderUrl} 
                            title={v.title || "Video"}
                            className="w-full h-full absolute inset-0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen 
                          />
                        )
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">
                          Video not found
                        </div>
                      )}
                    </div>
                    
                    <div className="px-2 pb-2">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black bg-[#BF5AF2] rounded-full">
                          Video
                        </span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight group-hover:text-[#BF5AF2] transition-colors">
                        {v.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed text-sm">
                        {v.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CTABanner
        title="Inspired by Our Work?"
        subtitle="Let's build a facility that meets your exact specifications and international standards."
        ctaLabel="Get in Touch"
        ctaHref="/contact"
      />
    </>
  );
}
