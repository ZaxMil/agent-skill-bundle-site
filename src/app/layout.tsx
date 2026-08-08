import type { Metadata } from "next";
import { Cinzel, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent Skill Bundle — 116 Curated Skills for AI Agents",
  description:
    "116 battle-tested agent skills across design, security, process, multiplayer, WordPress, marketing, and QA. One command to install. Zero vibe-coding mistakes.",
  metadataBase: new URL("https://zax-million.github.io/agent-skill-bundle"),
  openGraph: {
    title: "Agent Skill Bundle — 116 Curated Skills",
    description:
      "Design quality, security audits, process discipline — installed in one command.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#07070c] text-[#e8e6f0]">
        {children}
      </body>
    </html>
  );
}
