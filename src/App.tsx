import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SolutionsExplorer from "./components/SolutionsExplorer";
import SolutionBuilder from "./components/SolutionBuilder";
import AIAdvisor from "./components/AIAdvisor";
import LeadConsole from "./components/LeadConsole";
import KnowledgeHub from "./components/KnowledgeHub";
import Footer from "./components/Footer";
import { RFQLead } from "./types";
import { Sparkles, ArrowRight, BookOpen, Layers } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isLeadsOpen, setIsLeadsOpen] = useState(false);
  const [leads, setLeads] = useState<RFQLead[]>([]);

  // Fetch leads from server-side Express API
  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/leads");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.leads) {
          setLeads(data.leads);
        }
      }
    } catch (err) {
      console.error("Failed to sync leads from Express server:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950 font-sans">
      
      {/* Premium Header/Nav */}
      <Navbar
        onNavChange={setActiveSection}
        activeSection={activeSection}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenLeads={() => setIsLeadsOpen(true)}
        leadsCount={leads.length}
      />

      {/* Main Corporate Workspace */}
      <main className="flex-grow">
        {activeSection === "home" && (
          <div className="space-y-0">
            {/* Display Hero Strategy Intro */}
            <Hero
              onStartConfiguring={() => setActiveSection("builder")}
              onOpenAdvisor={() => setIsAdvisorOpen(true)}
            />

            {/* Custom Tabbed Solutions Explorer */}
            <SolutionsExplorer />

            {/* Quick Strategic Call-To-Action Segment */}
            <section className="bg-gradient-to-r from-sky-950/25 via-indigo-950/15 to-slate-950 py-16 px-6 border-t border-b border-slate-900/60">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                
                <h3 className="text-2xl font-sans font-bold text-white tracking-tight">
                  Ready to upgrade your building's vertical experience?
                </h3>
                
                <p className="text-slate-400 text-sm font-sans font-light max-w-xl mx-auto leading-relaxed">
                  Avoid catastrophic water-leak fines and constant CCTV maintenance blackouts. Input your building parameters inside our interactive configurator to draft an engineering spec.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                  <button
                    onClick={() => setActiveSection("builder")}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-6 py-3 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <span>Launch Spec Configurator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveSection("knowledge")}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-6 py-3 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-sky-400" />
                    <span>Technical Spec Library</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeSection === "builder" && (
          <SolutionBuilder onLeadSubmitted={fetchLeads} />
        )}

        {activeSection === "knowledge" && (
          <KnowledgeHub />
        )}
      </main>

      {/* Corporate B2B Footer */}
      <Footer onNavChange={setActiveSection} />

      {/* Modals & Slide-outs */}
      <AIAdvisor
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
      />

      <LeadConsole
        isOpen={isLeadsOpen}
        onClose={() => setIsLeadsOpen(false)}
        leads={leads}
        onRefresh={fetchLeads}
      />

    </div>
  );
}
