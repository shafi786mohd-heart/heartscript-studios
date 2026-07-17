import React from "react";
import { Hammer, Bot, ShieldAlert, FileCode } from "lucide-react";

interface NavbarProps {
  onNavChange: (section: string) => void;
  activeSection: string;
  onOpenAdvisor: () => void;
  onOpenLeads: () => void;
  leadsCount: number;
}

export default function Navbar({
  onNavChange,
  activeSection,
  onOpenAdvisor,
  onOpenLeads,
  leadsCount,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex flex-col cursor-pointer" onClick={() => onNavChange("home")}>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-sky-500 rounded-md text-slate-950 font-bold tracking-wider text-sm flex items-center justify-center">
              E
            </span>
            <span className="font-sans font-bold text-xl tracking-tight text-white">
              ELEVATECH
            </span>
            <span className="text-xs text-sky-400 font-mono font-medium tracking-wide border border-sky-500/30 px-1.5 py-0.5 rounded ml-1 bg-sky-950/40">
              LLP
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-0.5 ml-0.5">
            Enabling Technologies for Elevator
          </span>
        </div>

        {/* Navigation items */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onNavChange("home")}
            className={`text-sm font-sans font-medium tracking-wide hover:text-sky-400 transition-colors ${
              activeSection === "home" ? "text-sky-400 font-semibold" : "text-slate-300"
            }`}
          >
            Solutions Explorer
          </button>
          <button
            onClick={() => onNavChange("builder")}
            className={`text-sm font-sans font-medium tracking-wide hover:text-sky-400 transition-colors ${
              activeSection === "builder" ? "text-sky-400 font-semibold" : "text-slate-300"
            }`}
          >
            Cabin Configurator
          </button>
          <button
            onClick={() => onNavChange("knowledge")}
            className={`text-sm font-sans font-medium tracking-wide hover:text-sky-400 transition-colors ${
              activeSection === "knowledge" ? "text-sky-400 font-semibold" : "text-slate-300"
            }`}
          >
            Engineering Articles
          </button>
        </div>

        {/* Dynamic CTAs / Toolbars */}
        <div className="flex items-center gap-3">
          {/* AI Advisor Trigger */}
          <button
            onClick={onOpenAdvisor}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs px-3.5 py-2 rounded-md font-medium tracking-wide transition-all shadow-md shadow-sky-900/10 active:scale-[0.98]"
          >
            <Bot className="w-4 h-4 animate-pulse" />
            <span className="hidden sm:inline">Consult AI Advisor</span>
          </button>

          {/* Admin Leads View Trigger */}
          <button
            onClick={onOpenLeads}
            className="relative flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3.5 py-2 rounded-md font-medium tracking-wide transition-colors border border-slate-700/60"
            title="Open B2B Lead Admin Console"
          >
            <ShieldAlert className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">CRM Leads</span>
            {leadsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white animate-bounce">
                {leadsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
