"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Zap } from "lucide-react";

const slides = [
  {
    image: "/slide1.png",
    title: "Engineering India's Sporting Future",
    subtitle: "Designing and delivering world-class sports infrastructure across 18+ states."
  },
  {
    image: "/slide2.png",
    title: "Premium Multi-Sports Surfaces",
    subtitle: "Durable, all-weather outdoor courts for schools, parks, and academies."
  },
  {
    image: "/slide3.png",
    title: "Professional Synthetic Tracks",
    subtitle: "IAAF standard athletic tracks built for champions across India."
  }
];

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

export default function HomeHeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-900">
      {/* Background Images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105"
            style={{ backgroundImage: `url(${slides[active].image})` }}
          />
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-slate-900/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content Box */}
      <div className="absolute top-0 left-0 w-full h-full max-w-7xl mx-auto px-5 lg:px-10 pointer-events-none flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pointer-events-auto max-w-2xl mt-10 ml-16 lg:ml-24"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px" style={{ background: "#39FF14", boxShadow: "0 0 8px #39FF14" }} />
              <span className="sport-badge bg-[rgba(57,255,20,0.1)] text-[#39FF14] border border-[rgba(57,255,20,0.3)]">
                ACE Sports Tech
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-white text-5xl md:text-6xl lg:text-7xl uppercase leading-[1.05] mb-6 drop-shadow-2xl" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.7)" }}>
              <SplitText text={slides[active].title} delay={0.1} />
            </h1>

            {/* Accent line */}
            <div className="h-1 w-24 mb-6 rounded" style={{ background: "linear-gradient(90deg, #39FF14, #39FF14)", boxShadow: "0 0 20px rgba(57,255,20,0.6)" }} />

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-white/90 text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed font-light drop-shadow-lg max-w-xl"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
            >
              {slides[active].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Link href="/services" className="btn-electric inline-flex items-center gap-2">
                <Zap size={14} />
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-5 lg:left-10 z-20">
        <button
          onClick={prevSlide}
          className="w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-[#39FF14] text-white backdrop-blur-md rounded-full transition-all duration-300 border border-white/20 hover:border-[#39FF14]"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-5 lg:right-10 z-20">
        <button
          onClick={nextSlide}
          className="w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-[#39FF14] text-white backdrop-blur-md rounded-full transition-all duration-300 border border-white/20 hover:border-[#39FF14]"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              active === i ? "bg-[#39FF14] w-8" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
