"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, UserPlus, AlertCircle, CheckCircle2, X } from "lucide-react";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function SignupPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

  const showToast = (message: string, type: "error" | "success" = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const capitalizeWords = (str: string) => {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() === "" && value.length > 0) return;
    setName(capitalizeWords(value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() === "" && value.length > 0) return;
    setEmail(value);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 10) {
      setMobile(value);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() === "" && value.length > 0) return;
    setPassword(value);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !mobile || !password) {
      showToast("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      showToast("Please Enter Valid Email Address.");
      return;
    }

    if (mobile.length !== 10) {
      showToast("Please Enter Valid 10-digit Mobile Number.");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.signup({ 
        full_name: name, 
        email, 
        mobile,
        password,
        user_type_id: 2 // Assuming 2 is standard user/customer
      });
      setLoading(false);
      
      if (response.success) {
        showToast("Account created successfully! Please login.", "success");
        setTimeout(() => router.push("/login"), 1500); 
      } else {
        showToast(response.message || "Failed to create account", "error");
      }
    } catch (error: any) {
      setLoading(false);
      showToast(error.message || "Signup failed. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center relative bg-slate-50">
      <AnimatedBackgroundLight />
      <div className="absolute inset-0 grid-pattern-light opacity-50 pointer-events-none" />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`absolute top-4 left-1/2 z-[100] flex items-center gap-2 px-4 py-2.5 rounded shadow-xl border ${
              toast.type === "error" ? "bg-red-500/10 border-red-500/50 text-red-500 bg-white" : "bg-[#39FF14]/10 border-[#39FF14]/50 text-[#00CC44] bg-white"
            }`}
          >
            {toast.type === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            <span className="text-xs font-bold tracking-wide">{toast.message}</span>
            <button type="button" onClick={() => setToast(null)} className="ml-2 hover:opacity-70"><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative z-10 w-full max-w-md px-5">
        <div className="bg-white border border-slate-200 p-8 shadow-xl">
          <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(57,255,20,0.5)]">
            <UserPlus size={20} className="text-[#39FF14]" />
          </div>
          <h1 className="text-2xl font-display font-bold text-slate-900 text-center uppercase tracking-wide mb-2">Create Account</h1>
          <p className="text-center text-slate-500 text-sm mb-8">Join ACE Sports Tech for exclusive project access</p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Full Name *</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={handleNameChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm text-black"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Email Address *</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm text-black"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Mobile Number *</label>
              <input 
                type="tel" 
                required
                value={mobile}
                onChange={handleMobileChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm text-black"
                placeholder="9876543210"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Password *</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm text-black"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-slate-900 text-[#39FF14] font-display font-bold text-sm uppercase tracking-widest hover:bg-[#39FF14] hover:text-black transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#39FF14]/30 border-t-[#39FF14] rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Sign Up <ArrowRight size={16} />
                </>
              )}
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
