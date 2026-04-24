import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
        {children}
      </body>
    </html>
  );
}
