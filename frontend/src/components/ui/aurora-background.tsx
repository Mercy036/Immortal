"use client"

import type React from "react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
  /** Animation duration in seconds. Default is 60s for subtle movement. Use lower values (10-20s) for more visible animation. */
  animationSpeed?: number
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  animationSpeed = 60,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex min-h-screen flex-col items-center bg-[#050505] text-white",
          className,
        )}
        {...(props as any)}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#1a1a1a_10%,#3a3a3a_15%,#5a5a5a_20%,#3a3a3a_25%,#1a1a1a_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",

              "--color-1": "#1a1a1a",
              "--color-2": "#3a3a3a",
              "--color-3": "#5a5a5a",
              "--color-4": "#3a3a3a",
              "--color-5": "#1a1a1a",
              "--black": "#000",
              "--transparent": "transparent",
              "--animation-speed": `${animationSpeed}s`,
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `pointer-events-none absolute -inset-[10px] [background-image:var(--dark-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-80 blur-[40px] filter will-change-transform`,
              `after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-lighten after:content-[""]`,
              "after:[animation:aurora_var(--animation-speed)_linear_infinite]",
              showRadialGradient &&
                "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]",
            )}
          />
        </div>
        <div className="relative z-50 w-full aurora-layout-wrapper">
          <div className="aurora-content-container">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
