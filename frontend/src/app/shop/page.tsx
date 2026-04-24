"use client"

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Coins, Zap, Star, Shield, Search } from "lucide-react";
import { motion } from "framer-motion";

const shopItems = [
  {
    id: 1,
    name: "Son Goku",
    series: "Dragon Ball Z",
    cost: 5000,
    type: "Legendary",
    stats: { power: 99, speed: 95, defense: 90 },
    image: "https://api.dicebear.com/7.x/pixel-art/svg?seed=gokuzz&backgroundColor=transparent",
    color: "from-orange-500/20 to-transparent",
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
    color: "from-yellow-500/20 to-transparent",
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
    color: "from-red-500/20 to-transparent",
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
    color: "from-blue-500/20 to-transparent",
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
    color: "from-purple-500/20 to-transparent",
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
    color: "from-emerald-500/20 to-transparent",
    accent: "text-emerald-400"
  },
];

export default function ShopPage() {
  return (
    <AuroraBackground showRadialGradient={true} animationSpeed={40}>
      <div className="relative z-10 w-full max-w-7xl px-4 py-20 md:py-32 mx-auto min-h-screen flex flex-col items-center">
        
        {/* Header Area */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <h1 className="branding-title text-4xl md:text-6xl mb-3 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">ITEM SHOP</h1>
            <p className="tagline tracking-[0.5em] text-white/40 text-[10px] md:text-[11px]">
              UNLOCK LEGENDARY ARENA FIGHTERS
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold mb-1">Your Balance</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-white tracking-tighter">12,450</span>
                <Coins className="h-6 w-6 text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters / Search */}
        <div className="w-full flex items-center justify-between mb-10 border-b border-white/5 pb-6">
          <div className="flex gap-6">
            {['ALL', 'LEGENDARY', 'EPIC', 'MYTHIC'].map((tab, i) => (
              <button key={tab} className={`text-[10px] font-bold uppercase tracking-[0.2em] ${i === 0 ? 'text-emerald-400' : 'text-white/30 hover:text-white transition-colors'}`}>
                {tab}
              </button>
            ))}
          </div>
          <button className="text-white/30 hover:text-white transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {shopItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col rounded-2xl bg-black/40 backdrop-blur-xl overflow-hidden hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-b ${item.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
              
              {/* Image Container */}
              <div className="relative h-64 w-full flex items-center justify-center p-8">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="h-full w-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${item.accent}`}>
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="relative p-6 border-t border-white/5 bg-gradient-to-b from-transparent to-black/60 flex flex-col flex-1">
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold mb-1">
                  {item.series}
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight mb-6">
                  {item.name}
                </h3>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-8 border-t border-white/5 pt-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-white/30 mb-1">
                      <Zap className="h-3 w-3" />
                      <span className="text-[8px] font-bold uppercase tracking-widest">ATK</span>
                    </div>
                    <span className="text-sm font-mono text-white/90">{item.stats.power}</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-white/5">
                    <div className="flex items-center gap-1 text-white/30 mb-1">
                      <Star className="h-3 w-3" />
                      <span className="text-[8px] font-bold uppercase tracking-widest">SPD</span>
                    </div>
                    <span className="text-sm font-mono text-white/90">{item.stats.speed}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-white/30 mb-1">
                      <Shield className="h-3 w-3" />
                      <span className="text-[8px] font-bold uppercase tracking-widest">DEF</span>
                    </div>
                    <span className="text-sm font-mono text-white/90">{item.stats.defense}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                    <span>Unlock</span>
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <span>{item.cost}</span>
                      <Coins className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
}
