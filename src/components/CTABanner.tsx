"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

interface CTABannerProps {
  title?: string; subtitle?: string;
  ctaLabel?: string; ctaHref?: string;
  secondaryLabel?: string; secondaryHref?: string;
}

export default function CTABanner({
  title = "Ready to Build?",
  subtitle = "Talk to our experts and get a detailed project proposal within 48 hours.",
  ctaLabel = "Start a Project", ctaHref = "/contact",
  secondaryLabel = "View Our Work", secondaryHref = "/projects",
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden py-24" style={{ background: "linear-gradient(135deg, #060f1e 0%, #0B1F3A 50%, #060f1e 100%)" }}>
      {/* Animated grid */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(57,255,20,0.12) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%)" }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [1, 0.5, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Neon lines top/bottom */}
      <div className="neon-line absolute top-0 left-0 right-0" />
      <div className="neon-line absolute bottom-0 left-0 right-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-12 h-px" style={{ background: "#39FF14", boxShadow: "0 0 8px #39FF14" }} />
            <Zap size={16} className="text-[#39FF14]" />
            <div className="w-12 h-px" style={{ background: "#39FF14", boxShadow: "0 0 8px #39FF14" }} />
          </div>

          <h2 className="font-display font-bold text-white uppercase leading-tight mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            {title.split(" ").map((word, i) =>
              i === 1 ? <span key={i} className="gradient-text-electric"> {word} </span> : word + " "
            )}
          </h2>

          <p className="text-white/50 text-base max-w-lg mx-auto mb-10">{subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ctaHref} className="btn-electric">
              <Zap size={15} />
              {ctaLabel}
            </Link>
            <Link href={secondaryHref} className="btn-outline-electric">
              {secondaryLabel}
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
