"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "@/features/ContactForm";

export default function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // Trigger popup every time the component mounts (on load/refresh)
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500); // 500ms delay for a smooth entrance
    return () => clearTimeout(timer);
  }, []);

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop with strong blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[#060f1e]/80 backdrop-blur-md"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl z-10 rounded-lg shadow-[0_0_50px_rgba(57,255,20,0.15)] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 bg-black/60 hover:bg-[#39FF14] text-white hover:text-black rounded-full transition-all duration-300 border border-white/20 hover:border-[#39FF14] flex items-center justify-center group shadow-xl"
            >
              <X size={18} className="transition-transform group-hover:rotate-90" />
            </button>

            {/* Render the exact same ContactForm */}
            <ContactForm />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
