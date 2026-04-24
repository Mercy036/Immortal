import { AuroraBackground } from "@/components/ui/aurora-background";
import { HyperText } from "@/components/ui/hyper-text";
import NavMenu from "@/components/nav-menu";

export default function Home() {
  return (
    <AuroraBackground showRadialGradient={true} animationSpeed={25}>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen">
        <div className="mb-8 inline-flex items-center rounded-full border border-white/5 bg-white/[0.02] px-5 py-2 text-[10px] font-medium tracking-[0.5em] text-white/20 uppercase backdrop-blur-sm">
          System Initialization Active
        </div>
        
        <HyperText 
          className="branding-title text-6xl md:text-[11rem] mb-2 leading-none"
          duration={800}
          infinite={true}
          loopInterval={4000}
        >
          IMMORTAL
        </HyperText>
        
        <p className="tagline max-w-2xl text-white/30 tracking-[0.6em] leading-loose text-[9px] md:text-[11px] uppercase">
          The ERA of Competitive Complexity
        </p>
        
        <div className="mt-32 flex flex-col items-center gap-10">
          <div className="flex items-center gap-10">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-white/10"></div>
            <div className="h-3 w-3 rounded-full border border-white/20 bg-white/5 animate-ping"></div>
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>
          
          <div className="text-[10px] tracking-[0.7em] text-white/10 uppercase font-light cursor-pointer hover:text-white/40 transition-all hover:tracking-[0.9em] duration-1000">
            Press any key to enter the arena
          </div>
        </div>
      </div>

      {/* Redesigned Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 px-10 md:px-20 lg:px-32 py-10 pointer-events-none">
        <div className="absolute top-0 left-32 right-32 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5 order-2 md:order-1">
            <div className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
                Protocol: 036 // Status: Active
              </span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/10 font-medium pl-4">
              Latency: 12ms // Cluster: E-01 // Region: GL-1
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1 order-1 md:order-2">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">
              © 2026 Immortal Labs
            </div>
            <div className="text-[8px] uppercase tracking-[0.2em] text-white/5 font-light">
              All rights reserved // Secure Connection
            </div>
          </div>
        </div>
      </footer>

      {/* Decorative Corner Lines */}
      <div className="fixed top-0 left-0 w-24 h-24 border-t border-l border-white/5 pointer-events-none z-10 m-8"></div>
      <div className="fixed top-0 right-0 w-24 h-24 border-t border-r border-white/5 pointer-events-none z-10 m-8"></div>
      <div className="fixed bottom-0 left-0 w-24 h-24 border-b border-l border-white/5 pointer-events-none z-10 m-8"></div>
      <div className="fixed bottom-0 right-0 w-24 h-24 border-b border-r border-white/5 pointer-events-none z-10 m-8"></div>
    </AuroraBackground>
  );
}
