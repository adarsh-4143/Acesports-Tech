"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Building2, Zap, Layers, Grid3X3, Trophy, Cpu, Award } from "lucide-react";
import { useRef } from "react";

const iconMap: Record<string, React.ElementType> = {
  Stadium: Building2, Zap, Layers, Grid3x3: Grid3X3,
  Building2, Trophy, Cpu, Award,
};

const accentColors: Record<number, { from: string; to: string; glow: string }> = {
  0: { from: "#39FF14", to: "#00CC44", glow: "rgba(57,255,20,0.3)" },
  1: { from: "#39FF14", to: "#00CC44", glow: "rgba(57,255,20,0.25)" },
  2: { from: "#39FF14", to: "#00CC44", glow: "rgba(57,255,20,0.25)" },
  3: { from: "#BF5AF2", to: "#8833EE", glow: "rgba(191,90,242,0.25)" },
  4: { from: "#39FF14", to: "#39FF14", glow: "rgba(57,255,20,0.25)" },
  5: { from: "#FF3B5C", to: "#CC0033", glow: "rgba(255,59,92,0.25)" },
  6: { from: "#39FF14", to: "#39FF14", glow: "rgba(57,255,20,0.25)" },
};

interface ServiceCardProps {
  id: string; title: string; description: string; icon: string; index?: number; variant?: "default" | "compact"; image?: string;
}

export default function ServiceCard({ id, title, description, icon, index = 0, variant = "default", image }: ServiceCardProps) {
  const Icon = iconMap[icon] || Building2;
  const accent = accentColors[index % 7];
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="group relative cursor-pointer"
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${accent.glow}, transparent 70%)`, filter: "blur(20px)" }}
      />

      <div
        className="relative h-full border overflow-hidden transition-all duration-500 group-hover:border-opacity-60 bg-slate-900"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Background Image Layer */}
        {image && (
          <div className="absolute inset-0 z-0">
            <img src={image} alt={title} className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-slate-900/70" />
          </div>
        )}
        {/* Animated top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${accent.from}, ${accent.to}, transparent)`, boxShadow: `0 0 10px ${accent.glow}` }}
        />

        {/* Background gradient sweep */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, ${accent.glow} 0%, transparent 60%)` }}
        />

        <div className="relative z-10 p-7">
          {/* Icon */}
          <div className="mb-5">
            <motion.div
              className="w-12 h-12 flex items-center justify-center relative"
              style={{ background: `linear-gradient(135deg, ${accent.from}20, ${accent.to}10)`, border: `1px solid ${accent.from}30` }}
              whileHover={{ scale: 1.1 }}
            >
              <Icon size={20} style={{ color: accent.from }} />
              {/* Pulse ring */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `0 0 15px ${accent.glow}` }}
              />
            </motion.div>
          </div>

          {/* Number */}
          <div className="font-display text-5xl font-bold opacity-5 absolute top-4 right-5 leading-none select-none">
            {String(index + 1).padStart(2, "0")}
          </div>

          <h3 className="font-display font-bold text-white text-lg uppercase tracking-wide mb-3 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-white/45 text-sm leading-relaxed mb-6">
            {description}
          </p>

          <Link
            href={`/services#${id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300"
            style={{ color: accent.from }}
          >
            Explore Service
            <motion.span whileHover={{ x: 3 }}>
              <ArrowUpRight size={12} />
            </motion.span>
          </Link>
        </div>

        {/* Bottom accent bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
          style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`, boxShadow: `0 0 8px ${accent.glow}` }}
        />
      </div>
    </motion.div>
  );
}
