"use client";

import { useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { Lock, User, Mail, ShieldCheck, Zap, AlertTriangle } from "lucide-react";
import { api, setToken } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await api.signup(formData);
      if (data.token) {
        setToken(data.token);
        router.push("/matchmaking");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuroraBackground showRadialGradient={true} animationSpeed={20}>
      <div className="relative z-10 min-h-[calc(100vh-80px)] w-full flex items-center justify-center px-6 py-16 md:py-32 lg:py-40">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative"
        >
          {/* Cyberpunk HUD Frame */}
          <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 via-transparent to-emerald-500/10 rounded-3xl blur-xl" />
          
          <div className="relative bg-black/80 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden">
            {/* Top decorative bar */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
            
            <div className="p-8 md:p-10">
              <div className="flex flex-col items-center mb-10 text-center">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <Zap className="h-8 w-8 text-emerald-400" />
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  Initialize
                </h1>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">
                  Create your protocol identity
                </p>
              </div>

              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                  <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-mono text-red-400 uppercase tracking-wider">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="USERNAME"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-[12px] font-mono tracking-[0.2em] text-white outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="EMAIL"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-[12px] font-mono tracking-[0.2em] text-white outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="PASSWORD"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-[12px] font-mono tracking-[0.2em] text-white outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all placeholder:text-white/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 group relative w-full flex items-center justify-center gap-3 rounded-xl bg-white py-4 text-[12px] font-black uppercase tracking-[0.3em] text-black transition-all hover:bg-emerald-400 disabled:opacity-50 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] overflow-hidden"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  
                  {loading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Register Protocol
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/5 pt-8">
                <p className="text-[10px] uppercase tracking-widest text-white/30">
                  Already authenticated?
                </p>
                <Link 
                  href="/login"
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </AuroraBackground>
  );
}
