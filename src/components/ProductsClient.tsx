"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Filter, CheckCircle2, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";

const accentColors = ["#39FF14","#39FF14","#39FF14","#BF5AF2","#FF3B5C","#39FF14"];
const categories = ["All", "Running Track", "Artificial Turf", "Court Surface", "Sports Lighting", "Technology", "Safety Systems"];

interface ProductsClientProps {
  products: any[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();
  
  // Dynamically generate categories list based on the actual products
  const dynamicCategories = ["All", ...Array.from(new Set(products.map(p => p.categoryName || "Uncategorized").filter(Boolean)))];
  
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => (p.categoryName || "Uncategorized") === selectedCategory);

  const handleBuyNow = (e: React.MouseEvent, product: any) => {
    e.preventDefault(); // Prevent navigating to detail page if clicked on Add to Cart
    addToCart({
      id: String(product.productInventoryId),
      name: product.productName,
      category: product.categoryName,
      price: String(product.salePrice),
      image: product.images && product.images[0] ? product.images[0] : null
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 mt-10">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="bg-white border border-slate-200 p-6 shadow-sm sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-slate-800 font-display font-bold uppercase tracking-wide border-b border-slate-100 pb-4">
            <Filter size={18} /> Filters
          </div>
          
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2">
            {dynamicCategories.map((cat) => (
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
                <Link 
                  href={`/products/${product.productInventoryId}`}
                  key={product.productInventoryId}
                  className="bg-slate-900 border border-slate-800 group relative flex flex-col overflow-hidden transition-all duration-300 hover:[border-color:var(--hover-color)] hover:[box-shadow:var(--hover-shadow)]"
                  style={{ "--hover-color": `${color}30`, "--hover-shadow": `0 20px 60px ${color}15` } as React.CSSProperties}
                >
                  {/* Visual header */}
                  <div className="h-48 relative overflow-hidden group/image" style={{ background: `linear-gradient(135deg, ${color}15 0%, rgba(6,15,30,0.8) 100%)` }}>
                    <div className="absolute inset-0 bg-[#060f1e]/40 z-10 mix-blend-multiply" />
                    {/* The image */}
                    {product.images && product.images[0] && (
                      <img 
                        src={product.images[0]} 
                        alt={product.productName} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110 opacity-70"
                      />
                    )}
                    <div className="absolute inset-0 grid-pattern opacity-30 z-20 pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 8px ${color}` }} />
                    <div className="absolute top-3 left-3 z-30">
                      <span className="sport-badge" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>{product.categoryName}</span>
                    </div>
                    <div className="absolute top-3 right-3 z-30">
                      <span className="px-2 py-1 bg-black/60 text-white/80 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md rounded-sm border border-white/10">
                        {product.brandName}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-display font-bold text-white text-lg uppercase tracking-wide mb-1">{product.productName}</h3>
                    <p className="text-[#39FF14]/80 text-xs font-mono uppercase mb-3">{product.modelName}</p>
                    <p className="text-white/45 text-sm leading-relaxed mb-4 flex-grow line-clamp-2">{product.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {product.specifications?.slice(0, 3).map((spec: any, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-white/50">
                          <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
                          <span className="font-semibold text-white/70">{spec.variationTypeName}:</span> {spec.variationName}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-end justify-between pt-4 border-t border-white/10 mt-auto">
                      <div className="flex flex-col">
                        {product.mrp > product.salePrice && (
                          <span className="text-white/40 text-xs line-through mb-0.5 font-mono">₹{Number(product.mrp).toLocaleString()}</span>
                        )}
                        <span className="text-white text-lg font-mono font-bold">₹{Number(product.salePrice).toLocaleString()}</span>
                      </div>
                      <button
                        onClick={(e) => handleBuyNow(e, product)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-display font-bold tracking-[0.1em] uppercase transition-all duration-300 bg-white text-slate-900 hover:bg-[#39FF14] hover:text-black z-20 relative"
                      >
                        <ShoppingCart size={14} />
                        Add
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
