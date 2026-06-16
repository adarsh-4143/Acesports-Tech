"use client";

import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import { whyChooseUs } from "@/lib/data";
import { Award, CheckCircle, BarChart3, Cpu, Shield, MapPin } from "lucide-react";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import AnimatedBackground from "@/components/AnimatedBackground";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = { Award, CheckCircle, BarChart3, Cpu, Shield, MapPin };

export default function AboutPage() {
  return (
    <>
      <Hero
        variant="page"
        eyebrow="Our Story"
        headline="Engineering Sporting Destinations Since 2014"
        subheadline="A decade of transforming ordinary spaces into world-class sports infrastructure."
        ctaPrimary={{ label: "Our Services", href: "/services" }}
        ctaSecondary={{ label: "View Projects", href: "/projects" }}
        imageSrc="/services/track.png"
      />

      {/* Mission / Vision */}
      <section className="relative section-pad overflow-hidden bg-white">
        <AnimatedBackgroundLight />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <SectionHeading eyebrow="Who We Are" title="ACE Sports Tech Pvt. Ltd." theme="light" />
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm">
                <p>ACE Sports Tech Pvt. Ltd. is a sports infrastructure company focused on designing, developing, and delivering modern sports facilities including stadiums, synthetic running tracks, football turfs, sports courts, sports academies, and recreational infrastructure.</p>
                <p>Founded with a clear mission to bridge the gap between India&apos;s sporting ambitions and the infrastructure required to achieve them, we have grown into one of the country&apos;s most trusted sports construction and technology companies.</p>
                <p>Our team of engineers, architects, and project managers bring international experience and deep understanding of Indian conditions to every project — ensuring our facilities meet global certification standards while being engineered for local climates and use patterns.</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Our Mission", text: "To transform India's sporting landscape by engineering world-class sports infrastructure that enables athletes to perform at their best.", color: "#007AFF" },
                { label: "Our Vision", text: "To be India's most trusted sports infrastructure partner — known for uncompromising quality, innovation, and the ability to deliver any sporting facility, anywhere.", color: "#007AFF" },
                { label: "Brand Positioning", text: "Engineering high-performance sports environments and transforming ordinary spaces into world-class sporting destinations.", color: "#007AFF" },
              ].map(item => (
                <motion.div 
                  key={item.label} 
                  whileHover={{ scale: 1.02, borderColor: item.color, boxShadow: `0 10px 30px -10px ${item.color}35` }}
                  className="glass-light p-6 transition-all duration-300 border border-slate-200" 
                  style={{ borderLeft: `4px solid ${item.color}` }}
                >
                  <h3 className="text-xl font-display font-black uppercase mb-3 tracking-wide" style={{ color: item.color }}>{item.label}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden" style={{ background: "#09090b" }}>
        <AnimatedBackground />
        <div className="neon-line absolute top-0 left-0 right-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(0, 122, 255,0.05)" }}>
            {[
              { value: "150+", label: "Projects", color: "#007AFF" },
              { value: "18+", label: "States", color: "#007AFF" },
              { value: "2.5M+", label: "Sq Metres", color: "#007AFF" },
              { value: "10+", label: "Years", color: "#BF5AF2" },
            ].map(s => (
              <div key={s.label} className="p-10 text-center" style={{ background: "#09090b" }}>
                <div className="font-display font-bold text-5xl leading-none mb-2" style={{ color: s.color, textShadow: `0 0 30px ${s.color}60` }}>{s.value}</div>
                <p className="text-white/35 text-xs tracking-[0.25em] uppercase font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="neon-line absolute bottom-0 left-0 right-0" />
      </section>

      {/* Brand Attributes */}
      <section className="relative section-pad overflow-hidden bg-slate-50">
        <AnimatedBackgroundLight />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <SectionHeading eyebrow="Brand Attributes" title="What Defines Us" subtitle="Five core principles guide everything we design, build, and deliver." align="center" theme="light" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { word: "Innovative", desc: "Pioneering new materials and construction methods in Indian sports infrastructure.", color: "#007AFF" },
              { word: "Reliable", desc: "Consistent delivery quality, on schedule, across every project we undertake.", color: "#007AFF" },
              { word: "Performance Driven", desc: "Every surface, system and structure is engineered for peak athletic performance.", color: "#007AFF" },
              { word: "Future Ready", desc: "Integrating smart technology and sustainable design into every facility we build.", color: "#BF5AF2" },
              { word: "Sustainable", desc: "Eco-friendly sports surfaces utilizing recycled rubber and energy-efficient systems.", color: "#34C759" },
              { word: "Infrastructure Focused", desc: "Deep specialization in sports construction — it is the only thing we do.", color: "#FF3B5C" },
            ].map((attr, i) => (
              <motion.div 
                key={attr.word} 
                whileHover={{ scale: 1.02, borderColor: attr.color, boxShadow: `0 10px 30px -10px ${attr.color}35` }}
                className="glass-light p-6 text-center transition-all duration-300 border border-slate-200"
              >
                <div className="w-2 h-2 rounded-full mx-auto mb-4" style={{ background: attr.color, boxShadow: `0 0 8px ${attr.color}` }} />
                <p className="font-display font-bold text-slate-900 text-lg uppercase mb-2">{attr.word}</p>
                <p className="text-slate-600 text-xs leading-relaxed">{attr.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative section-pad overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #09090b 100%)" }}>
        <AnimatedBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <SectionHeading eyebrow="Why ACE" title="The ACE Advantage" subtitle="Six reasons why leading organizations across India choose ACE Sports Tech." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChooseUs.map((item, i) => {
              const Icon = iconMap[item.icon] || CheckCircle;
              const colors = ["#007AFF", "#007AFF", "#007AFF", "#BF5AF2", "#FF3B5C", "#007AFF"];
              const c = colors[i];
              return (
                <motion.div 
                  key={item.title} 
                  whileHover={{ scale: 1.02, borderColor: `${c}60`, boxShadow: `0 10px 30px -10px ${c}25` }}
                  className="glass p-6 transition-all duration-300 border border-white/10"
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ background: `${c}15`, border: `1px solid ${c}30` }}>
                    <Icon size={17} style={{ color: c }} />
                  </div>
                  <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-2">{item.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="relative section-pad overflow-hidden bg-white border-t border-slate-200">
        <AnimatedBackgroundLight />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            
            {/* Founder Image */}
            <div className="relative group max-w-md mx-auto w-full lg:order-2">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#007AFF]/20 to-[#0B1F3A]/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
              <div className="absolute top-10 -right-6 w-20 h-20 border-2 border-[#007AFF] rounded-full opacity-50 pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-[#0B1F3A] rounded-full opacity-10 pointer-events-none" />
              
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xl">
                {/* Dummy placeholder photo from Unsplash (professional male) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }} 
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B1F3A]/80 to-transparent mix-blend-multiply" />
              </div>
            </div>

            {/* Quote Card */}
            <div className="lg:order-1">
              <SectionHeading eyebrow="Leadership" title="A Vision for Indian Sports" theme="light" className="mb-12" />
              
              <div className="relative bg-white border border-slate-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-2xl p-8 lg:p-8 z-10">
                {/* Huge Quote Mark */}
                <div className="absolute -top-8 -left-4 text-[120px] text-[#007AFF] opacity-20 font-serif leading-none select-none">
                  &ldquo;
                </div>
                
                <p className="text-slate-600 text-lg lg:text-xl italic leading-relaxed relative z-10 mb-12">
                  &quot;At ACE Sports Tech, our vision goes beyond just building infrastructure. We are engineering the foundation for India&apos;s future athletes. Every track we lay and every turf we install is a commitment to uncompromising excellence, performance, and durability. We believe that world-class facilities are the essential first step towards world-class sporting achievements.&quot;
                </p>
                
                <div className="flex items-center gap-5 border-t border-slate-100 pt-6">
                  <div className="w-12 h-1 bg-[#007AFF] rounded-full" />
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-xl lg:text-2xl uppercase tracking-wide">Ambikesh Chauhan</h4>
                    <p className="text-[#007AFF] font-semibold text-xs tracking-widest uppercase">Founder & Director</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTABanner title="Let's Build Something Extraordinary" subtitle="Get in touch with our team to discuss your sports infrastructure project." ctaLabel="Contact Us" ctaHref="/contact" secondaryLabel="View Our Services" secondaryHref="/services" />
    </>
  );
}
