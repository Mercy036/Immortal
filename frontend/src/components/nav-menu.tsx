"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "ARENA", href: "/" },
  { label: "MATCHMAKING", href: "/matchmaking" },
  { label: "LEADERBOARD", href: "/leaderboard" },
  { label: "SHOP", href: "/shop" },
  { label: "PROFILE", href: "/profile" },
];

export default function NavMenu() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);

  useEffect(() => {
    import("@/lib/api").then(({ isAuthenticated }) => {
      setIsAuthenticatedUser(isAuthenticated());
    });
  }, [pathname]);

  const handleLogout = () => {
    import("@/lib/api").then(({ removeToken }) => {
      removeToken();
      window.location.reload();
    });
  };

  return (
    <nav className="relative flex items-center justify-center py-2 px-4">
      <ul className="flex items-center gap-1 md:gap-2 m-0 p-0 list-none">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          
          return (
            <li 
              key={item.label}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "relative z-10 px-4 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 block",
                  isActive || hoveredIndex === index ? "text-white" : "text-white/40"
                )}
              >
                {item.label}
              </Link>
              
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 z-0 rounded-lg bg-white/[0.03] border border-white/5 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </AnimatePresence>
              
              {/* Subtle underline indicator */}
              <motion.div
                className="absolute -bottom-1 left-1/2 h-[1px] bg-emerald-500/50 -translate-x-1/2 pointer-events-none"
                initial={{ width: 0 }}
                animate={{ width: hoveredIndex === index || isActive ? "40%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </li>
          );
        })}
        
        <li className="ml-4">
          {isAuthenticatedUser ? (
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-red-400/80 hover:text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-all"
            >
              DISCONNECT
            </button>
          ) : (
            <button 
              onClick={() => router.push("/login")}
              className="px-4 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
            >
              AUTHENTICATE
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
