"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, ChevronDown, Zap } from "lucide-react";

interface HeroProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  variant?: "home" | "page";
  videoSrc?: string;
  imageSrc?: string;
}

// Animated split text
function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + wi * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Particle canvas
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let raf: number;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.3,
      color: Math.random() > 0.6 ? "#007AFF" : Math.random() > 0.5 ? "#007AFF" : "#ffffff",
      opacity: Math.random() * 0.6 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        // Lines
        particles.slice(i + 1).forEach(q => {
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "#007AFF";
            ctx.globalAlpha = (1 - d / 120) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

// Light streak effect
function LightStreaks() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[
        { top: "20%", left: "-10%", w: "60%", r: "-20deg", color: "rgba(0, 122, 255,0.06)" },
        { top: "60%", left: "40%", w: "50%", r: "15deg", color: "rgba(0, 122, 255,0.04)" },
        { top: "10%", left: "60%", w: "40%", r: "30deg", color: "rgba(0, 122, 255,0.05)" },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute h-px"
          style={{ top: s.top, left: s.left, width: s.w, rotate: s.r, background: s.color,
            boxShadow: `0 0 30px 15px ${s.color}`, filter: "blur(8px)" }}
          animate={{ opacity: [0, 1, 0], scaleX: [0.5, 1.2, 0.5] }}
          transition={{ duration: 4 + i * 2, repeat: Infinity, delay: i * 1.5 }}
        />
      ))}
    </div>
  );
}

export default function Hero({ eyebrow, headline, subheadline, ctaPrimary, ctaSecondary, variant = "page", imageSrc }: HeroProps) {
  const isHome = variant === "home";
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden flex items-center ${isHome ? "min-min-h-[80vh]" : "min-h-[70vh] pt-20"}`}
      style={{ background: "linear-gradient(135deg, #09090b 0%, #0B1F3A 40%, #0a1f3a 70%, #09090b 100%)" }}
    >
      {/* Background layer */}
      {imageSrc && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: `url(${imageSrc})` }} />
          <div className="absolute inset-0 bg-[#09090b]/40 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/90 via-[#09090b]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 to-transparent z-10" />
        </div>
      )}

      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40 z-0" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(0, 122, 255,0.3) 0%, transparent 70%)" }}
        />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(0, 122, 255,0.4) 0%, transparent 70%)" }}
        />
      </div>

      {/* Particles */}
      <ParticleField />

      {/* Light streaks */}
      <LightStreaks />

      {/* Scanlines */}
      <div className="scanlines absolute inset-0 pointer-events-none" />

      {/* Content */}
      <motion.div style={isHome ? { y } : undefined} className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-10 py-14">
        {/* Eyebrow */}
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.div
              className="w-10 h-px bg-[#007AFF]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ transformOrigin: "left", boxShadow: "0 0 8px #007AFF" }}
            />
            <span className="sport-badge bg-[rgba(0, 122, 255,0.1)] text-[#007AFF] border border-[rgba(0, 122, 255,0.3)]">
              {eyebrow}
            </span>
          </motion.div>
        )}

        {/* Headline */}
        <h1 className={`font-display font-bold text-white leading-[0.95] mb-6 uppercase ${isHome ? "text-6xl sm:text-7xl lg:text-8xl xl:text-[100px]" : "text-5xl sm:text-6xl lg:text-7xl"}`}>
          <SplitText text={headline} delay={0.1} />
        </h1>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-1 w-24 mb-6 rounded"
          style={{
            transformOrigin: "left",
            background: "linear-gradient(90deg, #007AFF, #007AFF)",
            boxShadow: "0 0 20px rgba(0, 122, 255,0.6)",
          }}
        />

        {/* Subheadline */}
        {subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className={`text-white/60 leading-relaxed mb-10 font-light ${isHome ? "text-lg lg:text-xl max-w-xl" : "text-base lg:text-lg max-w-2xl"}`}
          >
            {subheadline}
          </motion.p>
        )}

        {/* CTAs */}
        {(ctaPrimary || ctaSecondary) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-wrap gap-4 items-center"
          >
            {ctaPrimary && (
              <Link href={ctaPrimary.href} className="btn-electric">
                <Zap size={14} />
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link href={ctaSecondary.href} className="btn-outline-electric">
                {ctaSecondary.label}
                <ArrowRight size={14} />
              </Link>
            )}
          </motion.div>
        )}

        {/* Stats strip — home only */}
        {isHome && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px max-w-2xl"
          >
            {[
              { v: "150+", l: "Projects" },
              { v: "18+", l: "States" },
              { v: "2.5M+", l: "Sq Metres" },
              { v: "10+", l: "Years" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                className="glass px-5 py-4"
                whileHover={{ borderColor: "rgba(0, 122, 255,0.4)", background: "rgba(0, 122, 255,0.05)" }}
              >
                <div className="font-display text-3xl font-bold gradient-text-electric leading-none mb-1">{s.v}</div>
                <div className="text-white/40 text-xs tracking-widest uppercase">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Bottom scroll indicator */}
      {isHome && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white/30 text-xs tracking-[0.25em] uppercase">Scroll</span>
          <ChevronDown size={16} className="text-[#007AFF]" style={{ filter: "drop-shadow(0 0 6px #007AFF)" }} />
        </motion.div>
      )}

      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-20">
        <svg viewBox="0 0 200 200" fill="none">
          <motion.path d="M200,0 L200,200 L0,200" stroke="#007AFF" strokeWidth="0.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }} />
          <motion.path d="M200,50 L200,200 L50,200" stroke="#007AFF" strokeWidth="0.3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.3 }} />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none opacity-20">
        <svg viewBox="0 0 200 200" fill="none">
          <motion.path d="M0,200 L0,0 L200,0" stroke="#007AFF" strokeWidth="0.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
        </svg>
      </div>
    </section>
  );
}
