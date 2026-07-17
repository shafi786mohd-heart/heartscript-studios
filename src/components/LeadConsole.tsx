import React, { useState, useEffect } from "react";
import { RFQLead } from "../types";
import { ShieldCheck, Mail, Phone, Calendar, Layers, AlertCircle, Sparkles, RefreshCw, Database } from "lucide-react";

interface LeadConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  leads: RFQLead[];
  onRefresh: () => void;
}

export default function LeadConsole({ isOpen, onClose, leads, onRefresh }: LeadConsoleProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      onRefresh();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Calculate dashboard stats
  const totalLeads = leads.length;
  const highPriorityCommercialCount = leads.filter((l) => l.buildingType.includes("Commercial") || l.shaftConstraints.length >= 2).length;
  const totalCars = leads.reduce((acc, l) => acc + (l.elevatorCount || 1), 0);
  const totalSavingsProjected = leads.reduce((acc, l) => {
    let savings = 0;
    if (l.shaftConstraints.includes("CAT6 Breakages")) {
      savings += (l.elevatorCount || 1) * 2400;
    }
    return acc + savings;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      {/* Slideout Content container */}
      <div className="w-full max-w-5xl h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 border border-sky-400/20 rounded-xl text-sky-400 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-sans font-bold text-white tracking-wide uppercase">
                B2B CRM Lead & RFQ Pipeline Console
              </h3>
              <p className="text-[10px] text-slate-500 font-mono tracking-widest mt-0.5">
                Elevatech LLP Executive Dashboard (Restricted Admin Access)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors"
              title="Sync CRM Database"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-sky-400" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white font-mono text-xs px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 cursor-pointer"
            >
              ✕ Close Panel
            </button>
          </div>
        </div>

        {/* Dashboard Analytics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-slate-950/60 border-b border-slate-800 text-center py-4">
          <div className="p-2">
            <div className="text-xl sm:text-2xl font-mono font-bold text-white">{totalLeads}</div>
            <div className="text-[9px] text-slate-500 uppercase font-mono tracking-wider mt-0.5">Total Pipeline Leads</div>
          </div>
          <div className="p-2">
            <div className="text-xl sm:text-2xl font-mono font-bold text-sky-400">{highPriorityCommercialCount}</div>
            <div className="text-[9px] text-slate-500 uppercase font-mono tracking-wider mt-0.5">High-Priority Leads</div>
          </div>
          <div className="p-2">
            <div className="text-xl sm:text-2xl font-mono font-bold text-indigo-400">{totalCars} units</div>
            <div className="text-[9px] text-slate-500 uppercase font-mono tracking-wider mt-0.5">Total Elevators Under Review</div>
          </div>
          <div className="p-2">
            <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">${totalSavingsProjected.toLocaleString()}</div>
            <div className="text-[9px] text-slate-500 uppercase font-mono tracking-wider mt-0.5">Projected Maintenance Saved</div>
          </div>
        </div>

        {/* Lead list content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/15">
          {leads.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <p className="text-slate-400 font-sans text-sm font-light">No B2B leads have been generated yet in this session.</p>
              <p className="text-xs text-slate-600">Use the interactive Configurator on the homepage to draft an RFQ and register a lead!</p>
            </div>
          ) : (
            leads.map((lead) => (
              <div key={lead.id} className="bg-slate-900 border border-slate-850 hover:border-slate-800 p-5 rounded-xl space-y-4 transition-all shadow-md">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-slate-800/60 pb-3">
                  <div>
                    <h4 className="text-md font-sans font-bold text-white flex items-center gap-2">
                      <span>{lead.clientName}</span>
                      <span className="text-slate-500 font-normal text-xs">/</span>
                      <span className="text-sky-400 font-semibold text-xs font-mono">{lead.companyName}</span>
                    </h4>
                    
                    <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 font-mono mt-1.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-600" />
                        {new Date(lead.timestamp).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-slate-600" />
                        {lead.buildingType} ({lead.elevatorCount} active cars)
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800/80">
                    Lead Ref: {lead.id}
                  </span>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Selected Upgrades & Constraints */}
                  <div className="space-y-2">
                    {/* Constraints */}
                    {lead.shaftConstraints.length > 0 && (
                      <div>
                        <span className="text-[9px] text-rose-400 font-mono uppercase tracking-widest block font-bold mb-1">
                          Reported Roadblocks
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {lead.shaftConstraints.map((c, idx) => (
                            <span key={idx} className="text-[9px] font-mono text-rose-300 bg-rose-950/20 border border-rose-900/30 px-2.5 py-0.5 rounded">
                              ⚠ {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Upgrades */}
                    {lead.selectedSolutions.length > 0 && (
                      <div className="pt-1.5">
                        <span className="text-[9px] text-sky-400 font-mono uppercase tracking-widest block font-bold mb-1">
                          Selected Upgrades
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {lead.selectedSolutions.map((s, idx) => (
                            <span key={idx} className="text-[9px] font-mono text-sky-300 bg-sky-950/20 border border-sky-900/30 px-2.5 py-0.5 rounded">
                              ✦ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Channels & Notes */}
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-850/60 space-y-1.5 text-xs text-slate-300 font-sans font-light">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <a href={`mailto:${lead.email}`} className="text-sky-400 hover:underline font-mono">
                        {lead.email}
                      </a>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span className="font-mono">{lead.phone}</span>
                      </div>
                    )}
                    {lead.additionalNotes && (
                      <p className="text-[11px] text-slate-400 mt-2 border-t border-slate-900 pt-1.5 line-clamp-2 italic">
                        "{lead.additionalNotes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Systems AI Pre-Assessment */}
                {lead.aiAssessment && (
                  <div className="bg-gradient-to-r from-sky-950/20 to-indigo-950/20 p-4 border border-sky-500/10 rounded-lg flex items-start gap-3">
                    <div className="p-1 bg-sky-500/10 border border-sky-400/20 rounded-md text-sky-400 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] text-sky-400 font-mono uppercase tracking-widest font-bold block mb-1">
                        Systems Engineering AI Analysis
                      </span>
                      <p className="text-xs text-slate-300 font-sans font-light leading-relaxed italic">
                        "{lead.aiAssessment}"
                      </p>
                    </div>
                  </div>
                )}

              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 text-center">
          <span className="text-[10px] text-slate-600 font-mono">
            Data is securely persisted in container scope. TLS 1.3 secured B2B pipeline.
          </span>
        </div>

      </div>
    </div>
  );
}
