import { AuroraBackground } from "@/components/ui/aurora-background";
import { User, Mail, Shield, Trophy, Activity, Calendar } from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Shourya523",
    email: "shourya@immortal.labs",
    elo: 1240,
    rank: "Platinum III",
    joined: "April 2026",
    stats: {
      matches: 156,
      wins: 89,
      ratio: "57%",
    },
    history: [
      { id: 1, opponent: "marion_s", result: "Victory", elo: "+24", date: "2h ago" },
      { id: 2, opponent: "shannon_k", result: "Defeat", elo: "-18", date: "5h ago" },
      { id: 3, opponent: "billy_mraz", result: "Victory", elo: "+21", date: "1d ago" },
    ]
  };

  return (
    <AuroraBackground showRadialGradient={true} animationSpeed={50}>
      <div className="relative z-10 w-full max-w-5xl px-4 py-20 md:py-32 mx-auto min-h-screen">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center">
          
          {/* Main ID Card */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-3xl bg-black/60 border border-emerald-500/10 p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {/* Decorative Header Glow */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-500/20 to-transparent" />
              
              <div className="relative flex flex-col items-center text-center mt-4">
                <div className="relative h-32 w-32 mb-6 rounded-2xl border border-emerald-500/30 overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-black/50">
                  <img 
                    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.name}&backgroundColor=transparent`} 
                    alt=""
                    className="h-full w-full object-cover p-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
                
                <h2 className="text-3xl font-black text-white tracking-tight uppercase mb-1 drop-shadow-lg">
                  {user.name}
                </h2>
                <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-400 font-bold mb-8">
                  {user.rank}
                </span>

                <div className="w-full flex flex-col gap-4">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-medium border-b border-white/5 pb-3">
                    <span className="text-white/30 flex items-center gap-2"><Mail className="w-3 h-3" /> Email</span>
                    <span className="text-white/70">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-medium border-b border-white/5 pb-3">
                    <span className="text-white/30 flex items-center gap-2"><Calendar className="w-3 h-3" /> Joined</span>
                    <span className="text-white/70">{user.joined}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-medium pt-1">
                    <span className="text-white/30 flex items-center gap-2"><Shield className="w-3 h-3" /> Current Elo</span>
                    <span className="text-emerald-400 font-mono text-base font-bold">{user.elo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="flex-1 w-full flex flex-col gap-8">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Matches", value: user.stats.matches, icon: Activity },
                { label: "Victories", value: user.stats.wins, icon: Trophy },
                { label: "Win Rate", value: user.stats.ratio, icon: Shield },
              ].map((stat) => (
                <div key={stat.label} className="relative rounded-2xl bg-black/40 border border-white/5 p-6 backdrop-blur-xl overflow-hidden group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  <div className="relative flex flex-col gap-4">
                    <stat.icon className="h-5 w-5 text-emerald-500/50 group-hover:text-emerald-400 transition-colors" />
                    <div>
                      <span className="text-3xl font-black text-white block mb-1">{stat.value}</span>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">{stat.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Match History */}
            <div className="rounded-3xl bg-black/40 border border-white/5 backdrop-blur-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/50">Recent Engagements</h3>
                <button className="text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-500/50 hover:text-emerald-400 transition-colors">View Logs</button>
              </div>
              
              <div className="flex flex-col gap-2">
                {user.history.map((match) => (
                  <div key={match.id} className="group flex items-center justify-between rounded-xl p-4 hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                    <div className="flex items-center gap-6">
                      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5">
                        <div className={`absolute inset-0 rounded-full blur-md opacity-20 ${match.result === "Victory" ? "bg-emerald-500" : "bg-red-500"}`} />
                        <span className={`h-2.5 w-2.5 rounded-full ${match.result === "Victory" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]"}`} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-white/80 uppercase tracking-wider">vs {match.opponent}</span>
                        <span className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1">{match.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${match.result === "Victory" ? "text-emerald-500/70" : "text-red-500/70"}`}>
                        {match.result}
                      </span>
                      <span className={`text-[14px] font-mono font-bold w-12 text-right ${match.elo.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
                        {match.elo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
