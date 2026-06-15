"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, CreditCard, Wallet, Banknote, Truck, ShieldCheck, AlertCircle, X } from "lucide-react";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { orderService } from "@/services/orderService";
import { addressService } from "@/services/addressService";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", pinCode: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

  React.useEffect(() => {
    if (user) {
      const nameParts = (user.full_name || "").split(" ");
      setForm(prev => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.mobile || "",
      }));

      // Fetch address
      addressService.getAddresses(user.user_id).then(res => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const addr = res.data[0];
          setForm(prev => ({
            ...prev,
            address: addr.address || prev.address,
            city: addr.city || prev.city,
            state: addr.state || prev.state,
            pinCode: addr.pincode || prev.pinCode
          }));
        }
      }).catch(e => console.error(e));
    }
  }, [user]);

  const showToast = (message: string, type: "error" | "success" = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const capitalizeWords = (str: string) => {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  };

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Prevent blank space if it's the only character
    if (value.trim() === "" && value.length > 0) return;

    if (name === "phone") {
      setForm({ ...form, [name]: value.replace(/[^0-9]/g, "") });
    } else if (name === "pinCode") {
      setForm({ ...form, [name]: value.replace(/[^0-9]/g, "") });
    } else if (name === "firstName" || name === "lastName") {
      setForm({ ...form, [name]: capitalizeWords(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const hasItems = cart.length > 0;

  const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    // Validations
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.address || !form.city || !form.state || !form.pinCode) {
      showToast("Please fill in all required fields.");
      return;
    }

    if (form.phone.length !== 10) {
      showToast("Please Enter Valid Mobile Number (10 digits).");
      return;
    }

    if (form.pinCode.length !== 6) {
      showToast("Please Enter Valid PIN Code (6 digits).");
      return;
    }

    if (!validateEmail(form.email)) {
      showToast("Please Enter Valid Email Address.");
      return;
    }

    setLoading(true);
    
    if (user) {
      const itemsPayload = cart.map(item => ({
        productInventoryId: !isNaN(Number(item.id)) ? Number(item.id) : undefined,
        productName: item.name,
        quantity: item.quantity,
        unitPrice: parseFloat(item.price) || 0,
        payableAmount: (parseFloat(item.price) || 0) * item.quantity,
        netpayableAmount: (parseFloat(item.price) || 0) * item.quantity,
      }));

      try {
        await orderService.createOrder({
          userId: user.login_id,
          customerType: "b2c",
          payableAmount: subtotal,
          netpayableAmount: total,
          dueAmount: paymentMethod === "cod" ? total : 0,
          address: `${form.address}, ${form.city}, ${form.state} - ${form.pinCode}`,
          paymentModeId: paymentMethod === "upi" ? 1 : paymentMethod === "card" ? 2 : 3,
          items: itemsPayload
        });
      } catch (err: any) {
        showToast(err.message || "Failed to place order. Please try again.");
        setLoading(false);
        return;
      }
    } else {
      // Simulate for guests
      await new Promise(r => setTimeout(r, 1400));
    }

    setLoading(false);

    setIsOrderPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen pt-24 pb-12 relative bg-slate-50 flex items-center justify-center">
        <AnimatedBackgroundLight />
        <div className="relative z-10 max-w-lg w-full mx-5 bg-white border border-slate-200 p-10 text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-[#00CC44]" />
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900 uppercase tracking-wide mb-4">Order Successful!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for your purchase. We have received your order and will contact you shortly regarding shipping and installation details.
          </p>
          <div className="bg-slate-50 p-4 border border-slate-100 mb-8 text-left">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Order ID</p>
            <p className="text-lg font-mono font-bold text-slate-900">#ACE-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
          <Link href="/products" className="inline-block w-full py-4 bg-slate-900 text-[#39FF14] font-display font-bold uppercase tracking-widest hover:bg-[#39FF14] hover:text-black transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (!hasItems) {
    return (
      <div className="min-h-screen pt-24 pb-12 relative bg-slate-50 flex flex-col items-center justify-center">
        <AnimatedBackgroundLight />
        <div className="relative z-10 text-center">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Your Cart is Empty</h2>
          <p className="text-slate-500 mb-6">You need items in your cart to checkout.</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-[#39FF14] font-bold uppercase tracking-wider hover:bg-[#39FF14] hover:text-black transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 relative bg-slate-50">
      <AnimatedBackgroundLight />
      <div className="absolute inset-0 grid-pattern-light opacity-50 pointer-events-none" />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-24 left-1/2 z-[100] flex items-center gap-2 px-4 py-2.5 rounded shadow-xl border ${
              toast.type === "error" ? "bg-red-500/10 border-red-500/50 text-red-500 bg-white" : "bg-[#39FF14]/10 border-[#39FF14]/50 text-[#00CC44] bg-white"
            }`}
          >
            {toast.type === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            <span className="text-xs font-bold tracking-wide">{toast.message}</span>
            <button type="button" onClick={() => setToast(null)} className="ml-2 hover:opacity-70"><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative z-10 max-w-6xl mx-auto px-5 lg:px-10">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} /> Back to Cart
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Form */}
          <div className="flex-1">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
              
              {/* Contact Information */}
              <div className="bg-white p-8 border border-slate-200 shadow-sm">
                <h3 className="font-display font-bold text-xl uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4">1. Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handle} required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-all" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Number *</label>
                    <input type="tel" name="phone" maxLength={10} value={form.phone} onChange={handle} required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-all" placeholder="9876543210" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-8 border border-slate-200 shadow-sm">
                <h3 className="font-display font-bold text-xl uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4">2. Shipping Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">First Name *</label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handle} required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Name *</label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handle} required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-1 mb-4">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Street Address *</label>
                  <input type="text" name="address" value={form.address} onChange={handle} required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-all" placeholder="House/Flat No., Building Name, Street" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">City *</label>
                    <input type="text" name="city" value={form.city} onChange={handle} required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-all" placeholder="Mumbai" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">State *</label>
                    <input type="text" name="state" value={form.state} onChange={handle} required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-all" placeholder="Maharashtra" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">PIN Code *</label>
                    <input type="text" name="pinCode" maxLength={6} value={form.pinCode} onChange={handle} required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-all" placeholder="400001" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-8 border border-slate-200 shadow-sm">
                <h3 className="font-display font-bold text-xl uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4">3. Payment Method</h3>
                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[#39FF14] bg-[#39FF14]/5' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}`}>
                    <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-4 h-4 text-[#39FF14] focus:ring-[#39FF14]" />
                    <Wallet size={20} className={paymentMethod === 'upi' ? 'text-[#00CC44]' : 'text-slate-400'} />
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">UPI / QR</p>
                      <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </label>
                  
                  <label className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#39FF14] bg-[#39FF14]/5' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}`}>
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-[#39FF14] focus:ring-[#39FF14]" />
                    <CreditCard size={20} className={paymentMethod === 'card' ? 'text-[#00CC44]' : 'text-slate-400'} />
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">Credit / Debit Card</p>
                      <p className="text-xs text-slate-500">Visa, MasterCard, RuPay</p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#39FF14] bg-[#39FF14]/5' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}`}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-[#39FF14] focus:ring-[#39FF14]" />
                    <Banknote size={20} className={paymentMethod === 'cod' ? 'text-[#00CC44]' : 'text-slate-400'} />
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">Cash on Delivery</p>
                      <p className="text-xs text-slate-500">Pay when you receive the order</p>
                    </div>
                  </label>
                </div>
              </div>

            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-slate-900 text-white p-6 border border-slate-800 shadow-xl sticky top-24">
              <h3 className="font-display font-bold text-lg uppercase tracking-wide mb-6 border-b border-white/10 pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 bg-white/10 shrink-0">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-white/50">Qty: {item.quantity}</p>
                      <p className="text-xs font-mono text-[#39FF14]">₹{parseFloat(item.price).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm pt-4 border-t border-white/10 mb-6">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Estimated Tax (18%)</span>
                  <span>₹{tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between text-[#00CC44]">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-[#39FF14] text-lg pt-4 mt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>₹{total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-6 bg-white/5 p-3 text-xs text-white/70">
                <ShieldCheck size={16} className="text-[#39FF14] shrink-0 mt-0.5" />
                <p>Safe and secure payments. 100% Authentic products guaranteed.</p>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={loading}
                className="w-full py-4 bg-[#39FF14] text-black font-display font-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order <CheckCircle2 size={16} />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
