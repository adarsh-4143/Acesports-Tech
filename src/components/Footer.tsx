"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUpRight, Zap, ChevronRight } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Projects", href: "/projects" },
    { label: "Careers", href: "/contact" },
  ],
  Services: [
    { label: "Stadium Development", href: "/services#stadium-development" },
    { label: "Synthetic Tracks", href: "/services#synthetic-tracks" },
    { label: "Artificial Turf", href: "/services#artificial-turf" },
    { label: "Sports Courts", href: "/services#sports-courts" },
    { label: "Technology Solutions", href: "/services#sports-technology" },
  ],
  Products: [
    { label: "Track Systems", href: "/products" },
    { label: "Artificial Turf", href: "/products" },
    { label: "Court Surfaces", href: "/products" },
    { label: "Sports Lighting", href: "/products" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#09090b" }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Top neon line */}
      <div className="neon-line w-full" />

      {/* CTA Strip */}
      <div className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px" style={{ background: "#007AFF", boxShadow: "0 0 8px #007AFF" }} />
                <span className="text-[#007AFF] text-xs tracking-[0.3em] uppercase font-semibold">Ready to Build?</span>
              </div>
              <h3 className="font-display text-4xl lg:text-5xl font-bold text-white uppercase leading-tight">
                Transform Your <span className="gradient-text-electric">Space</span>
              </h3>
              <p className="text-white/40 text-sm mt-2 max-w-md">
                Let&apos;s engineer your next world-class sporting destination.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/contact" className="btn-electric">
                <Zap size={14} />
                Start a Project
              </Link>
              <Link href="/projects" className="btn-outline-electric">
                View Our Work
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block group mb-4">
              <div className="relative bg-white/95 backdrop-blur-md p-2.5 rounded-xl inline-flex shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform duration-300 group-hover:scale-105">
                <img src="/logo.svg" alt="ACE Sports Tech" className="h-[40px] lg:h-[50px] w-auto object-contain relative z-10" />
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "radial-gradient(circle, rgba(0, 122, 255,0.15) 0%, transparent 70%)" }} />
              </div>
            </Link>

            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-xs">
              Engineering high-performance sports environments. Transforming spaces into world-class sporting destinations across India.
            </p>

            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[#007AFF] mt-0.5 shrink-0" />
                <p className="text-white/40 text-xs leading-relaxed">J39 Centre Portion, West Patel Nagar,<br />New Delhi – 110008</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-[#007AFF] mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:7368040888" className="text-white/40 text-xs hover:text-[#007AFF] transition-colors">+91 73680 40888</a>
                  <a href="tel:9818933156" className="text-white/40 text-xs hover:text-[#007AFF] transition-colors">+91 98189 33156</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={14} className="text-[#007AFF] mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:enquire.acesports@gmail.com" className="text-white/40 text-xs hover:text-[#007AFF] transition-colors">enquire.acesports@gmail.com</a>
                  <a href="mailto:info@acesportstech.com" className="text-white/40 text-xs hover:text-[#007AFF] transition-colors">info@acesportstech.com</a>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["FIFA", "IAAF", "FIBA", "ITF"].map((cert) => (
                <span key={cert} className="text-[10px] font-display font-semibold tracking-widest px-2.5 py-1 border border-[rgba(0, 122, 255,0.2)] text-[#007AFF]/60">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Links and Giant Text Area */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-14 mb-10 lg:mb-10">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <p className="font-display text-white text-xs font-semibold tracking-[0.25em] uppercase mb-5">
                    {category}
                  </p>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href}
                          className="flex items-center gap-1.5 text-white/35 text-xs hover:text-[#007AFF] transition-colors duration-200 group"
                        >
                          <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#007AFF]" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Giant Colorful Background Text */}
            <div className="mt-auto pt-6 border-t border-white/5 w-full overflow-hidden flex items-end">
              <h2 
                className="font-display font-black uppercase w-full leading-[0.8] tracking-tighter"
                style={{ 
                  fontSize: "clamp(3rem, 8vw, 9rem)",
                  background: "linear-gradient(90deg, #007AFF 0%, #007AFF 50%, #ff3b5c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.15
                }}
              >
                ACESPORTS TECH
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs tracking-wide text-center sm:text-left">
            &copy; {new Date().getFullYear()} ACE Sports Tech Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-white/40 text-xs text-center sm:text-right">
            Designed and Developed by{" "}
            <a href="https://nighwantech.com" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:text-white transition-colors">
              Nighwan Technology
            </a>
          </p>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-1 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0, 122, 255,0.3), transparent)" }} />
    </footer>
  );
}
