import React, { useState } from "react";
import { SOLUTIONS, INDUSTRIES } from "../data";
import { Solution, Industry } from "../types";
import { Wind, Wifi, Cpu, Shield, Building, Heart, Home, AlertCircle, Check, HelpCircle, ChevronRight, HardHat } from "lucide-react";

// Helper function to map string icon names to Lucide icons
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Wind":
      return <Wind className="w-5 h-5 text-sky-400" />;
    case "Wifi":
      return <Wifi className="w-5 h-5 text-sky-400" />;
    case "Cpu":
      return <Cpu className="w-5 h-5 text-sky-400" />;
    case "Shield":
      return <Shield className="w-5 h-5 text-sky-400" />;
    default:
      return <Cpu className="w-5 h-5 text-sky-400" />;
  }
};

export default function SolutionsExplorer() {
  const [viewMode, setViewMode] = useState<"solutions" | "industries">("solutions");
  const [activeSolutionId, setActiveSolutionId] = useState<string>(SOLUTIONS[0].id);
  const [activeIndustryId, setActiveIndustryId] = useState<string>(INDUSTRIES[0].id);

  const activeSolution = SOLUTIONS.find((s) => s.id === activeSolutionId) || SOLUTIONS[0];
  const activeIndustry = INDUSTRIES.find((i) => i.id === activeIndustryId) || INDUSTRIES[0];

  return (
    <section className="bg-slate-950 text-slate-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-900 pb-8">
          <div>
            <span className="text-xs text-sky-400 font-mono uppercase tracking-wider block mb-2">
              Adaptive B2B Solution Suite
            </span>
            <h2 className="text-3xl font-sans font-bold text-white tracking-tight">
              Engineering Answers to Vertical Logistics Roadblocks
            </h2>
            <p className="text-slate-400 font-sans font-light max-w-xl mt-2 text-sm leading-relaxed">
              Standard commercial systems fail when forced into high-vibration, high-speed, water-restricted elevator corridors. Elevatech engineers the missing bridge.
            </p>
          </div>

          {/* Toggle View Mode Buttons */}
          <div className="mt-6 md:mt-0 inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode("solutions")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider rounded-lg transition-all ${
                viewMode === "solutions"
                  ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/10"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Browse by Technical Solution</span>
            </button>
            <button
              onClick={() => setViewMode("industries")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider rounded-lg transition-all ${
                viewMode === "industries"
                  ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/10"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Browse by Industry Context</span>
            </button>
          </div>
        </div>

        {/* SOLUTIONS VIEW */}
        {viewMode === "solutions" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar selection */}
            <div className="lg:col-span-4 flex flex-col space-y-3">
              <span className="text-xs font-mono font-semibold uppercase text-slate-500 tracking-widest pl-1 mb-1">
                Roadblock Domains
              </span>
              {SOLUTIONS.map((sol) => (
                <button
                  key={sol.id}
                  onClick={() => setActiveSolutionId(sol.id)}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    activeSolutionId === sol.id
                      ? "bg-slate-900/60 border-sky-500/40 shadow-lg shadow-sky-500/5"
                      : "bg-transparent border-slate-900 hover:bg-slate-900/20 hover:border-slate-800"
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${
                    activeSolutionId === sol.id ? "bg-sky-500/10" : "bg-slate-900"
                  }`}>
                    {getIcon(sol.icon)}
                  </div>
                  <div>
                    <h4 className={`text-sm font-sans font-semibold leading-tight ${
                      activeSolutionId === sol.id ? "text-white" : "text-slate-300"
                    }`}>
                      {sol.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-sans font-light mt-1.5 line-clamp-1">
                      {sol.problem}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Solution Panel details */}
            <div className="lg:col-span-8 bg-slate-900/25 border border-slate-900 rounded-2xl p-6 sm:p-8 space-y-8">
              {/* Solution Overview */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-sky-400 font-mono uppercase tracking-wider">Solution Blueprint</span>
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span className="text-xs text-slate-300 font-mono">{activeSolution.name}</span>
                  </div>
                  <h3 className="text-2xl font-sans font-bold text-white tracking-tight">
                    {activeSolution.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans font-light border-l-2 border-sky-500/20 pl-3">
                    <strong className="text-sky-400 font-normal">Core Roadblock: </strong> {activeSolution.problem}
                  </p>
                </div>
                <div className="md:col-span-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img
                    src={activeSolution.image}
                    alt={activeSolution.name}
                    className="w-full h-32 object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Engineering Challenge & Elevatech Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-900">
                <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-xl">
                  <span className="text-[10px] text-rose-400 font-mono uppercase tracking-wider block mb-1">
                    Engineering Challenge
                  </span>
                  <p className="text-xs text-slate-300 font-sans font-light leading-relaxed">
                    {activeSolution.engineeringChallenge}
                  </p>
                </div>
                <div className="bg-sky-500/5 border border-sky-500/10 p-5 rounded-xl">
                  <span className="text-[10px] text-sky-400 font-mono uppercase tracking-wider block mb-1">
                    Elevatech Engineered Fix
                  </span>
                  <p className="text-xs text-slate-300 font-sans font-light leading-relaxed">
                    {activeSolution.solution}
                  </p>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-semibold uppercase text-slate-500 tracking-widest block">
                  Verifiable Operational Benefits
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSolution.benefits.map((benefit, idx) => {
                    const [title, desc] = benefit.split(": ");
                    return (
                      <div key={idx} className="flex items-start gap-2.5 p-3 bg-slate-900/30 rounded-lg border border-slate-900/50">
                        <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs font-semibold text-slate-200">{title}</h5>
                          {desc && <p className="text-[11px] text-slate-400 font-sans font-light mt-0.5">{desc}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Associated Products Spec Catalog */}
              <div className="space-y-4 pt-6 border-t border-slate-900">
                <span className="text-xs font-mono font-semibold uppercase text-sky-500 tracking-widest block">
                  Product Specifications Catalog
                </span>
                
                {activeSolution.products.map((product) => (
                  <div key={product.id} className="bg-slate-950 border border-slate-900 rounded-xl overflow-hidden p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h4 className="text-md font-sans font-bold text-white">{product.name}</h4>
                        <p className="text-xs text-sky-400 font-mono font-light">{product.tagline}</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                        SKU: ELE-{product.id.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                      {product.description}
                    </p>

                    {/* Features list */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {product.features.map((feat, fIdx) => (
                        <span key={fIdx} className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800/80">
                          ✦ {feat}
                        </span>
                      ))}
                    </div>

                    {/* Technical Specification Table */}
                    <div className="bg-slate-900/40 rounded-lg overflow-hidden border border-slate-800/50">
                      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                        Engineering Specifications Table
                      </div>
                      <div className="divide-y divide-slate-900">
                        {Object.entries(product.specs).map(([label, value]) => (
                          <div key={label} className="grid grid-cols-2 px-4 py-2 text-[11px]">
                            <span className="font-mono text-slate-500">{label}</span>
                            <span className="font-mono text-slate-300 font-medium text-right">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INDUSTRIES VIEW */}
        {viewMode === "industries" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar list */}
            <div className="lg:col-span-4 flex flex-col space-y-3">
              <span className="text-xs font-mono font-semibold uppercase text-slate-500 tracking-widest pl-1 mb-1">
                Industry Sectors
              </span>
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustryId(ind.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    activeIndustryId === ind.id
                      ? "bg-slate-900/60 border-sky-500/40 shadow-lg shadow-sky-500/5"
                      : "bg-transparent border-slate-900 hover:bg-slate-900/20 hover:border-slate-800"
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${
                    activeIndustryId === ind.id ? "bg-sky-500/10" : "bg-slate-900"
                  }`}>
                    {ind.id === "commercial-towers" && <Building className="w-5 h-5 text-sky-400" />}
                    {ind.id === "healthcare" && <Heart className="w-5 h-5 text-sky-400" />}
                    {ind.id === "luxury-residential" && <Home className="w-5 h-5 text-sky-400" />}
                  </div>
                  <div>
                    <h4 className={`text-sm font-sans font-semibold leading-tight ${
                      activeIndustryId === ind.id ? "text-white" : "text-slate-300"
                    }`}>
                      {ind.name}
                    </h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Industry details */}
            <div className="lg:col-span-8 bg-slate-900/25 border border-slate-900 rounded-2xl p-6 sm:p-8 space-y-8">
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <div>
                  <span className="text-xs text-sky-400 font-mono uppercase tracking-wider">Target Vertical Profile</span>
                  <h3 className="text-2xl font-sans font-bold text-white tracking-tight mt-1">
                    {activeIndustry.name}
                  </h3>
                </div>
                <div className="hidden sm:block">
                  {activeIndustry.id === "commercial-towers" && <Building className="w-8 h-8 text-sky-500/40" />}
                  {activeIndustry.id === "healthcare" && <Heart className="w-8 h-8 text-sky-500/40" />}
                  {activeIndustry.id === "luxury-residential" && <Home className="w-8 h-8 text-sky-500/40" />}
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed font-sans font-light">
                {activeIndustry.description}
              </p>

              {/* Specific Challenges vs. Engineered Solution Set */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Specific Challenges */}
                <div className="bg-rose-950/10 border border-rose-900/20 p-5 rounded-xl space-y-3">
                  <span className="text-xs text-rose-400 font-mono uppercase tracking-wider block border-b border-rose-900/20 pb-1.5 font-bold">
                    Severe Vertical Roadblocks
                  </span>
                  <ul className="space-y-2.5">
                    {activeIndustry.challenges.map((chal, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans font-light leading-relaxed">
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{chal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution Set */}
                <div className="bg-emerald-950/10 border border-emerald-900/20 p-5 rounded-xl space-y-3">
                  <span className="text-xs text-emerald-400 font-mono uppercase tracking-wider block border-b border-emerald-900/20 pb-1.5 font-bold">
                    Recommended Solution Blueprint
                  </span>
                  <ul className="space-y-2.5">
                    {activeIndustry.solutionSet.map((solItem, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans font-light leading-relaxed">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{solItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* B2B Case Study / Success Story Proof */}
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-6 space-y-3">
                <span className="text-[10px] text-sky-400 font-mono uppercase tracking-wider block font-bold">
                  B2B Proof of Concept Case Study
                </span>
                <h4 className="text-sm font-sans font-bold text-white">
                  {activeIndustry.caseStudyTitle}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                  {activeIndustry.caseStudySummary}
                </p>
                <div className="pt-2 text-right">
                  <span className="text-[10px] font-mono text-sky-400 hover:underline cursor-pointer">
                    Request Full Technical PDF Report ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
