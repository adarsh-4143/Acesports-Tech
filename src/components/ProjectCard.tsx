"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Maximize2 } from "lucide-react";

const categoryConfig: Record<string, { color: string; bg: string; gradient: string }> = {
  "Artificial Turf":  { color: "#007AFF", bg: "rgba(0, 122, 255,0.1)",   gradient: "from-[#007AFF]/20 to-transparent" },
  "Synthetic Track":  { color: "#007AFF", bg: "rgba(0, 122, 255,0.1)",   gradient: "from-[#007AFF]/20 to-transparent" },
  "Sports Academy":   { color: "#BF5AF2", bg: "rgba(191,90,242,0.1)", gradient: "from-[#BF5AF2]/20 to-transparent" },
  "Sports Court":     { color: "#007AFF", bg: "rgba(0, 122, 255,0.1)",   gradient: "from-[#007AFF]/20 to-transparent" },
  "Multi-Sport":      { color: "#007AFF", bg: "rgba(0, 122, 255,0.1)",   gradient: "from-[#007AFF]/20 to-transparent" },
  "Stadium":          { color: "#FF3B5C", bg: "rgba(255,59,92,0.1)",   gradient: "from-[#FF3B5C]/20 to-transparent" },
};

interface ProjectCardProps {
  id: string; title: string; location: string; category: string;
  year: string; description: string; area?: string; duration?: string; index?: number; image?: string;
}

export default function ProjectCard({ id, title, location, category, year, description, area, duration, index = 0, image }: ProjectCardProps) {
  const cfg = categoryConfig[category] || { color: "#007AFF", bg: "rgba(0, 122, 255,0.1)", gradient: "from-[#007AFF]/20 to-transparent" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02, 
        borderColor: `${cfg.color}80`, 
        boxShadow: `0 15px 35px -10px ${cfg.color}40` 
      }}
      className="group relative overflow-hidden bg-slate-900 transition-all duration-300"
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${cfg.bg}, transparent 60%)` }}
      />

      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${cfg.color}, transparent)`, boxShadow: `0 0 8px ${cfg.color}40` }} />

      {/* Visual area */}
      <div className="relative h-64 overflow-hidden">
        {image && (
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${cfg.bg} 0%, rgba(6,15,30,0.8) 100%)` }}
        />
        {/* Animated grid */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        {/* Category large text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-7xl font-bold opacity-5 uppercase tracking-wider select-none"
            style={{ color: cfg.color }}
          >
            {category.split(" ")[0]}
          </span>
        </div>
        {/* Corner bracket */}
        <div className="absolute top-3 right-3 w-6 h-6 opacity-40" style={{ color: cfg.color }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12,3 L21,3 L21,12" />
          </svg>
        </div>
        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className="sport-badge text-[10px] font-display font-bold"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40` }}
          >
            {category}
          </span>
        </div>
        {/* Year */}
        <div className="absolute top-3 left-3">
          <span className="text-white/30 text-xs font-mono">{year}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5">
        <h3 className="font-display font-bold text-white text-lg uppercase tracking-wide mb-1 transition-colors leading-tight group-hover:text-[#007AFF]">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 mb-2.5">
          <MapPin size={11} style={{ color: cfg.color }} />
          <span className="text-white/40 text-xs">{location}</span>
        </div>
        <p className="text-white/45 text-xs leading-relaxed mb-4 line-clamp-2">{description}</p>

        {(area || duration) && (
          <div className="flex gap-6 pt-3 border-t border-white/5">
            {area && (
              <div>
                <p className="text-white/25 text-[10px] tracking-widest uppercase mb-0.5">Area</p>
                <p className="text-white text-xs font-semibold font-mono">{area}</p>
              </div>
            )}
            {duration && (
              <div>
                <p className="text-white/25 text-[10px] tracking-widest uppercase mb-0.5">Duration</p>
                <p className="text-white text-xs font-semibold font-mono">{duration}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom border sweep */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${cfg.color}, transparent)`, boxShadow: `0 0 6px ${cfg.color}` }}
      />
    </motion.div>
  );
}
