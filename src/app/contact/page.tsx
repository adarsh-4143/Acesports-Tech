import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ContactForm from "@/features/ContactForm";
import { MapPin, Phone, Mail, Clock, Zap } from "lucide-react";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ACE Sports Tech Pvt. Ltd. for sports infrastructure enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        variant="page"
        eyebrow="Get in Touch"
        headline="Let's Build Your Vision Together"
        subheadline="Have a project in mind? Our sports infrastructure experts are ready to help you engineer your next sporting destination."
        imageSrc="/services/courts.png"
      />

      <section className="relative section-pad overflow-hidden bg-white">
        <AnimatedBackgroundLight />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            {/* Info */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: "#007AFF", boxShadow: "0 0 8px #007AFF" }} />
                <span className="text-slate-900 text-xs font-display font-semibold tracking-[0.3em] uppercase">Contact</span>
              </div>
              <h2 className="font-display font-bold text-slate-900 text-3xl uppercase leading-tight mb-4">
                ACE Sports Tech<br />Pvt. Ltd.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-10">
                Reach us directly or fill the enquiry form and we&apos;ll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Office", lines: ["J39 Centre Portion, West Patel Nagar,", "New Delhi – 110008"], color: "#007AFF" },
                  { icon: Phone, label: "Phone", lines: ["+91 73680 40888", "+91 98189 33156"], links: ["tel:7368040888","tel:9818933156"], color: "#007AFF" },
                  { icon: Mail, label: "Email", lines: ["info@acesportstech.com", "enquire.acesports@gmail.com"], links: ["mailto:info@acesportstech.com","mailto:enquire.acesports@gmail.com"], color: "#007AFF" },
                  { icon: Clock, label: "Hours", lines: ["Mon – Sat: 9AM – 6PM IST"], color: "#BF5AF2" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 bg-white"
                      style={{ border: `1px solid ${item.color}40`, boxShadow: `0 0 15px ${item.color}20` }}>
                      <item.icon size={14} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-display font-semibold tracking-[0.2em] uppercase mb-1.5 text-slate-900">{item.label}</p>
                      {item.lines.map((line, li) =>
                        (item as any).links?.[li] ? (
                          <a key={line} href={(item as any).links[li]} className="block text-slate-500 text-xs hover:text-slate-900 transition-colors">{line}</a>
                        ) : (
                          <p key={line} className="text-slate-500 text-xs">{line}</p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="mt-14 pt-8 border-t border-slate-200">
                <p className="text-slate-400 text-xs tracking-[0.25em] uppercase font-display mb-3">Certified Standards</p>
                <div className="flex flex-wrap gap-2">
                  {["FIFA","IAAF","FIBA","ITF","FIH"].map(cert => (
                    <span key={cert} className="text-xs font-display font-bold tracking-widest px-3 py-1.5 border border-slate-200 text-slate-600 bg-slate-50">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map/Location section */}
      <section className="relative overflow-hidden" style={{ background: "#09090b" }}>
        <AnimatedBackground />
        <div className="neon-line" />
        <div className="h-56 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(0, 122, 255,0.08) 0%, transparent 70%)" }} />
          <div className="relative z-10 text-center">
            <MapPin size={28} className="text-[#007AFF] mx-auto mb-3" style={{ filter: "drop-shadow(0 0 10px #007AFF)" }} />
            <p className="font-display font-bold text-white text-xl uppercase mb-1">West Patel Nagar, New Delhi</p>
            <a href="https://maps.google.com/?q=West+Patel+Nagar+New+Delhi" target="_blank" rel="noopener noreferrer"
              className="text-white/30 text-xs tracking-[0.2em] uppercase hover:text-[#007AFF] transition-colors">
              View on Google Maps
            </a>
          </div>
        </div>
        <div className="neon-line" />
      </section>
    </>
  );
}
