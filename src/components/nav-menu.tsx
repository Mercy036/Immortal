"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "ARENA", href: "#" },
  { label: "LEADERBOARD", href: "#" },
  { label: "SHOP", href: "#" },
  { label: "ABOUT", href: "#" },
];

export default function NavMenu() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="relative flex items-center justify-center py-2 px-4">
      <ul className="flex items-center gap-2 md:gap-4 m-0 p-0 list-none">
        {navItems.map((item, index) => (
          <li 
            key={item.label}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a
              href={item.href}
              className={cn(
                "relative z-10 px-4 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500",
                hoveredIndex === index ? "text-white" : "text-white/40"
              )}
            >
              {item.label}
            </a>
            
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
            
            {/* Subtle underline indicator */}
            <motion.div
              className="absolute -bottom-1 left-1/2 h-[1px] bg-emerald-500/50 -translate-x-1/2 pointer-events-none"
              initial={{ width: 0 }}
              animate={{ width: hoveredIndex === index ? "40%" : 0 }}
              transition={{ duration: 0.3 }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
