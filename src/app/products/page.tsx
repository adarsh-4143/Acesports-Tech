"use client";

import React, { useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import { products } from "@/lib/data";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ShoppingCart, Filter, CheckCircle2, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const accentColors = ["#39FF14","#39FF14","#39FF14","#BF5AF2","#FF3B5C","#39FF14"];
const categories = ["All", "Running Track", "Artificial Turf", "Court Surface", "Sports Lighting", "Technology", "Safety Systems"];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();
  const { isLoggedIn, login } = useAuth();
  
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleBuyNow = (product: any) => {
    if (!isLoggedIn) {
      // For demo purposes, we will auto-login or alert if not logged in.
      // E-commerce often allows adding to cart without login, so we will just add it.
    }
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image
    });
  };

  return (
    <>
      <Hero
        variant="page"
        eyebrow="Products & Materials"
        headline="Premium Sports Infrastructure Products"
        subheadline="Certified high-performance surfaces, lighting and technology products — all with professional installation."
        ctaPrimary={{ label: "View Catalog", href: "#catalog" }}
        imageSrc="/services/turf.png"
      />

      <section id="catalog" className="relative section-pad overflow-hidden bg-slate-50">
        <AnimatedBackgroundLight />
        <div className="absolute inset-0 grid-pattern-light opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <SectionHeading eyebrow="Our Products" title="E-Commerce Catalog" subtitle="Globally certified materials ready to be deployed for your projects." theme="light" />
          
          <div className="flex flex-col lg:flex-row gap-10 mt-10">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-white border border-slate-200 p-6 shadow-sm sticky top-24">
                <div className="flex items-center gap-2 mb-6 text-slate-800 font-display font-bold uppercase tracking-wide border-b border-slate-100 pb-4">
                  <Filter size={18} /> Filters
                </div>
                
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Categories</h4>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button 
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                          selectedCategory === cat 
                          ? "bg-slate-900 text-[#39FF14] font-medium" 
                          : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {cat}
                        {selectedCategory === cat && <CheckCircle2 size={14} />}
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 bg-slate-50 border border-slate-200 p-5 text-center">
                  <div className="w-10 h-10 bg-[#39FF14]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap size={18} className="text-[#00CC44]" />
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wide mb-2">Need Custom Infrastructure?</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">Our specialists can help you design and deploy a complete solution.</p>
                  <Link href="/contact" className="inline-block px-4 py-2 bg-slate-900 text-[#39FF14] text-xs font-bold uppercase tracking-wider hover:bg-[#39FF14] hover:text-black transition-colors w-full">
                    Contact Us
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Product Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> products</p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white border border-slate-200 p-10 text-center text-slate-500">
                  No products found in this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, i) => {
                    const color = accentColors[i % accentColors.length];
                    return (
                      <div key={product.id}
                        className="bg-slate-900 border border-slate-800 group relative flex flex-col overflow-hidden transition-all duration-300 hover:[border-color:var(--hover-color)] hover:[box-shadow:var(--hover-shadow)]"
                        style={{ "--hover-color": `${color}30`, "--hover-shadow": `0 20px 60px ${color}15` } as React.CSSProperties}
                      >
                        {/* Visual header */}
                        <div className="h-48 relative overflow-hidden group/image" style={{ background: `linear-gradient(135deg, ${color}15 0%, rgba(6,15,30,0.8) 100%)` }}>
                          <div className="absolute inset-0 bg-[#060f1e]/40 z-10 mix-blend-multiply" />
                          {/* The image */}
                          {product.image && (
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110 opacity-70"
                            />
                          )}
                          <div className="absolute inset-0 grid-pattern opacity-30 z-20 pointer-events-none" />
                          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 8px ${color}` }} />
                          <div className="absolute top-3 left-3 z-30">
                            <span className="sport-badge" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>{product.category}</span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="font-display font-bold text-white text-lg uppercase tracking-wide mb-2">{product.name}</h3>
                          <p className="text-white/45 text-sm leading-relaxed mb-4 flex-grow">{product.description}</p>
                          <ul className="space-y-2 mb-6">
                            {product.specs.map(spec => (
                              <li key={spec} className="flex items-center gap-2 text-xs text-white/40">
                                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
                                {spec}
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                            <span className="text-white text-sm font-mono font-medium">{product.price}</span>
                            <button
                              onClick={() => handleBuyNow(product)}
                              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-display font-bold tracking-[0.1em] uppercase transition-all duration-300 bg-white text-slate-900 hover:bg-[#39FF14] hover:text-black"
                            >
                              <ShoppingCart size={14} />
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why our products */}
      <section className="relative section-pad overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #060f1e 100%)" }}>
        <AnimatedBackground />
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div className="neon-line absolute top-0 left-0 right-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <SectionHeading eyebrow="Why Our Products" title="Certified Materials, Expert Installation" subtitle="Every product sourced from internationally certified manufacturers and installed by trained specialists." align="center" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
            {[
              { title: "Globally Certified", desc: "FIFA, IAAF, FIBA, ITF certification as applicable.", color: "#39FF14" },
              { title: "Warranty Backed", desc: "Manufacturer warranties and our installation guarantee.", color: "#39FF14" },
              { title: "Expert Installation", desc: "Supplied and installed by our trained technical teams.", color: "#39FF14" },
              { title: "Ongoing Support", desc: "Post-installation maintenance and on-call technical support.", color: "#BF5AF2" },
            ].map((item) => (
              <div key={item.title} className="p-8 text-center group" style={{ background: "#060f1e" }}>
                <div className="w-2 h-2 rounded-full mx-auto mb-5" style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }} />
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-2">{item.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Need a Product Catalogue?"
        subtitle="Contact us for full catalogue, technical specs and pricing for your project."
        ctaLabel="Request Catalogue"
        ctaHref="/contact"
        secondaryLabel="Our Services"
        secondaryHref="/services"
      />
    </>
  );
}
