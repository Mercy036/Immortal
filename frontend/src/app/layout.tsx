import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavMenu from "@/components/nav-menu";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Immortal | The Ultimate Coding Arena",
  description: "A gamified coding platform for competitive PvP scenarios. Solve problems, master complexity, and dominate the arena.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={outfit.variable}>
        {/* Global Navigation Header */}
        <header className="fixed top-8 left-0 right-0 px-10 md:px-20 lg:px-32 flex items-center justify-between z-[100]">
          {/* Branding (Left) */}
          <div className="flex items-center gap-4 min-w-[120px]">
            <div className="h-2 w-2 rounded-full bg-white/20 animate-pulse"></div>
            <div className="text-[10px] md:text-[11px] font-bold tracking-[0.5em] text-white/50 uppercase">
              Immortal
            </div>
          </div>
          
          {/* Animated Nav Menu (Center) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <NavMenu />
          </div>
          
          {/* Spacer for balance */}
          <div className="min-w-[120px]"></div>
        </header>

        {children}
      </body>
    </html>
  );
}
