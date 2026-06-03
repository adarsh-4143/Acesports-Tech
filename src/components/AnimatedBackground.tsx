"use client";

import { motion } from "framer-motion";
import { Trophy, Dumbbell, Medal, Target, Flag, Activity } from "lucide-react";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ background: "#060f1e" }}>
      {/* Animated glowing orbs */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4],
          x: [0, 80, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(57,255,20,0.2) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -70, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(191,90,242,0.15) 0%, transparent 70%)" }}
      />
      
      {/* Animated Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 bg-[#39FF14] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 10px 2px rgba(57,255,20,0.8)"
          }}
          animate={{
            y: [0, -200],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        />
      ))}

      {/* Floating Geometric & Sports Shapes */}
      {Array.from({ length: 15 }).map((_, i) => {
        const shapes = ["circle", "square", "triangle", "cross", "trophy", "dumbbell", "medal", "target", "flag"];
        const shape = shapes[i % shapes.length];
        const size = 30 + Math.random() * 30;
        
        return (
          <motion.div
            key={`shape-${i}`}
            className="absolute opacity-20 pointer-events-none flex items-center justify-center"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: size,
              height: size,
            }}
            animate={{
              y: [0, -(50 + Math.random() * 100), 0],
              x: [0, (Math.random() - 0.5) * 100, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {shape === "circle" && (
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#39FF14] stroke-[3px] fill-none">
                <circle cx="50" cy="50" r="45" />
              </svg>
            )}
            {shape === "square" && (
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#BF5AF2] stroke-[3px] fill-none">
                <rect x="15" y="15" width="70" height="70" />
              </svg>
            )}
            {shape === "triangle" && (
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#39FF14] stroke-[3px] fill-none">
                <polygon points="50,15 90,85 10,85" />
              </svg>
            )}
            {shape === "cross" && (
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#BF5AF2] stroke-[4px] fill-none stroke-linecap-round">
                <line x1="50" y1="25" x2="50" y2="75" />
                <line x1="25" y1="50" x2="75" y2="50" />
              </svg>
            )}
            {shape === "trophy" && <Trophy size={size} color="#39FF14" strokeWidth={1.5} />}
            {shape === "dumbbell" && <Dumbbell size={size} color="#BF5AF2" strokeWidth={1.5} />}
            {shape === "medal" && <Medal size={size} color="#39FF14" strokeWidth={1.5} />}
            {shape === "target" && <Target size={size} color="#BF5AF2" strokeWidth={1.5} />}
            {shape === "flag" && <Flag size={size} color="#39FF14" strokeWidth={1.5} />}
          </motion.div>
        );
      })}

      {/* Dynamic Wave SVG Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen" preserveAspectRatio="none" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M-200 400 Q 200 200 600 400 T 1400 400 T 2200 400"
          fill="none"
          stroke="#39FF14"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M-200 500 Q 200 300 600 500 T 1400 500 T 2200 500"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M-200 600 Q 200 400 600 600 T 1400 600 T 2200 600"
          fill="none"
          stroke="#BF5AF2"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>

      {/* Premium Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
    </div>
  );
}
