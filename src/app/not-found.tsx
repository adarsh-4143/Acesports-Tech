"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden" style={{ background: "#060f1e" }}>
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(57,255,20,0.5) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-display font-bold text-[160px] leading-none select-none mb-4"
            style={{ color: "rgba(57,255,20,0.08)", textShadow: "0 0 80px rgba(57,255,20,0.1)" }}>
            404
          </div>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: "#39FF14", boxShadow: "0 0 8px #39FF14" }} />
            <span className="text-[#39FF14] text-xs tracking-[0.3em] uppercase font-display font-semibold">Page Not Found</span>
            <div className="w-8 h-px" style={{ background: "#39FF14", boxShadow: "0 0 8px #39FF14" }} />
          </div>
          <h1 className="font-display font-bold text-white text-4xl uppercase mb-4">Out of Bounds</h1>
          <p className="text-white/45 mb-10 max-w-sm mx-auto">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link href="/" className="btn-electric">
            <Zap size={14} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
