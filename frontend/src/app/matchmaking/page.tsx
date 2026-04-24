"use client"

import { useState, useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, ShieldCheck, Zap, Users, Swords, Loader2 } from "lucide-react";

export default function MatchmakingPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const userCode = "IMM-9X2L-44PR";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSearching) {
      interval = setInterval(() => {
        setSearchTime(prev => prev + 1);
      }, 1000);
    } else {
      setSearchTime(0);
    }
    return () => clearInterval(interval);
  }, [isSearching]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AuroraBackground showRadialGradient={true} animationSpeed={15}>
      <div className="relative z-10 w-full max-w-4xl px-4 py-20 md:py-32 mx-auto min-h-screen flex flex-col items-center justify-center">
        
        {/* Connection Status Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mb-20">
          
          {/* User Code Card */}
          <div className="relative rounded-3xl bg-black/60 border border-emerald-500/10 p-8 backdrop-blur-xl group hover:border-emerald-500/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-3xl pointer-events-none opacity-50" />
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50">Your Identity Protocol</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between bg-black/80 rounded-2xl p-5 border border-white/5 group-hover:border-emerald-500/20 transition-colors">
                <span className="text-xl md:text-2xl font-mono font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{userCode}</span>
                <button className="text-white/20 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-emerald-500/80 font-bold bg-emerald-500/5 py-2 px-4 rounded-full w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Authenticated & Ready
            </div>
          </div>

          {/* Receiver / Connection Card */}
          <div className="relative rounded-3xl bg-black/40 border border-white/5 p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <Users className="h-4 w-4 text-white/40" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Direct Connection</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <input 
                type="text"
                placeholder="ENTER OPPONENT CODE..."
                className="w-full bg-black/80 rounded-2xl px-5 py-5 border border-white/5 focus:border-emerald-500/50 outline-none text-lg font-mono text-white placeholder:text-white/20 placeholder:text-[12px] placeholder:tracking-[0.2em] transition-all"
              />
            </div>
            
            <button className="w-full mt-6 py-4 rounded-2xl bg-white text-[11px] uppercase tracking-[0.4em] font-black text-black hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all">
              Initiate Link
            </button>
          </div>

        </div>

        {/* Global Matchmaking Trigger */}
        <div className="flex flex-col items-center justify-center w-full min-h-[300px]">
          <AnimatePresence mode="wait">
            {!isSearching ? (
              <motion.button
                key="start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                onClick={() => setIsSearching(true)}
                className="group relative flex flex-col items-center gap-8"
              >
                <div className="relative flex items-center justify-center">
                  {/* Outer glowing rings */}
                  <div className="absolute inset-[-40px] rounded-full border border-emerald-500/10 scale-100 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-[-20px] rounded-full border border-emerald-500/20 scale-100 group-hover:scale-110 transition-transform duration-500" />
                  
                  <div className="relative h-28 w-28 flex items-center justify-center rounded-full bg-emerald-500 text-black shadow-[0_0_80px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_120px_rgba(16,185,129,0.6)] group-hover:scale-105 transition-all duration-300">
                    <Swords className="h-10 w-10" />
                    <div className="absolute inset-0 rounded-full border-2 border-white mix-blend-overlay" />
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-3">
                  <span className="text-3xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Enter Global Arena</span>
                  <span className="text-[10px] uppercase tracking-[0.5em] text-emerald-500/60 font-bold bg-emerald-500/10 py-1.5 px-4 rounded-full">Standard Queue</span>
                </div>
              </motion.button>
            ) : (
              <motion.div
                key="searching"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-10"
              >
                <div className="relative h-40 w-40 flex items-center justify-center">
                  <Loader2 className="h-12 w-12 text-emerald-500 animate-spin" />
                  
                  {/* Radar effect */}
                  <div className="absolute inset-0 rounded-full border border-emerald-500/20" />
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(16,185,129,0.3)_360deg)] animate-spin" />
                  
                  <svg className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] -rotate-90">
                    <motion.circle 
                      cx="50%" cy="50%" r="48%" 
                      stroke="currentColor" strokeWidth="1" fill="transparent"
                      strokeDasharray="400"
                      initial={{ strokeDashoffset: 400 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="text-emerald-500/50"
                    />
                  </svg>
                </div>
                
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-2xl font-black text-white tracking-widest uppercase">Searching</span>
                  </div>
                  <span className="text-[12px] font-mono text-emerald-500/60 tracking-[0.4em] font-bold bg-emerald-500/10 py-2 px-5 rounded-lg border border-emerald-500/20">
                    ELAPSED // {formatTime(searchTime)}
                  </span>
                </div>

                <button 
                  onClick={() => setIsSearching(false)}
                  className="mt-6 px-8 py-3 rounded-xl border border-red-500/20 text-[9px] uppercase tracking-[0.3em] font-bold text-red-400/60 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/40 transition-all"
                >
                  Abort Search Protocol
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </AuroraBackground>
  );
}
