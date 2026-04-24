"use client";
import { useState, useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Swords, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { api, isAuthenticated } from "@/lib/api";

export default function MatchmakingPage() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [userCode, setUserCode] = useState("IMM-X00");
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    setUserCode(`IMM-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(Math.random() * 1000)}`);
  }, []);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    let pollInterval: NodeJS.Timeout;

    if (isSearching) {
      if (!isAuthenticated()) {
        setAuthError(true);
        setIsSearching(false);
        return;
      }
      setAuthError(false);

      api.findMatch().catch(err => console.error("Failed to join queue:", err));

      timerInterval = setInterval(() => {
        setSearchTime(prev => prev + 1);
      }, 1000);

      pollInterval = setInterval(async () => {
        try {
          const match = await api.getCurrentMatch();
          if (match && match.id) {
            setIsSearching(false);
            router.push(`/arena/${match.id}`);
          }
        } catch (error) {
          // Keep polling
        }
      }, 2000);
    } else {
      setSearchTime(0);
    }

    return () => {
      clearInterval(timerInterval);
      clearInterval(pollInterval);
    };
  }, [isSearching, router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AuroraBackground showRadialGradient={true} animationSpeed={15}>
      <div className="relative z-10 w-full px-6 py-16 md:py-32 lg:py-40 mx-auto min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
        
        {/* HUD Container */}
        <div className="relative w-full max-w-5xl mx-auto rounded-3xl bg-black/60 border border-white/5 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col">
          {/* Decorative Top Border */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          
          <div className="p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center min-h-[500px]">
            
            {/* Header section inside HUD */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between mb-16 border-b border-white/5 pb-8 gap-6">
              <div className="flex items-center gap-5">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Identity Protocol</span>
                  <span className="text-xl md:text-2xl font-mono font-bold text-white tracking-widest">{userCode}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-emerald-500/80 font-bold bg-emerald-500/5 py-3 px-6 rounded-full border border-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>System Connected</span>
              </div>
            </div>

            {/* Main Action Area */}
            <div className="flex flex-col items-center justify-center w-full flex-1">
              <AnimatePresence mode="wait">
                {!isSearching ? (
                  <motion.div
                    key="start"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="flex flex-col items-center gap-12 w-full max-w-md"
                  >
                    <button
                      onClick={() => setIsSearching(true)}
                      className="group relative w-full flex flex-col items-center gap-10 focus:outline-none"
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Outer glowing rings */}
                        <div className="absolute inset-[-60px] rounded-full border border-emerald-500/5 scale-100 group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-[-30px] rounded-full border border-emerald-500/20 scale-100 group-hover:scale-110 transition-transform duration-700" />
                        
                        <div className="relative h-36 w-36 md:h-48 md:w-48 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-black shadow-[0_0_80px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_120px_rgba(16,185,129,0.7)] group-hover:scale-105 transition-all duration-500 overflow-hidden">
                          {/* Inner shine */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
                          <Swords className="h-14 w-14 md:h-20 md:w-20 relative z-10" />
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center gap-4">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                          Initialize Link
                        </h2>
                        <span className="text-[11px] md:text-[12px] uppercase tracking-[0.5em] text-emerald-400 font-bold bg-emerald-500/10 py-2.5 px-8 rounded-xl border border-emerald-500/20">
                          Global Standard Queue
                        </span>
                      </div>
                      
                      {authError && (
                        <div className="absolute -bottom-20 text-[11px] uppercase tracking-[0.3em] font-bold text-red-500 bg-red-500/10 px-6 py-3 rounded-lg border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse">
                          Authentication Required
                        </div>
                      )}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="searching"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center gap-14 w-full"
                  >
                    <div className="relative h-56 w-56 flex items-center justify-center">
                      <Loader2 className="h-20 w-20 text-emerald-500 animate-spin" />
                      
                      {/* Radar effect */}
                      <div className="absolute inset-0 rounded-full border border-emerald-500/20" />
                      <div className="absolute inset-0 rounded-full border border-emerald-500/10 scale-150" />
                      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(16,185,129,0.3)_360deg)] animate-spin" style={{ animationDuration: '3s' }} />
                      
                      {/* Scanning Ring */}
                      <svg className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] -rotate-90">
                        <motion.circle 
                          cx="50%" cy="50%" r="48%" 
                          stroke="currentColor" strokeWidth="2" fill="transparent"
                          strokeDasharray="500"
                          initial={{ strokeDashoffset: 500 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="text-emerald-400"
                        />
                      </svg>
                    </div>
                    
                    <div className="flex flex-col items-center gap-6 text-center mt-4">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <span className="text-4xl md:text-5xl font-black text-white tracking-[0.2em] uppercase">Searching</span>
                        <div className="flex gap-2 mt-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center gap-3 mt-4">
                        <span className="text-[11px] uppercase tracking-[0.5em] text-emerald-500/60 font-bold">Elapsed Time</span>
                        <span className="text-3xl md:text-4xl font-mono text-emerald-400 tracking-[0.2em] font-bold drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                          {formatTime(searchTime)}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setIsSearching(false)}
                      className="mt-8 px-12 py-5 rounded-xl border border-red-500/20 text-[11px] uppercase tracking-[0.4em] font-bold text-red-400/60 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/40 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                    >
                      Abort Search Protocol
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </div>

      </div>
    </AuroraBackground>
  );
}
