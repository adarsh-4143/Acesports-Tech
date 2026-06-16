"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Briefcase, Phone, Grid3x3, Zap } from "lucide-react";

const mobileNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Layers },
  { label: "Projects", href: "/projects", icon: Briefcase },
  { label: "Contact", href: "/contact", icon: Phone },
  { label: "More", href: "/about", icon: Grid3x3 },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        background: "rgba(9,9,11,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* Enquiry CTA floating button */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <button
          onClick={() => window.dispatchEvent(new Event("openEnquiryPopup"))}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-[#007AFF]/30"
          style={{
            background: "linear-gradient(135deg, #007AFF, #004eaa)",
            boxShadow: "0 0 20px rgba(0, 122, 255,0.5), 0 4px 12px rgba(0,0,0,0.4)",
          }}
        >
          <Zap size={20} color="#09090b" />
        </button>
      </div>

      <div className="flex items-center justify-around px-2 pt-2 pb-2">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200"
              style={{
                color: isActive ? "#007AFF" : "rgba(255,255,255,0.4)",
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span
                className="text-[9px] font-semibold uppercase tracking-wider"
                style={{ color: isActive ? "#007AFF" : "rgba(255,255,255,0.4)" }}
              >
                {item.label}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-0 w-6 h-0.5 rounded-full"
                  style={{ background: "#007AFF", boxShadow: "0 0 8px #007AFF" }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
