"use client";

import { motion } from "framer-motion";
import React, { memo } from "react";

const AnimatedBackgroundLight = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-slate-50">
      {/* Aurora Glow 1 — top right, teal */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/3 -right-1/4 w-[900px] h-[900px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, #007AFF 0%, transparent 65%)" }}
      />
      {/* Aurora Glow 2 — bottom left, navy */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute -bottom-1/3 -left-1/4 w-[700px] h-[700px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, #0B1F3A 0%, transparent 65%)" }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,31,58,1) 1px, transparent 1px), linear-gradient(90deg, rgba(11,31,58,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
});

AnimatedBackgroundLight.displayName = "AnimatedBackgroundLight";

export default AnimatedBackgroundLight;
