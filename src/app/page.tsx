"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Zap, CheckCircle, Award, BarChart3,
  Cpu, Shield, MapPin, ChevronRight, Play, TrendingUp, ChevronDown, X
} from "lucide-react";
import Hero from "@/components/Hero";
import HomeHeroSlider from "@/components/HomeHeroSlider";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import { services, projects, stats, testimonials, whyChooseUs, processSteps, industries } from "@/lib/data";
import AnimatedBackground from "@/components/AnimatedBackground";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";

// ── Animated counter ──────────────────────────────────────────
function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    const isDecimal = value.includes(".");
    let start = 0;
    const end = num;
    const duration = 2000;
    const step = 16;
    const increment = end / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { start = end; clearInterval(timer); }
      setDisplay(isDecimal ? start.toFixed(1) : Math.floor(start).toString());
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  const suffix2 = value.replace(/[0-9.]/g, "");
  return <span ref={ref}>{display}{suffix2}</span>;
}

// ── Marquee text ──────────────────────────────────────────────
function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const track = [...items, ...items];
  return (
    <div className="overflow-hidden py-3">
      <div className={`flex gap-8 whitespace-nowrap ${reverse ? "marquee-track-rev" : "marquee-track"}`}>
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className={`font-display font-bold text-2xl uppercase tracking-widest ${reverse ? "text-white" : "text-[#0B1F3A]"}`}>{item}</span>
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: reverse ? "#007AFF" : "#0B1F3A", boxShadow: reverse ? "0 0 6px #007AFF" : "none" }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Testimonial slider ────────────────────────────────────────
function TestimonialsSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          className="glass-electric p-8"
        >
          <div className="font-display text-6xl text-[#007AFF] opacity-20 leading-none mb-2">&quot;</div>
          <p className="text-white/70 text-base leading-relaxed mb-6 italic">{testimonials[active].quote}</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center font-display font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #007AFF, #004eaa)", color: "#09090b" }}>
              {testimonials[active].name.charAt(0)}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{testimonials[active].name}</p>
              <p className="text-white/40 text-xs">{testimonials[active].designation}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Dots */}
      <div className="flex gap-2 mt-5">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="w-8 h-0.5 transition-all duration-300"
            style={{ background: i === active ? "#007AFF" : "rgba(255,255,255,0.15)", boxShadow: i === active ? "0 0 8px #007AFF" : "none" }}
          />
        ))}
      </div>
    </div>
  );
}

const iconMap: Record<string, React.ElementType> = {
  Award, CheckCircle, BarChart3, Cpu, Shield, MapPin,
};

// ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HomeHeroSlider />

      {/* ── MARQUEE ─────────────────────────────── */}
      <div className="relative overflow-hidden py-2 bg-slate-50 border-y border-slate-200">
        <Marquee items={["Stadium Development","Synthetic Tracks","Artificial Turf","Sports Courts","Academies","Technology Solutions","FIFA Certified","IAAF Standards","Pan-India Delivery"]} />
      </div>

      {/* ── ABOUT ───────────────────────────────── */}
      <AboutSection />

      {/* ── SERVICES ────────────────────────────── */}
      <ServicesSection />

      {/* ── MARQUEE 2 ───────────────────────────── */}
      <div className="py-2 overflow-hidden" style={{ background: "#09090b", borderTop: "1px solid rgba(0, 122, 255,0.08)", borderBottom: "1px solid rgba(0, 122, 255,0.08)" }}>
        <Marquee items={["150+ Projects","18+ States","2.5M+ Sq Metres","10+ Years Experience","FIFA Quality Pro","IAAF Class 1","FIBA Compliant","ITF Certified"]} reverse />
      </div>

      {/* ── PROJECTS ────────────────────────────── */}
      <ProjectsSection />

      {/* ── WHY CHOOSE US ───────────────────────── */}
      <WhyUsSection />

      {/* ── PROCESS ─────────────────────────────── */}
      <ProcessSection />

      {/* ── INDUSTRIES ──────────────────────────── */}
      <IndustriesSection />

      {/* ── STATS ───────────────────────────────── */}
      <StatsSection />

      {/* ── TESTIMONIALS ────────────────────────── */}
      <TestimonialsSection />

      {/* ── CTA ─────────────────────────────────── */}
      <CTABanner
        title="Transform Your Space Now"
        subtitle="Partner with India's leading sports infrastructure experts. From concept to handover, we manage every detail."
        ctaLabel="Start a Project"
        ctaHref="/contact"
        secondaryLabel="Explore Services"
        secondaryHref="/services"
      />
    </>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative overflow-hidden section-pad bg-white">
      <AnimatedBackgroundLight />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-4"
          >
            {/* Glow Backdrops */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#007AFF]/10 to-transparent rounded-3xl blur-xl pointer-events-none" />
            
            {/* Decorative Neon Circles */}
            <div className="absolute top-10 -left-6 w-16 h-16 border-2 border-[#007AFF]/30 rounded-full opacity-40 pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-[#007AFF]/20 rounded-full opacity-20 pointer-events-none" />

            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] w-full max-w-[500px] z-10 border border-slate-100">
              <img src="/about1.png" alt="Artificial Turf Construction" className="w-full h-full object-cover" />
            </div>
            
            {/* Overlapping Smaller Image */}
            <div className="absolute -bottom-10 -right-4 lg:-right-6 w-2/3 max-w-[280px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white z-20">
              <img src="/about2.png" alt="Indoor Sports Arena" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col pt-14 lg:pt-0"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-[#09090b] flex items-center justify-center shrink-0">
                <ArrowRight size={12} className="text-white" />
              </div>
              <span className="text-slate-800 font-bold text-xs tracking-widest uppercase">
                Welcome to ACE Sports Tech
              </span>
            </div>
            
            <h2 className="font-display font-bold text-[#0B1F3A] text-4xl lg:text-5xl leading-[1.1] mb-6">
              Artificial Turf Construction in India
            </h2>
            
            <p className="text-slate-600 leading-relaxed mb-12 text-[15px]">
              We are India&apos;s best sports infrastructure company with 10+ years of expertise in Artificial Turf Construction in India. We design and make world-class multi-sport courts, including pickleball, badminton, football, basketball, and cricket, along with premium landscape grass, durable turf nets, and complete project consultancy...
            </p>

            <ul className="space-y-3 mb-10">
              {["Proven Expertise", "Multi-Sport Solutions", "Complete Consultancy"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#007AFF] flex items-center justify-center shrink-0 shadow-md">
                    <CheckCircle size={12} className="text-[#09090b]" />
                  </div>
                  <span className="text-slate-800 font-semibold text-[15px]">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/about" className="self-start px-8 py-3.5 bg-[#0B1F3A] text-white font-semibold rounded hover:bg-[#09090b] transition-colors shadow-lg shadow-[#0B1F3A]/20">
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── SERVICES ──────────────────────────────────────────────────
function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<typeof services[number] | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  return (
    <section className="relative section-pad overflow-hidden" style={{ background: "#09090b" }}>
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="What We Build"
            title="Core Services"
            subtitle="End-to-end design, engineering and construction for every type of sports facility."
            className="mb-0"
            accentColor="#007AFF"
          />
          <Link href="/services" className="btn-outline-electric shrink-0 self-start lg:self-auto">
            All Services <ArrowRight size={14} />
          </Link>
        </div>

        {/* Dynamic Accordion Hover Layout */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[480px] w-full mt-8 overflow-hidden">
          {services.map((s, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={s.id}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setSelectedService(s)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 flex flex-col justify-end p-5 select-none border border-white/5 ${
                  isActive ? "flex-[4.5] lg:flex-[5] min-h-[300px] lg:min-h-0" : "flex-[1] lg:flex-[0.8] min-h-[60px] lg:min-h-0"
                }`}
                layout
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ 
                    backgroundImage: `url(${s.image})`,
                    transform: isActive ? "scale(1.05)" : "scale(1)"
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                  isActive 
                    ? "from-black via-black/60 to-transparent opacity-95" 
                    : "from-black/90 via-black/80 to-black/40 opacity-80"
                }`} />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full justify-end w-full overflow-hidden">
                  
                  {/* Collapsed State: Icon & Short Title */}
                  {!isActive && (
                    <div className="flex lg:flex-col items-center justify-between h-full w-full py-1 lg:py-4">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                        <ChevronDown size={14} className="text-white -rotate-90 lg:rotate-0" />
                      </div>
                      
                      {/* Mobile Title (Horizontal) */}
                      <h3 className="lg:hidden font-display font-bold text-white text-sm tracking-wider uppercase whitespace-nowrap ml-4">
                        {s.shortTitle || s.title}
                      </h3>

                      {/* Desktop Title (Vertical) */}
                      <h3 
                        className="hidden lg:block font-display font-bold text-white text-base tracking-wider uppercase whitespace-nowrap"
                        style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
                      >
                        {s.shortTitle || s.title}
                      </h3>
                    </div>
                  )}

                  {/* Expanded State Content */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-4"
                    >
                      <h3 className="font-display font-black text-[#007AFF] text-3xl uppercase tracking-wide">
                        {s.title}
                      </h3>
                      <p className="text-white/70 text-sm max-w-xl leading-relaxed">
                        {s.description}
                      </p>
                      
                      {/* Features/Tags list */}
                      <div className="flex flex-wrap gap-2">
                        {s.features.slice(0, 3).map((f) => (
                          <span key={f} className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 bg-white/10 text-white rounded-full border border-white/10 backdrop-blur-md">
                            {f}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center gap-2 text-[#007AFF] font-bold text-sm hover:text-white transition-colors">
                        <span>Explore</span>
                        <ArrowRight size={14} />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal Popup */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl z-10 bg-[#09090b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-50 p-2.5 bg-black/60 hover:bg-[#007AFF] text-white hover:text-black rounded-full transition-all duration-300 border border-white/20 hover:border-[#007AFF] flex items-center justify-center group"
              >
                <X size={18} className="transition-transform group-hover:rotate-90" />
              </button>

              {/* Service Image / Preview Column */}
              <div className="relative w-full md:w-1/2 h-48 md:h-auto min-h-[200px] md:min-h-[400px] bg-cover bg-center">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedService.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#09090b] via-[#09090b]/40 to-transparent" />
                
                {/* Visual Accent */}
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-[#007AFF] text-xs font-semibold tracking-[0.3em] uppercase">Core Service Detail</span>
                  <h4 className="font-display font-black text-white text-2xl uppercase mt-1">{selectedService.shortTitle || selectedService.title}</h4>
                </div>
              </div>

              {/* Info Column */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[calc(90vh-200px)] md:max-h-[85vh]">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-black text-white text-2xl md:text-3xl uppercase tracking-wide leading-tight mb-3">
                      {selectedService.title}
                    </h3>
                    <div className="w-12 h-1 bg-[#007AFF] rounded shadow-[0_0_8px_#007AFF]" />
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed">
                    {selectedService.longDescription || selectedService.description}
                  </p>

                  <div>
                    <h4 className="font-display font-bold text-white text-xs uppercase tracking-[0.2em] mb-4 text-[#007AFF]">Key Technical Features</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-white/70 text-xs">
                          <CheckCircle size={14} className="text-[#007AFF] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-3 mt-6">
                  <Link 
                    href="/contact" 
                    onClick={() => setSelectedService(null)} 
                    className="btn-electric flex-1 justify-center"
                  >
                    Get a Quote
                  </Link>
                  <button 
                    onClick={() => setSelectedService(null)} 
                    className="btn-outline-electric flex-1 justify-center"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── PROJECTS ──────────────────────────────────────────────────
function ProjectsSection() {
  return (
    <section className="relative section-pad overflow-hidden bg-slate-50">
      <AnimatedBackgroundLight />
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-5"
        style={{ background: "radial-gradient(circle, rgba(0, 122, 255,0.5) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="Our Portfolio"
            title="Featured Projects"
            subtitle="Landmark sports infrastructure delivered across India."
            className="mb-0"
            theme="light"
          />
          <Link href="/projects" className="btn-outline-electric shrink-0 self-start lg:self-auto">
            All Projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.slice(0, 6).map((p, i) => <ProjectCard key={p.id} {...p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ── WHY US ────────────────────────────────────────────────────
function WhyUsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative section-pad overflow-hidden" style={{ background: "#09090b" }}>
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="lg:col-span-4"
          >
            <SectionHeading
              eyebrow="Why ACE"
              title="The ACE Advantage"
              subtitle="Six reasons why India's leading organizations trust us for their most important projects."
              accentColor="#007AFF"
            />
            <Link href="/about" className="btn-outline-electric">
              Learn More <ArrowUpRight size={13} />
            </Link>

            <div className="mt-12 relative hidden lg:block group">
              {/* Premium Glow and Neon Decors */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#007AFF]/25 to-[#BF5AF2]/15 rounded-2xl blur-lg pointer-events-none group-hover:opacity-80 transition-opacity" />
              <div className="absolute top-10 -right-6 w-16 h-16 border-2 border-[#007AFF]/30 rounded-full opacity-40 pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-[#BF5AF2]/20 rounded-full opacity-20 pointer-events-none" />

              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl z-10">
                <div className="absolute inset-0 bg-[#09090b]/40 z-10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                <img src="/services/stadium.png" alt="ACE Advantage" className="w-full h-64 object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 border border-[#007AFF]/20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#09090b] to-transparent z-20 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyChooseUs.map((item, i) => {
              const Icon = iconMap[item.icon] || CheckCircle;
              const colors = ["#007AFF", "#007AFF", "#007AFF", "#BF5AF2", "#FF3B5C", "#007AFF"];
              const c = colors[i % colors.length];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  whileHover={{ scale: 1.02, borderColor: `${c}60`, boxShadow: `0 10px 30px -10px ${c}25`, background: `${c}05` }}
                  className="glass p-6 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${c}15`, border: `1px solid ${c}30` }}>
                    <Icon size={18} style={{ color: c }} />
                  </div>
                  <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-2">{item.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ───────────────────────────────────────────────────
function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative section-pad overflow-hidden bg-white">
      <AnimatedBackgroundLight />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeading eyebrow="How We Work" title="Our Delivery Process" subtitle="A structured, transparent approach from brief to handover." align="center" theme="light" />

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0, 122, 255,0.2), transparent)" }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {processSteps.map((step, i) => {
              const colors = ["#007AFF", "#007AFF", "#007AFF", "#BF5AF2", "#FF3B5C", "#007AFF"];
              const bgImages = [
                "/services/tech.png",
                "/services/stadium.png",
                "/services/multisport.png",
                "/services/turf.png",
                "/services/track.png",
                "/services/courts.png"
              ];
              const c = colors[i % colors.length];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ borderColor: `${c}40` }}
                  className="glass-light p-6 relative transition-all duration-300 group overflow-hidden"
                >
                  {/* Background Image Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-100 pointer-events-none"
                    style={{ backgroundImage: `url(${bgImages[i % bgImages.length]})` }}
                  />
                  {/* Dark Gradient Overlay to make text readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-[#09090b]/40 pointer-events-none" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end">
                    <div
                      className="w-10 h-10 flex items-center justify-center font-display font-bold text-sm mb-5 transition-all duration-300 group-hover:scale-110 bg-[#09090b]"
                      style={{ border: `1px solid ${c}40`, color: c, boxShadow: `0 0 15px ${c}20` }}
                    >
                      {step.step}
                    </div>
                    <h3 className="font-display font-bold text-white text-lg uppercase tracking-wide mb-2" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>{step.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>{step.description}</p>
                  </div>
                  {/* Bottom glow on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── INDUSTRIES ────────────────────────────────────────────────
function IndustriesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-16 overflow-hidden" style={{ background: "#09090b", borderTop: "1px solid rgba(0, 122, 255,0.08)", borderBottom: "1px solid rgba(0, 122, 255,0.08)" }}>
      <AnimatedBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="lg:w-64 shrink-0"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px" style={{ background: "#007AFF", boxShadow: "0 0 6px #007AFF" }} />
              <span className="text-[#007AFF] text-xs tracking-[0.3em] uppercase font-semibold font-display">Sectors</span>
            </div>
            <h3 className="font-display font-bold text-white text-3xl uppercase">Industries<br />We Serve</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {industries.map((ind, i) => (
              <motion.span
                key={ind}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ borderColor: "rgba(0, 122, 255,0.5)", color: "#007AFF", background: "rgba(0, 122, 255,0.05)" }}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs text-white/50 font-semibold tracking-wide uppercase transition-all duration-200 cursor-default"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Zap size={10} className="text-[#007AFF] opacity-50" />
                {ind}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── STATS ─────────────────────────────────────────────────────
function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const statConfigs = [
    { ...stats[0], color: "#007AFF", icon: TrendingUp },
    { ...stats[1], color: "#007AFF", icon: MapPin },
    { ...stats[2], color: "#007AFF", icon: BarChart3 },
    { ...stats[3], color: "#BF5AF2", icon: Award },
  ];

  return (
    <section ref={ref} className="relative section-pad overflow-hidden bg-slate-50 border-y border-slate-200">
      <AnimatedBackgroundLight />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeading 
          eyebrow="By the Numbers" 
          title="Proven at Scale" 
          subtitle="A decade of delivering sports infrastructure across India." 
          align="center" 
          theme="light"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statConfigs.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: `${stat.color}60`, boxShadow: `0 15px 30px -10px ${stat.color}25` }}
                className="glass-light p-8 text-center relative overflow-hidden group transition-all duration-300 border border-slate-200"
              >
                {/* Background number */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] font-display font-bold text-[120px] leading-none select-none" style={{ color: stat.color }}>
                  {stat.value.replace(/[^0-9]/g, "")}
                </div>
                <div className="relative z-10">
                  <div className="w-10 h-10 flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                    <Icon size={18} style={{ color: stat.color }} />
                  </div>
                  <div className="font-display font-bold leading-none mb-2 text-5xl" style={{ color: stat.color }}>
                    {inView ? <Counter value={stat.value} /> : "0"}
                  </div>
                  <p className="text-slate-500 text-xs tracking-[0.2em] uppercase font-semibold">{stat.label}</p>
                </div>
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`, boxShadow: `0 0 8px ${stat.color}` }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative section-pad overflow-hidden" style={{ background: "#09090b" }}>
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading
              eyebrow="Client Testimonials"
              title="What Our Clients Say"
              subtitle="Trusted by government bodies, private academies, and sports organizations across India."
              accentColor="#007AFF"
            />
            <div className="flex gap-4">
              {["FIFA", "IAAF", "FIBA", "ITF"].map(cert => (
                <span key={cert} className="text-[10px] font-display font-bold tracking-widest px-2.5 py-1.5 border border-[rgba(0, 122, 255,0.2)] text-[#007AFF]/60">
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <TestimonialsSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
