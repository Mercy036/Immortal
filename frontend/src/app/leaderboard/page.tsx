"use client";

import { useEffect, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Podium from "@/components/ui/podium";
import { Zap, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLeaderboard()
      .then(data => {
        // Map backend data to frontend format strictly
        const formattedPlayers = data.map((user: any, index: number) => ({
          rank: index + 1,
          name: user.username,
          elo: user.rating,
        }));
        setPlayers(formattedPlayers);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <AuroraBackground showRadialGradient={true} animationSpeed={30}>
      <div className="relative z-10 w-full max-w-5xl px-6 py-16 md:py-32 lg:py-40 mx-auto min-h-[calc(100vh-80px)] flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="branding-title text-4xl md:text-6xl mb-4 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">LEADERBOARD</h1>
          <p className="tagline tracking-[0.5em] text-white/40 text-[10px] md:text-[12px] uppercase">
            Global Rankings // Elite Operatives
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : players.length === 0 ? (
          <div className="text-white/40 text-sm font-mono uppercase tracking-widest">No players found</div>
        ) : (
          <>
            {/* Podium */}
            {players.length >= 3 && (
              <div className="w-full max-w-3xl mb-16">
                <Podium players={players.slice(0, 3)} />
              </div>
            )}

            {/* Premium List Container */}
            <div className="w-full max-w-3xl relative">
              {/* Cyber-frame */}
              <div className="absolute -inset-[1px] bg-gradient-to-b from-emerald-500/20 via-transparent to-transparent rounded-3xl pointer-events-none blur-[1px]" />
              
              <div className="bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] flex flex-col w-full">
                
                {/* List Header */}
                <div className="grid grid-cols-12 gap-4 px-8 py-6 border-b border-white/10 bg-white/5 text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/50 font-black">
                  <div className="col-span-2 text-center">Rank</div>
                  <div className="col-span-6 md:col-span-7">Operative Identity</div>
                  <div className="col-span-4 md:col-span-3 text-right">Global Rating</div>
                </div>

                {/* Player Rows */}
                <div className="flex flex-col w-full">
                  {players.map((player) => {
                    const isTopThree = player.rank <= 3;
                    
                    return (
                      <div 
                        key={player.name}
                        className={`relative grid grid-cols-12 gap-4 px-6 md:px-8 py-5 items-center border-b border-white/5 hover:bg-white/5 transition-all group cursor-default
                          ${isTopThree ? "bg-gradient-to-r from-emerald-500/[0.05] to-transparent" : ""}
                        `}
                      >
                        {/* Rank */}
                        <div className="col-span-2 text-center flex justify-center items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-black tracking-widest
                            ${player.rank === 1 ? "bg-amber-500/20 text-amber-400 border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.4)]" : 
                              player.rank === 2 ? "bg-slate-300/20 text-slate-300 border border-slate-300/50 shadow-[0_0_20px_rgba(203,213,225,0.4)]" : 
                              player.rank === 3 ? "bg-amber-700/20 text-amber-600 border border-amber-700/50 shadow-[0_0_20px_rgba(180,83,9,0.4)]" : 
                              "text-white/30 border border-white/10 bg-white/5 group-hover:border-white/20"}`}
                          >
                            {player.rank}
                          </div>
                        </div>
                        
                        {/* Player Info */}
                        <div className="col-span-6 md:col-span-7 flex items-center gap-6">
                          <div className={`relative h-12 w-12 md:h-14 md:w-14 rounded-2xl overflow-hidden shrink-0 border
                            ${isTopThree ? "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "border-white/10"}`}
                          >
                            <div className="absolute inset-0 bg-black/50" />
                            <img 
                              src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${player.name}`} 
                              alt=""
                              className="relative z-10 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {isTopThree && (
                              <div className="absolute inset-0 z-20 bg-gradient-to-br from-emerald-400/20 to-transparent mix-blend-overlay" />
                            )}
                          </div>
                          <span className={`font-black uppercase tracking-[0.2em] text-[12px] md:text-[14px] truncate
                            ${isTopThree ? "text-white" : "text-white/70"} group-hover:text-emerald-400 transition-colors`}
                          >
                            {player.name}
                          </span>
                        </div>
                        
                        {/* Rating */}
                        <div className="col-span-4 md:col-span-3 flex justify-end items-center">
                          <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-colors
                            ${isTopThree ? "bg-emerald-500/10 border-emerald-500/20" : "bg-black/40 border-white/5 group-hover:border-white/10"}`}
                          >
                            <span className={`font-mono font-bold text-[14px] md:text-[16px] transition-colors
                              ${isTopThree ? "text-emerald-400" : "text-white/80 group-hover:text-emerald-400"}`}
                            >
                              {player.elo}
                            </span>
                            <Zap className={`w-4 h-4 transition-colors
                              ${isTopThree ? "text-emerald-500 animate-pulse drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" : "text-white/20 group-hover:text-emerald-500"}`} 
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
              </div>
            </div>
          </>
        )}
      </div>
    </AuroraBackground>
  );
}
