"use client";

import React from "react";
import Link from "next/link";
import { Trash2, ArrowLeft, ArrowRight, Zap } from "lucide-react";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import SectionHeading from "@/components/SectionHeading";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const { isLoggedIn, isAuthLoading } = useAuth();
  
  const hasItems = cart.length > 0;

  if (isAuthLoading) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 relative bg-slate-50">
      <AnimatedBackgroundLight />
      <div className="absolute inset-0 grid-pattern-light opacity-50 pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-10">
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} /> Back to Products
          </Link>
        </div>

        <SectionHeading eyebrow="Your Cart" title="Review Your Order" subtitle="Verify your selected infrastructure materials before requesting a quote." theme="light" />

        {!isLoggedIn ? (
          <div className="bg-white border border-slate-200 p-12 text-center shadow-sm mt-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap size={24} className="text-slate-400" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Login Required</h3>
            <p className="text-slate-500 mb-6">Please log in to see your cart and add products.</p>
            <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-[#39FF14] text-sm font-bold uppercase tracking-wider hover:bg-[#39FF14] hover:text-black transition-colors">
              Go to Login
            </Link>
          </div>
        ) : !hasItems ? (
          <div className="bg-white border border-slate-200 p-12 text-center shadow-sm mt-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap size={24} className="text-slate-400" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Your cart is empty</h3>
            <p className="text-slate-500 mb-6">Looks like you haven&apos;t added any products yet.</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-[#39FF14] text-sm font-bold uppercase tracking-wider hover:bg-[#39FF14] hover:text-black transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <div className="flex-1">
              <div className="bg-white border border-slate-200 shadow-sm rounded-sm overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-right">Action</div>
                </div>
                
                <ul className="divide-y divide-slate-100">
                  {cart.map((item) => (
                    <li key={item.id} className="p-4 flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-4 hover:bg-slate-50/50 transition-colors">
                      <div className="col-span-6 flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 shrink-0 relative overflow-hidden">
                          {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#00CC44] mb-1 block">{item.category}</span>
                          <h4 className="font-display font-bold text-sm text-slate-900">{item.name}</h4>
                        </div>
                      </div>
                      
                      <div className="col-span-2 sm:text-center flex justify-between sm:block">
                        <span className="sm:hidden text-xs text-slate-500 uppercase">Price: </span>
                        <span className="text-sm font-mono text-slate-600">{item.price}</span>
                      </div>
                      
                      <div className="col-span-2 sm:text-center flex justify-between sm:block">
                        <span className="sm:hidden text-xs text-slate-500 uppercase">Qty: </span>
                        <span className="text-sm font-semibold">{item.quantity}</span>
                      </div>
                      
                      <div className="col-span-2 text-right">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-2"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-slate-900 text-white p-6 border border-slate-800 shadow-xl sticky top-24">
                <h3 className="font-display font-bold text-lg uppercase tracking-wide mb-6 border-b border-white/10 pb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Items ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                    <span>₹{cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Taxes (18% Est.)</span>
                    <span>₹{(cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity, 0) * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Installation & Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#39FF14] border-t border-white/10 pt-4 mt-4">
                    <span>Total Estimated</span>
                    <span>₹{(cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity, 0) * 1.18).toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-white/40 text-xs leading-relaxed mb-6">
                  Final shipping and installation charges will be calculated during checkout based on your delivery address.
                </p>

                <Link href="/checkout" className="w-full py-3 bg-[#39FF14] text-black font-display font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
