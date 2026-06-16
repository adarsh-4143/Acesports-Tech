"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/lib/data";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      <Hero
        variant="page"
        eyebrow="Our Portfolio"
        headline="150+ Projects Across India"
        subheadline="Landmark sports infrastructure for government bodies, private academies and sports organizations."
        ctaPrimary={{ label: "Start a Project", href: "/contact" }}
        imageSrc="/services/stadium.png"
      />

      {/* Category filter bar */}
      <section className="sticky top-20 z-30 bg-white border-b border-slate-200 shadow-sm" style={{ backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {["All","Stadium","Synthetic Track","Artificial Turf","Sports Court","Sports Academy","Multi-Sport"].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="shrink-0 px-4 py-2 text-xs font-display font-semibold tracking-[0.12em] uppercase transition-all duration-200 rounded outline-none"
                  style={isActive
                    ? { background: "linear-gradient(135deg, #007AFF, #004eaa)", color: "#09090b", clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }
                    : { border: "1px solid rgba(0,0,0,0.1)", color: "#64748b" }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="relative section-pad overflow-hidden bg-slate-50">
        <AnimatedBackgroundLight />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-5"
          style={{ background: "radial-gradient(ellipse, rgba(0, 122, 255,0.4) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between mb-10">
            <SectionHeading eyebrow="All Projects" title="Our Work" className="mb-0" theme="light" />
            <span className="bg-slate-200 px-4 py-2 text-xs text-slate-600 font-mono rounded">{filteredProjects.length} projects</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((p, i) => <ProjectCard key={p.id} {...p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative py-16 overflow-hidden" style={{ background: "#09090b" }}>
        <AnimatedBackground />
        <div className="neon-line absolute top-0 left-0 right-0" />
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(0, 122, 255,0.05)" }}>
            {[
              { value: "150+", label: "Completed", color: "#007AFF" },
              { value: "18+", label: "States", color: "#007AFF" },
              { value: "2.5M+", label: "Sq Metres", color: "#007AFF" },
              { value: "10+", label: "Years", color: "#BF5AF2" },
            ].map(s => (
              <div key={s.label} className="p-10 text-center" style={{ background: "#09090b" }}>
                <div className="font-display font-bold text-5xl mb-2" style={{ color: s.color, textShadow: `0 0 30px ${s.color}60` }}>{s.value}</div>
                <p className="text-white/35 text-xs tracking-[0.25em] uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="neon-line absolute bottom-0 left-0 right-0" />
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
