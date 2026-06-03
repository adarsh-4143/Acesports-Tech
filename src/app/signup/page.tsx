"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, UserPlus } from "lucide-react";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    login(); // Auto login after signup
    router.push("/products");
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center relative bg-slate-50">
      <AnimatedBackgroundLight />
      <div className="absolute inset-0 grid-pattern-light opacity-50 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md px-5">
        <div className="bg-white border border-slate-200 p-8 shadow-xl">
          <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(57,255,20,0.5)]">
            <UserPlus size={20} className="text-[#39FF14]" />
          </div>
          <h1 className="text-2xl font-display font-bold text-slate-900 text-center uppercase tracking-wide mb-2">Create Account</h1>
          <p className="text-center text-slate-500 text-sm mb-8">Join ACE Sports Tech for exclusive project access</p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm"
                placeholder="John Doe"
              />
            </div>
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
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Password</label>
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
              Sign Up <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Already have an account? <Link href="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
