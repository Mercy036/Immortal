"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Coins, Zap, Star, Shield, Search } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";

const shopItems = [
  {
    id: 1,
    name: "Son Goku",
    series: "Dragon Ball Z",
    cost: 5000,
    type: "Legendary",
    stats: { power: 99, speed: 95, defense: 90 },
    image: "https://api.dicebear.com/7.x/pixel-art/svg?seed=gokuzz&backgroundColor=transparent",
    color: "from-orange-500/30",
    shadowColor: "rgba(249, 115, 22, 0.4)",
    accent: "text-orange-400"
  },
  {
    id: 2,
    name: "Naruto Uzumaki",
    series: "Naruto",
    cost: 4500,
    type: "Legendary",
    stats: { power: 92, speed: 94, defense: 85 },
    image: "https://api.dicebear.com/7.x/pixel-art/svg?seed=narutoo&backgroundColor=transparent",
    color: "from-yellow-500/30",
    shadowColor: "rgba(234, 179, 8, 0.4)",
    accent: "text-yellow-400"
  },
  {
    id: 3,
    name: "Monkey D. Luffy",
    series: "One Piece",
    cost: 4200,
    type: "Epic",
    stats: { power: 90, speed: 90, defense: 95 },
    image: "https://api.dicebear.com/7.x/pixel-art/svg?seed=luffyy&backgroundColor=transparent",
    color: "from-red-500/30",
    shadowColor: "rgba(239, 68, 68, 0.4)",
    accent: "text-red-400"
  },
  {
    id: 4,
    name: "Ichigo Kurosaki",
    series: "Bleach",
    cost: 3800,
    type: "Epic",
    stats: { power: 94, speed: 88, defense: 80 },
    image: "https://api.dicebear.com/7.x/pixel-art/svg?seed=ichigoo&backgroundColor=transparent",
    color: "from-blue-500/30",
    shadowColor: "rgba(59, 130, 246, 0.4)",
    accent: "text-blue-400"
  },
  {
    id: 5,
    name: "Saitama",
    series: "One Punch Man",
    cost: 9999,
    type: "Mythic",
    stats: { power: 100, speed: 100, defense: 100 },
    image: "https://api.dicebear.com/7.x/pixel-art/svg?seed=saitamaa&backgroundColor=transparent",
    color: "from-purple-500/30",
    shadowColor: "rgba(168, 85, 247, 0.4)",
    accent: "text-purple-400"
  },
  {
    id: 6,
    name: "Zoro",
    series: "One Piece",
    cost: 3200,
    type: "Rare",
    stats: { power: 88, speed: 85, defense: 82 },
    image: "https://api.dicebear.com/7.x/pixel-art/svg?seed=zoroo&backgroundColor=transparent",
    color: "from-emerald-500/30",
    shadowColor: "rgba(16, 185, 129, 0.4)",
    accent: "text-emerald-400"
  },
];

function TiltCard({ item }: { item: typeof shopItems[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col h-[500px] w-full rounded-2xl cursor-pointer group"
    >
      {/* Dynamic Glow Shadow */}
      <div 
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl z-0"
        style={{ backgroundColor: item.shadowColor }}
      />
      
      {/* Inner Card Frame */}
      <div 
        className="absolute inset-0 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 overflow-hidden z-10"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-b ${item.color} to-transparent opacity-20 group-hover:opacity-50 transition-opacity duration-700`} />
        
        {/* Holographic grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50" />
      </div>

      {/* 3D Image Layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center p-8 z-30 pointer-events-none"
        style={{ transform: "translateZ(80px)" }}
      >
        <img 
          src={item.image} 
          alt={item.name}
          className="h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Header Tags */}
      <div 
        className="absolute top-6 right-6 z-40 pointer-events-none"
        style={{ transform: "translateZ(60px)" }}
      >
        <span className={`text-[10px] font-black uppercase tracking-[0.3em] bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg ${item.accent}`}>
          {item.type}
        </span>
      </div>

      {/* Card Content Base */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-6 z-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none rounded-b-2xl border-t border-white/5"
        style={{ transform: "translateZ(50px)" }}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-bold mb-1 block">
          {item.series}
        </span>
        <h3 className="text-3xl font-black text-white tracking-tighter mb-4 drop-shadow-md">
          {item.name}
        </h3>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="flex flex-col items-center bg-black/40 rounded-lg py-2 border border-white/5">
            <Zap className="h-3 w-3 text-white/30 mb-1" />
            <span className="text-sm font-mono text-white">{item.stats.power}</span>
          </div>
          <div className="flex flex-col items-center bg-black/40 rounded-lg py-2 border border-white/5">
            <Star className="h-3 w-3 text-white/30 mb-1" />
            <span className="text-sm font-mono text-white">{item.stats.speed}</span>
          </div>
          <div className="flex flex-col items-center bg-black/40 rounded-lg py-2 border border-white/5">
            <Shield className="h-3 w-3 text-white/30 mb-1" />
            <span className="text-sm font-mono text-white">{item.stats.defense}</span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-white transition-colors">
            Acquire
          </span>
          <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20">
            <span className="text-lg font-mono font-bold text-emerald-400">{item.cost}</span>
            <Coins className="w-4 h-4 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ShopPage() {
  return (
    <AuroraBackground showRadialGradient={true} animationSpeed={40}>
      <div className="relative z-10 w-full max-w-7xl px-6 py-16 md:py-32 lg:py-40 mx-auto min-h-[calc(100vh-80px)] flex flex-col items-center">
        
        {/* Header Area */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <h1 className="branding-title text-5xl md:text-7xl mb-3 text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]">ARSENAL</h1>
            <p className="tagline tracking-[0.5em] text-white/40 text-[10px] md:text-[12px]">
              UNLOCK LEGENDARY ARENA OPERATIVES
            </p>
          </div>
          
          <div className="flex items-center gap-6 bg-black/40 border border-white/10 px-8 py-4 rounded-2xl backdrop-blur-md">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-1">Available Credits</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl md:text-4xl font-mono font-black text-white tracking-tighter">12,450</span>
                <Coins className="h-8 w-8 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters / Search */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-16 gap-6 border-b border-white/10 pb-6">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 bg-black/40 p-2 rounded-full border border-white/5 backdrop-blur-md">
            {['ALL', 'LEGENDARY', 'EPIC', 'MYTHIC'].map((tab, i) => (
              <button key={tab} className={`px-6 py-2 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] transition-all ${i === 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="relative group w-full sm:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH CATALOG..." 
              className="w-full sm:w-64 bg-black/60 border border-white/10 rounded-full py-3 pl-12 pr-6 text-[11px] font-mono uppercase tracking-[0.2em] text-white placeholder:text-white/20 outline-none focus:border-emerald-500/50 transition-colors backdrop-blur-md"
            />
          </div>
        </div>

        {/* Grid Area */}
        <div style={{ perspective: "2000px" }} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 lg:gap-16 w-full">
            {shopItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <TiltCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </AuroraBackground>
  );
}
