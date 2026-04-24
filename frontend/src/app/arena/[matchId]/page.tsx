"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Play, Terminal, Target, Loader2, AlertTriangle, CheckCircle2, Swords } from "lucide-react";

export default function ArenaPage() {
  const { matchId } = useParams();
  const router = useRouter();
  const [matchData, setMatchData] = useState<any>(null);
  const [code, setCode] = useState("public class Main {\n    public static void main(String[] args) {\n        // Enter your solution here\n    }\n}");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // Fetch match data
    api.getMatchResult(Number(matchId))
      .then(data => {
        setMatchData(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [matchId]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResult(null);
    try {
      const submissionResult = await api.submitCode({
        matchId: Number(matchId),
        code: code,
        language: "java"
      });
      
      setResult(submissionResult);
      setIsSubmitting(false);
      
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (!matchData) {
    return (
      <AuroraBackground showRadialGradient={true}>
        <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50 animate-pulse">Initializing Arena...</span>
          </div>
        </div>
      </AuroraBackground>
    );
  }

  return (
    <AuroraBackground showRadialGradient={true} animationSpeed={20}>
      <div className="relative z-10 w-full min-h-[calc(100vh-80px)] p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Left Panel: Match & Problem Info (1/3 width) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 h-[calc(100vh-140px)]">
          <div className="flex-1 rounded-3xl bg-black/60 border border-white/5 backdrop-blur-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            
            <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-6">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Target className="text-emerald-400 h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-black uppercase tracking-widest text-white drop-shadow-md">
                    {matchData.problemTitle || "Problem Statement"}
                  </h1>
                  <span className="text-[10px] text-emerald-500/70 font-bold tracking-[0.3em] uppercase">Target Acquired</span>
                </div>
              </div>
              
              <div className="text-white/70 text-sm leading-loose font-sans flex-1">
                <p className="whitespace-pre-wrap">{matchData.problemDescription || "Loading problem description..."}</p>
              </div>

              {/* Combatants Info */}
              <div className="mt-8 border border-white/5 rounded-2xl bg-white/[0.02] p-4 flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Swords className="w-24 h-24" />
                </div>
                <div className="flex justify-between items-center z-10">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Player 1</span>
                    <span className="text-sm font-mono text-emerald-400 font-bold">{matchData.player1}</span>
                  </div>
                  <span className="text-xs font-black italic text-red-500/80">VS</span>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Player 2</span>
                    <span className="text-sm font-mono text-emerald-400 font-bold">{matchData.player2}</span>
                  </div>
                </div>
                
                <div className="h-[1px] w-full bg-white/5" />
                
                <div className="flex justify-between items-center z-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Match Status</span>
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-[0.2em]">{matchData.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Editor & Console (2/3 width) */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6 h-[calc(100vh-140px)]">
          
          {/* Code Editor */}
          <div className="flex-[3] rounded-3xl bg-[#0a0a0a]/90 border border-white/5 backdrop-blur-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group">
            
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Terminal className="text-emerald-500/50 w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">System Terminal <span className="text-emerald-500/50">//</span> Java</span>
              </div>
              
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group/btn relative overflow-hidden flex items-center gap-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-6 py-2.5 rounded-xl uppercase text-[11px] font-black tracking-[0.2em] transition-all disabled:opacity-50 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {isSubmitting ? "Executing..." : "SUBMIT CODE"}
              </button>
            </div>
            
            {/* Textarea */}
            <div className="relative flex-1 bg-[#050505] p-2">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="absolute inset-0 w-full h-full bg-transparent p-6 font-mono text-[13px] md:text-sm text-emerald-50 outline-none resize-none leading-loose selection:bg-emerald-500/30 placeholder:text-white/10"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Console / Output */}
          <motion.div 
            initial={{ height: "120px" }}
            animate={{ height: result ? "220px" : "120px" }}
            className="rounded-3xl bg-black/80 border border-white/5 backdrop-blur-2xl flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center gap-3 px-6 py-4 bg-white/[0.02] border-b border-white/5">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Execution Output</span>
            </div>
            <div className="p-6 font-mono text-[11px] md:text-xs overflow-y-auto flex-1">
              {!result && !isSubmitting && (
                <div className="flex items-center gap-2 text-white/20">
                  <span className="text-emerald-500/50">&gt;</span> Awaiting compilation sequence...
                </div>
              )}
              {isSubmitting && (
                <div className="flex items-center gap-2 text-emerald-500/70 animate-pulse">
                  <span className="text-emerald-500">&gt;</span> Compiling protocol and running test cases...
                </div>
              )}
              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3 border border-white/5 bg-white/[0.02] p-3 rounded-xl w-max pr-8">
                    {result.status === "ACCEPTED" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    )}
                    <span className={`font-bold tracking-widest text-sm ${result.status === "ACCEPTED" ? "text-emerald-400" : "text-red-400"}`}>
                      {result.status}
                    </span>
                  </div>
                  
                  {result.executionTime && (
                    <div className="flex gap-6 mt-2 pl-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Execution Time</span>
                        <span className="text-white/70 font-bold">{result.executionTime}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Memory Usage</span>
                        <span className="text-white/70 font-bold">{result.memory}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
          
        </div>

      </div>
    </AuroraBackground>
  );
}
