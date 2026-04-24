"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck, User } from "lucide-react";

const navItems = [
  { label: "ARENA", href: "/" },
  { label: "MATCHMAKING", href: "/matchmaking" },
  { label: "LEADERBOARD", href: "/leaderboard" },
  { label: "ARSENAL", href: "/shop" },
];

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);

  useEffect(() => {
    import("@/lib/api").then(({ isAuthenticated }) => {
      setIsAuthenticatedUser(isAuthenticated());
    });
  }, [pathname]);

  const handleAuthAction = () => {
    if (isAuthenticatedUser) {
      import("@/lib/api").then(({ removeToken }) => {
        removeToken();
        window.location.reload();
      });
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-black/60 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Branding (Left) */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] md:text-[14px] font-black tracking-[0.4em] text-white uppercase group-hover:text-emerald-400 transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              Immortal
            </span>
            <span className="text-[8px] font-bold tracking-[0.3em] text-emerald-500/70 uppercase hidden sm:block">
              System Core Online
            </span>
          </div>
        </Link>

        {/* Navigation (Center) */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-5 py-2.5 group"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-lg border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={`relative z-10 text-[10px] font-black uppercase tracking-[0.3em] transition-colors
                  ${isActive ? "text-white" : "text-white/40 group-hover:text-white/80"}
                `}>
                  {item.label}
                </span>
                
                {/* Hover Line */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-emerald-500/50 transition-all duration-300
                  ${isActive ? "w-1/2" : "w-0 group-hover:w-1/3 opacity-0 group-hover:opacity-100"}
                `} />
              </Link>
            );
          })}
        </nav>

        {/* User Actions (Right) */}
        <div className="flex items-center gap-4">
          {isAuthenticatedUser && (
            <Link 
              href="/profile"
              className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <User className="h-4 w-4 text-white/70" />
            </Link>
          )}
          
          <button 
            onClick={handleAuthAction}
            className={`relative overflow-hidden px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] transition-all border
              ${isAuthenticatedUser 
                ? "text-red-400 bg-red-500/10 border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]" 
                : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"}
            `}
          >
            {isAuthenticatedUser ? "Disconnect" : "Initialize Link"}
          </button>
        </div>

      </div>
    </header>
  );
}
