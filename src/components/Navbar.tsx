"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown, Zap, ShoppingCart, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Products", href: "/products" },
  {
    label: "Media", href: "#", dropdown: [
      { label: "Image Gallery", href: "/media/image-gallery" },
      { label: "Video Gallery", href: "/media/video-gallery" }
    ]
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, login, logout } = useAuth();
  const { cart } = useCart();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] border-slate-200/50"
            : "bg-white/70 backdrop-blur-md border-transparent"
          }`}
      >

        <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-[80px] lg:h-[90px] transition-all duration-500">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              {/* Logo */}
              <img src="/logo.svg" alt="ACE Sports Tech" className="h-[65px] lg:h-[75px] w-auto object-contain relative z-10 transition-all duration-500 drop-shadow-sm" />
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle, rgba(0, 122, 255,0.2) 0%, transparent 60%)" }}
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2 p-1.5 bg-slate-50/50 backdrop-blur-md border border-slate-200/50 rounded-full shadow-inner">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.dropdown && pathname.startsWith("/media"));
              return link.dropdown ? (
                <div key={link.label} className="relative group">
                  <div className={`flex items-center gap-1 cursor-pointer relative px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full overflow-hidden ${active ? "text-[#09090b]" : "text-slate-500 hover:text-slate-900"
                    }`}>
                    {active && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[#007AFF]/20 border border-[#007AFF]/30 rounded-full"
                      />
                    )}
                    {!active && (
                      <span className="absolute inset-0 bg-slate-200/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    <ChevronDown size={14} className="relative z-10 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden flex flex-col p-2">
                    {link.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="px-4 py-3 text-xs font-semibold tracking-widest uppercase text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`relative px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full overflow-hidden group ${active ? "text-[#09090b]" : "text-slate-500 hover:text-slate-900"
                    }`}
                >
                  {/* Active background */}
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#007AFF]/20 border border-[#007AFF]/30 rounded-full"
                    />
                  )}
                  {/* Hover background */}
                  {!active && (
                    <span className="absolute inset-0 bg-slate-200/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA & Icons */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-3 border-r border-slate-200 pr-4">
              <Link href="/cart" className="relative text-slate-600 hover:text-slate-900 transition-colors">
                <ShoppingCart size={18} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#007AFF] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="text-slate-600 hover:text-blue-600 transition-colors" title="Profile">
                    <User size={18} />
                  </Link>
                  <button onClick={logout} className="text-slate-600 hover:text-red-500 transition-colors" title="Logout">
                    <LogOut size={18} />
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-slate-600 hover:text-blue-600 transition-colors" title="Login">
                  <User size={18} />
                </Link>
              )}
            </div>

            <button
              onClick={() => window.dispatchEvent(new Event("openEnquiryPopup"))}
              className="btn-electric text-xs"
            >
              <Zap size={13} />
              Get Quote
            </button>
          </div>

          {/* Mobile hamburger & Icons */}
          <div className="flex lg:hidden items-center gap-4">
            <Link href="/cart" className="relative text-slate-600">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#007AFF] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-200 rounded text-slate-800"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col pt-20"
            style={{ background: "rgba(6,15,30,0.97)", backdropFilter: "blur(30px)" }}
          >
            {/* Neon grid overlay */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            <nav className="relative z-10 flex flex-col px-8 pt-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.dropdown ? (
                    <div className="py-4 border-b border-white/5">
                      <span className="font-condensed text-4xl font-bold text-white tracking-wide block mb-4">
                        {link.label}
                      </span>
                      <div className="flex flex-col gap-3 pl-4">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="flex items-center justify-between group"
                          >
                            <span className="font-condensed text-2xl font-bold text-white/70 group-hover:text-[#007AFF] transition-colors tracking-wide">
                              {subItem.label}
                            </span>
                            <ChevronRight size={16} className="text-white/30 group-hover:text-[#007AFF] transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href!}
                      className="flex items-center justify-between py-4 border-b border-white/5 group"
                    >
                      <span className="font-condensed text-4xl font-bold text-white group-hover:text-[#007AFF] transition-colors tracking-wide">
                        {link.label}
                      </span>
                      <ChevronRight size={20} className="text-white/30 group-hover:text-[#007AFF] transition-colors" />
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="relative z-10 mt-auto px-8 pb-12">
              <button
                onClick={() => {
                  window.dispatchEvent(new Event("openEnquiryPopup"));
                  setMenuOpen(false);
                }}
                className="btn-electric w-full justify-center"
              >
                <Zap size={15} />
                Start a Project
              </button>
              <p className="text-white/30 text-xs mt-4 text-center tracking-widest uppercase">
                +91 73680 40888
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}