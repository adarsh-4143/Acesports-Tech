"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  gallery: {
    id: string;
    title: string;
    description: string;
    category: string;
    images: string[];
  };
}

export default function Lightbox({ gallery }: LightboxProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = gallery.images;
  const currentImage = images[currentIndex];

  const goNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const close = () => {
    router.replace(`?`, { scroll: false });
  };

  useEffect(() => {
    // Prevent background scrolling when lightbox is open
    document.body.style.overflow = "hidden";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, images.length]);

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col lg:flex-row bg-[#030812]/95 backdrop-blur-2xl"
      >
        {/* Close Button - Global */}
        <button
          onClick={(e) => { e.stopPropagation(); close(); }}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white/50 hover:text-white bg-black/20 hover:bg-white/10 p-3 rounded-full transition-all z-[110]"
        >
          <X size={28} />
        </button>

        {/* Left Side: Image Viewer */}
        <div 
          className="relative flex-1 flex flex-col items-center justify-center p-4 lg:p-10 h-[60vh] lg:h-full border-b lg:border-b-0 lg:border-r border-white/10"
          onClick={close}
        >
          {images.length > 1 && (
            <button
              onClick={goPrev}
              className="absolute left-2 lg:left-8 text-white/40 hover:text-[#39FF14] hover:scale-110 transition-all z-[110] p-3 lg:p-4 bg-black/40 rounded-full backdrop-blur-md border border-white/10"
            >
              <ChevronLeft size={36} />
            </button>
          )}

          {images.length > 1 && (
            <button
              onClick={goNext}
              className="absolute right-2 lg:right-8 text-white/40 hover:text-[#39FF14] hover:scale-110 transition-all z-[110] p-3 lg:p-4 bg-black/40 rounded-full backdrop-blur-md border border-white/10"
            >
              <ChevronRight size={36} />
            </button>
          )}

          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              key={currentImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              src={currentImage}
              alt={gallery.title}
              className="max-w-full max-h-full object-contain drop-shadow-2xl"
            />
            
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-white/70 text-xs font-mono tracking-widest">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Details Panel */}
        <div 
          className="w-full lg:w-[400px] xl:w-[450px] shrink-0 bg-gradient-to-b from-[#060f1e] to-[#030812] p-8 lg:p-12 flex flex-col justify-center h-[40vh] lg:h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="inline-block px-3 py-1 bg-[#39FF14]/10 border border-[#39FF14]/20 text-[#39FF14] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-6">
              {gallery.category}
            </p>
            <h3 className="text-3xl lg:text-4xl font-display font-extrabold text-white mb-6 leading-tight">
              {gallery.title}
            </h3>
            <div className="h-px w-12 bg-white/20 mb-6" />
            <p className="text-white/80 text-base lg:text-lg leading-relaxed font-medium">
              {gallery.description}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
