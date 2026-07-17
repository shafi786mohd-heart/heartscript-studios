import React from "react";
import { Hammer, Globe, Shield, Phone, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onNavChange: (section: string) => void;
}

export default function Footer({ onNavChange }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-100 border-t border-slate-900 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Brand Block (5 Cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-sky-500 rounded-md text-slate-950 font-bold tracking-wider text-xs flex items-center justify-center">
              E
            </span>
            <span className="font-sans font-bold text-lg tracking-tight text-white">
              ELEVATECH LLP
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block">
            Enabling Technologies for Elevator
          </span>

          <p className="text-xs text-slate-400 font-sans font-light leading-relaxed max-w-sm">
            Elevatech is an engineering pioneer curating and developing high-performance cabin climate, security communication, and predictive IoT integrations. We specialize in transforming generic vertical transportation into elite, secure occupant transits.
          </p>

          <div className="flex gap-4 text-xs font-mono text-slate-500 pt-2">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-sky-500/50" />
              <span>ISO 9001:2015</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-sky-500/50" />
              <span>EU Standards Compliant</span>
            </div>
          </div>
        </div>

        {/* Navigation links (3 Cols) */}
        <div className="md:col-span-3 space-y-3.5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Navigation Map
          </h4>
          <ul className="space-y-2 text-xs font-sans font-light text-slate-400">
            <li>
              <button onClick={() => onNavChange("home")} className="hover:text-sky-400 transition-colors cursor-pointer">
                Technical Solutions Explorer
              </button>
            </li>
            <li>
              <button onClick={() => onNavChange("builder")} className="hover:text-sky-400 transition-colors cursor-pointer">
                Interactive Spec Configurator
              </button>
            </li>
            <li>
              <button onClick={() => onNavChange("knowledge")} className="hover:text-sky-400 transition-colors cursor-pointer">
                Engineering Reference Library
              </button>
            </li>
          </ul>
        </div>

        {/* Corporate contact details (4 Cols) */}
        <div className="md:col-span-4 space-y-3.5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Headquarters & Inquiries
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400 font-sans font-light leading-relaxed">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sky-500/60 shrink-0 mt-0.5" />
              <span>
                Suite 405, Engineering Complex, Tech Park Sector-12, IN.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-500/60 shrink-0" />
              <a href="mailto:solutions@elevatech.engineering" className="hover:text-sky-400 hover:underline">
                solutions@elevatech.engineering
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-500/60 shrink-0" />
              <span>+1 (800) 555-ELEV (3538)</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Underbar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-mono">
        <div>
          © {new Date().getFullYear()} Elevatech LLP. All engineering rights reserved. 
        </div>
        <div className="flex gap-4">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Protocol</span>
          <span>•</span>
          <span className="hover:text-slate-400 cursor-pointer">Technical Warranty Guidelines</span>
        </div>
      </div>
    </footer>
  );
}
