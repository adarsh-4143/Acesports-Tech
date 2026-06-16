"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Shield, Truck, Zap, ChevronRight, ChevronLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductDetailClient({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const router = useRouter();

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-display font-bold text-slate-900 mb-4 uppercase">Product Not Found</h1>
        <p className="text-slate-500 mb-12">The product you are looking for does not exist or has been removed.</p>
        <Link href="/products" className="px-6 py-3 bg-slate-900 text-[#007AFF] font-bold uppercase tracking-widest text-sm hover:bg-[#007AFF] hover:text-black transition-colors">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const mrp = Number(product.mrp) || 0;
  const salePrice = Number(product.salePrice) || mrp || 0;
  const discountPercentage = mrp > 0 ? Math.round(((mrp - salePrice) / mrp) * 100) : 0;

  const handleAddToCart = () => {
    addToCart({
      id: String(product.productInventoryId),
      name: product.productName,
      category: product.categoryName,
      price: String(salePrice),
      image: product.images && product.images[0] ? product.images[0] : null
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
      
      {/* Left Column: Image Gallery */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="relative aspect-square bg-white border border-slate-200 overflow-hidden group">
          {product.images && product.images[activeImageIndex] ? (
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.productName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
              No Image Available
            </div>
          )}
          {/* Navigation Arrows */}
          {product.images && product.images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur border border-slate-200 flex items-center justify-center text-slate-800 hover:bg-[#007AFF] hover:border-[#007AFF] transition-colors opacity-0 group-hover:opacity-100">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur border border-slate-200 flex items-center justify-center text-slate-800 hover:bg-[#007AFF] hover:border-[#007AFF] transition-colors opacity-0 group-hover:opacity-100">
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
        
        {/* Thumbnail Strip */}
        {product.images && product.images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-20 flex-shrink-0 border-2 transition-all ${activeImageIndex === idx ? 'border-[#007AFF] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Product Info */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="mb-2 flex items-center gap-3">
          <span className="px-3 py-1 bg-slate-900 text-[#007AFF] text-[10px] font-bold uppercase tracking-widest">
            {product.categoryName || "Uncategorized"}
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Brand: {product.brandName || "Generic"}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 uppercase tracking-wide mb-2">
          {product.productName}
        </h1>
        <p className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-6">
          Model: {product.modelName || "Standard"}
        </p>

        <div className="mb-12 p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#007AFF]/10 rounded-bl-full -z-0" />
          <div className="relative z-10 flex flex-col gap-1">
            {mrp > salePrice && (
              <div className="flex items-center gap-3">
                <span className="text-lg text-slate-400 line-through font-mono">₹{mrp.toLocaleString()}</span>
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded">
                  Save {discountPercentage}%
                </span>
              </div>
            )}
            <div className="flex items-end gap-2">
              <span className="text-4xl md:text-5xl font-mono font-bold text-slate-900">₹{salePrice.toLocaleString()}</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">(Excl. Taxes)</span>
            </div>
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed mb-12 text-sm md:text-base">
          {product.description || product.shortDescription || "No description available for this product."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button 
            onClick={handleAddToCart}
            className="flex-1 py-4 bg-slate-900 text-[#007AFF] flex items-center justify-center gap-3 font-display font-bold uppercase tracking-widest hover:bg-[#007AFF] hover:text-black transition-all duration-300 group"
          >
            <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
            Add to Cart
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 py-4 bg-[#007AFF] text-black flex items-center justify-center gap-3 font-display font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(0, 122, 255,0.5)] group"
          >
            <Zap size={18} className="group-hover:scale-110 transition-transform" />
            Buy Now
          </button>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 border border-slate-100">
            <Shield size={24} className="text-[#007AFF] mb-2" />
            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Global Certs</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 border border-slate-100">
            <Truck size={24} className="text-[#007AFF] mb-2" />
            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Fast Delivery</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 border border-slate-100">
            <Zap size={24} className="text-[#007AFF] mb-2" />
            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Expert Setup</span>
          </div>
        </div>

        {/* Technical Specifications Table */}
        {product.specifications && product.specifications.length > 0 && (
          <div>
            <h3 className="text-lg font-display font-bold text-slate-900 uppercase tracking-wide mb-4 border-b border-slate-200 pb-2">Technical Specifications</h3>
            <div className="bg-white border border-slate-200">
              {product.specifications.map((spec: any, idx: number) => (
                <div key={idx} className="flex border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <div className="w-1/3 p-4 bg-slate-50/50 text-xs font-bold text-slate-600 uppercase tracking-widest border-r border-slate-100">
                    {spec.variationTypeName}
                  </div>
                  <div className="w-2/3 p-4 text-sm text-slate-900 font-medium">
                    {spec.variationName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
