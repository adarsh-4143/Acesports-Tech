"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  accentColor?: string;
  theme?: "dark" | "light";
}

export default function SectionHeading({
  eyebrow, title, subtitle, align = "left", className, accentColor = "#39FF14", theme = "dark"
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-14", align === "center" && "text-center", className)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, x: align === "center" ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn("flex items-center gap-3 mb-4", align === "center" && "justify-center")}
        >
          <div className="w-8 h-px" style={{ background: theme === "dark" ? accentColor : "#0B1F3A", boxShadow: theme === "dark" ? `0 0 8px ${accentColor}` : "none" }} />
          <span
            className="text-xs font-display font-semibold tracking-[0.3em] uppercase"
            style={{ color: theme === "dark" ? accentColor : "#0B1F3A" }}
          >
            {eyebrow}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={cn("font-display font-bold uppercase leading-tight mb-4",
          theme === "dark" ? "text-white" : "text-slate-900",
          "text-3xl sm:text-4xl lg:text-5xl"
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn("text-base leading-relaxed",
            theme === "dark" ? "text-white/50" : "text-slate-600",
            align === "center" && "max-w-2xl mx-auto",
            align === "left" && "max-w-xl"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
