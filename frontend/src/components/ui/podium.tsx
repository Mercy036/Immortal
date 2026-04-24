"use client"

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PodiumPlayer {
  rank: number;
  name: string;
  elo: number;
  tokens: number;
  avatar?: string;
}

interface PodiumProps {
  players: PodiumPlayer[];
}

export default function Podium({ players }: PodiumProps) {
  // Sort players to ensure 1st is in middle, 2nd on left, 3rd on right
  const podiumOrder = [
    players.find(p => p.rank === 2),
    players.find(p => p.rank === 1),
    players.find(p => p.rank === 3),
  ].filter(Boolean) as PodiumPlayer[];

  return (
    <div className="flex items-end justify-center gap-4 md:gap-10 h-[300px] mb-20 px-4">
      {podiumOrder.map((player) => (
        <motion.div
          key={player.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: player.rank * 0.2 }}
          className="relative flex flex-col items-center"
        >
          {/* Avatar Area */}
          <div className={cn(
            "relative w-16 h-16 md:w-24 md:h-24 rounded-xl border-2 mb-4 overflow-hidden shadow-2xl",
            player.rank === 1 ? "border-emerald-500 shadow-emerald-500/20 w-20 h-20 md:w-32 md:h-32" : "border-white/10"
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <img 
              src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${player.name}`} 
              alt={player.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Player Info */}
          <div className="text-center">
            <div className={cn(
              "text-[10px] uppercase tracking-[0.2em] font-bold mb-1",
              player.rank === 1 ? "text-emerald-400" : "text-white/40"
            )}>
              [{player.rank}] {player.name}
            </div>
            <div className="text-xl md:text-2xl font-black text-white">
              {player.elo.toLocaleString()}
            </div>
            <div className="text-[9px] uppercase tracking-[0.1em] text-white/20 font-medium">
              ELO RATING
            </div>
          </div>

          {/* Podium Base */}
          <div 
            className={cn(
              "absolute -bottom-[20px] w-32 md:w-48 bg-gradient-to-t from-white/5 to-transparent border-x border-t border-white/5 rounded-t-2xl -z-10",
              player.rank === 1 ? "h-[120px]" : player.rank === 2 ? "h-[80px]" : "h-[60px]"
            )}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
