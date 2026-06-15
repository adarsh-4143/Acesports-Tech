"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Search, ChevronDown, AlertCircle, X } from "lucide-react";
import { contactService } from "@/services/contactService";

const serviceOptions = [
  "Stadium Development", "Synthetic Running Track", "Artificial Turf Installation",
  "Basketball / Tennis Court", "Sports Academy Infrastructure",
  "Multi-Sports Facility", "Sports Technology Solutions", "Product Enquiry", "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "", service: "", location: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  
  // Combobox state
  const [serviceSearch, setServiceSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showToast = (message: string, type: "error" | "success" = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const capitalizeWords = (str: string) => {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  };

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      // Only allow numbers
      const numericValue = value.replace(/[^0-9]/g, "");
      setForm({ ...form, [name]: numericValue });
    } else if (name === "name") {
      // Auto capitalize first letter of each word
      setForm({ ...form, [name]: capitalizeWords(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const submit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.phone) {
      showToast("Please fill in all required fields.");
      return;
    }

    if (form.phone.length !== 10) {
      showToast("Please Enter Valid Mobile Number (10 digits).");
      return;
    }

    if (!validateEmail(form.email)) {
      showToast("Please Enter Valid Email Address.");
      return;
    }

    setLoading(true);
    try {
      const res = await contactService.createContact({
        fullName: form.name,
        emailAddress: form.email,
        mobileNumber: form.phone,
        businessName: form.organization,
        address: form.location,
        service: form.service,
        description: form.message,
        source: "Website",
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        showToast(res.message || "Failed to submit enquiry.", "error");
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.response?.data?.message || err.message || "Failed to submit enquiry.", "error");
    } finally {
      setLoading(false);
    }
  };

  const isFloating = (name: string) => focused === name || ((form as any)[name] && (form as any)[name].length > 0);
  
  const floatingLabelClass = (name: string) => `absolute left-3 px-1 transition-all duration-200 pointer-events-none bg-slate-900 font-display font-semibold tracking-wider uppercase ${
    isFloating(name) ? "-top-2 text-[10px] text-[#39FF14]" : "top-3.5 text-xs text-white/35"
  }`;

  const inputBaseClass = (name: string) => `w-full bg-transparent px-4 py-3 text-sm text-white rounded outline-none transition-all duration-300 border ${
    focused === name ? "border-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.15)]" : "border-white/20"
  }`;

  const filteredServices = serviceOptions.filter(s => s.toLowerCase().includes(serviceSearch.toLowerCase()));

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-electric p-12 text-center min-h-[420px] flex flex-col items-center justify-center rounded-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-16 h-16 flex items-center justify-center mb-6"
          style={{ background: "linear-gradient(135deg, rgba(57,255,20,0.2), rgba(57,255,20,0.1))", border: "1px solid rgba(57,255,20,0.4)", boxShadow: "0 0 30px rgba(57,255,20,0.2)" }}
        >
          <CheckCircle size={28} className="text-[#39FF14]" />
        </motion.div>
        <h3 className="font-display font-bold text-white text-2xl uppercase mb-3">Enquiry Received</h3>
        <p className="text-white/50 text-sm max-w-sm leading-relaxed">
          Thank you for reaching out. A member of our team will be in touch within 24 hours to discuss your project.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <div className="w-8 h-px" style={{ background: "#39FF14", boxShadow: "0 0 6px #39FF14" }} />
          <span className="text-[#39FF14] text-xs tracking-[0.3em] uppercase font-display font-semibold">ACE Sports Tech</span>
          <div className="w-8 h-px" style={{ background: "#39FF14", boxShadow: "0 0 6px #39FF14" }} />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 lg:p-10 relative overflow-visible">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`absolute top-4 left-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded shadow-xl border ${
              toast.type === "error" ? "bg-red-500/10 border-red-500/50 text-red-500" : "bg-[#39FF14]/10 border-[#39FF14]/50 text-[#39FF14]"
            }`}
          >
            {toast.type === "error" ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
            <span className="text-xs font-bold tracking-wide">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70"><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at top right, #39FF14, transparent)" }} />
      
      <div className="relative z-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px" style={{ background: "#39FF14", boxShadow: "0 0 6px #39FF14" }} />
            <span className="text-[#39FF14] text-xs font-display font-semibold tracking-[0.3em] uppercase">Project Enquiry Form</span>
          </div>
          <h3 className="font-display font-bold text-white text-2xl uppercase">Tell Us About Your Project</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
          {/* Form Fields with Floating Labels */}
          {[
            { name: "name", label: "Full Name *", type: "text" },
            { name: "email", label: "Email Address *", type: "email" },
            { name: "phone", label: "Mobile Number *", type: "tel", maxLength: 10 },
            { name: "organization", label: "Organization", type: "text" },
            { name: "location", label: "Project Location", type: "text" },
          ].map(f => (
            <div key={f.name} className="relative">
              <input
                type={f.type} 
                name={f.name}
                maxLength={f.maxLength}
                value={(form as any)[f.name]} 
                onChange={handle}
                onFocus={() => setFocused(f.name)} 
                onBlur={() => setFocused(null)}
                className={inputBaseClass(f.name)}
              />
              <label className={floatingLabelClass(f.name)}>{f.label}</label>
            </div>
          ))}

          {/* Searchable Dropdown (Combobox) */}
          <div className="relative" ref={dropdownRef}>
            <div 
              className={inputBaseClass("service") + " flex items-center justify-between cursor-pointer"}
              onClick={() => {
                setIsDropdownOpen(true);
                setFocused("service");
              }}
            >
              <span className={form.service ? "text-white" : "text-transparent"}>
                {form.service || "Select"}
              </span>
              <ChevronDown size={16} className="text-white/40" />
            </div>
            <label className={floatingLabelClass("service")}>Service Required *</label>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-md shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-2 border-b border-slate-700 relative">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input 
                      type="text" 
                      autoFocus
                      placeholder="Search services..." 
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="w-full bg-slate-900 text-white text-xs px-9 py-2 rounded outline-none border border-slate-700 focus:border-[#39FF14]"
                    />
                  </div>
                  <ul className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600">
                    {filteredServices.length === 0 ? (
                      <li className="px-4 py-3 text-xs text-white/40 text-center">No services found</li>
                    ) : (
                      filteredServices.map(opt => (
                        <li 
                          key={opt} 
                          onClick={() => {
                            setForm({ ...form, service: opt });
                            setServiceSearch("");
                            setIsDropdownOpen(false);
                            setFocused(null);
                          }}
                          className={`px-4 py-2.5 text-xs cursor-pointer transition-colors ${
                            form.service === opt ? "bg-[#39FF14]/20 text-[#39FF14] font-bold" : "text-white/80 hover:bg-slate-700"
                          }`}
                        >
                          {opt}
                        </li>
                      ))
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="sm:col-span-2 relative mt-2">
            <textarea 
              name="message" 
              value={form.message} 
              onChange={handle} 
              rows={4}
              onFocus={() => setFocused("message")} 
              onBlur={() => setFocused(null)}
              className={`${inputBaseClass("message")} resize-none pt-4`}
            />
            <label className={floatingLabelClass("message")}>Project Details</label>
          </div>

          <div className="sm:col-span-2 mt-2">
            <button 
              onClick={submit} 
              disabled={loading}
              className="btn-electric disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#060f1e]/30 border-t-[#060f1e] rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send size={14} />
                  Send Enquiry
                </>
              )}
            </button>
            <p className="text-white/25 text-[10px] mt-4 uppercase tracking-wider">All fields marked with * are required. We respond to all enquiries within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
