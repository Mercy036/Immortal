import { AuroraBackground } from "@/components/ui/aurora-background";
import Podium from "@/components/ui/podium";
import { Trophy, Shield, Zap } from "lucide-react";

const players = [
  { rank: 1, name: "marion_stiedemann", elo: 1671, won: 45, winRate: "68%", volume: "1.2k" },
  { rank: 2, name: "shannon_kautzer", elo: 1542, won: 38, winRate: "62%", volume: "0.9k" },
  { rank: 3, name: "billy_mraz", elo: 1420, won: 32, winRate: "59%", volume: "0.8k" },
  { rank: 4, name: "arthur_grimes", elo: 1380, won: 28, winRate: "55%", volume: "0.6k" },
  { rank: 5, name: "bernadette_mcl", elo: 1310, won: 25, winRate: "52%", volume: "0.5k" },
  { rank: 6, name: "alberta_spencer", elo: 1250, won: 22, winRate: "50%", volume: "0.4k" },
  { rank: 7, name: "leo_ruecker", elo: 1180, won: 18, winRate: "48%", volume: "0.3k" },
  { rank: 8, name: "rudolph_boehm", elo: 1120, won: 15, winRate: "45%", volume: "0.2k" },
];

export default function LeaderboardPage() {
  return (
    <AuroraBackground showRadialGradient={true} animationSpeed={30}>
      <div className="relative z-10 w-full max-w-5xl px-4 py-20 md:py-32 mx-auto min-h-screen flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="branding-title text-4xl md:text-6xl mb-4 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">LEADERBOARD</h1>
          <p className="tagline tracking-[0.5em] text-white/40 text-[10px] md:text-[12px] uppercase">
            Provide liquidity to the house by purchasing $DGN and earning yield
          </p>
        </div>

        {/* Podium */}
        <div className="w-full max-w-3xl mb-12">
          <Podium players={players.slice(0, 3)} />
        </div>

        {/* Premium List */}
        <div className="w-full mt-10">
          {/* List Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-emerald-500/10 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
            <div className="col-span-2 md:col-span-1 text-center">Rank</div>
            <div className="col-span-5 md:col-span-4">Player</div>
            <div className="col-span-2 hidden md:block text-center">Won</div>
            <div className="col-span-3 md:col-span-2 text-center">Win Rate</div>
            <div className="col-span-2 hidden md:block text-center">Volume</div>
            <div className="col-span-5 md:col-span-1 text-right">Tokens</div>
          </div>

          {/* Current User Row (Pinned) */}
          <div className="grid grid-cols-12 gap-4 px-6 py-5 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent border-l-2 border-emerald-500 text-[11px] md:text-[12px] font-medium items-center mb-4 mt-2">
             <div className="col-span-2 md:col-span-1 text-center text-white/30 uppercase tracking-widest text-[9px]">Unranked</div>
             <div className="col-span-5 md:col-span-4 font-bold text-emerald-400 uppercase tracking-wider">You</div>
             <div className="col-span-2 hidden md:block text-center text-white/50">0</div>
             <div className="col-span-3 md:col-span-2 text-center text-white/50">0.00%</div>
             <div className="col-span-2 hidden md:block text-center text-white/50">0.00</div>
             <div className="col-span-5 md:col-span-1 text-right text-emerald-400 font-mono flex justify-end items-center gap-1.5">
               0 <Zap className="w-3 h-3 text-emerald-500" />
             </div>
          </div>

          {/* Player Rows */}
          <div className="flex flex-col gap-1">
            {players.map((player) => (
              <div 
                key={player.name}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center rounded-lg hover:bg-white/[0.02] transition-colors group cursor-default"
              >
                <div className="col-span-2 md:col-span-1 text-center">
                  <span className={`text-[11px] font-bold ${player.rank <= 3 ? "text-emerald-500" : "text-white/20"}`}>
                    [{player.rank}]
                  </span>
                </div>
                
                <div className="col-span-5 md:col-span-4 flex items-center gap-4">
                  <div className="h-8 w-8 rounded-md bg-black/50 border border-white/5 overflow-hidden group-hover:border-emerald-500/30 transition-colors">
                     <img 
                      src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${player.name}`} 
                      alt=""
                      className="w-full h-full opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  <span className="font-bold text-white/70 group-hover:text-white transition-colors uppercase tracking-wider text-[10px] md:text-[11px]">
                    {player.name}
                  </span>
                </div>
                
                <div className="col-span-2 hidden md:block text-center text-white/40 font-mono text-[11px]">
                  {player.won}
                </div>
                
                <div className="col-span-3 md:col-span-2 text-center text-white/40 font-mono text-[11px]">
                  {player.winRate}
                </div>
                
                <div className="col-span-2 hidden md:block text-center text-white/40 font-mono text-[11px]">
                  {player.volume}
                </div>
                
                <div className="col-span-5 md:col-span-1 text-right flex justify-end items-center gap-1.5 font-mono text-[11px]">
                  <span className="text-white/80 group-hover:text-emerald-400 transition-colors">{player.elo}</span>
                  <Zap className="w-3 h-3 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </AuroraBackground>
  );
}
