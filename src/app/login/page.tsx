"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    router.push("/products");
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center relative bg-slate-50">
      <AnimatedBackgroundLight />
      <div className="absolute inset-0 grid-pattern-light opacity-50 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md px-5">
        <div className="bg-white border border-slate-200 p-8 shadow-xl">
          <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(57,255,20,0.5)]">
            <User size={20} className="text-[#39FF14]" />
          </div>
          <h1 className="text-2xl font-display font-bold text-slate-900 text-center uppercase tracking-wide mb-2">Welcome Back</h1>
          <p className="text-center text-slate-500 text-sm mb-8">Enter your credentials to access your account</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot?</a>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
            
            <button type="submit" className="w-full py-3 bg-slate-900 text-[#39FF14] font-display font-bold text-sm uppercase tracking-widest hover:bg-[#39FF14] hover:text-black transition-colors flex items-center justify-center gap-2 mt-4">
              Sign In <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Don&apos;t have an account? <Link href="/signup" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
