import React, { useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

interface HeroProps {
  onStartConfiguring: () => void;
  onOpenAdvisor: () => void;
}

export default function Hero({ onStartConfiguring, onOpenAdvisor }: HeroProps) {
  const [showStrategicDebrief, setShowStrategicDebrief] = useState(false);

  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100 py-16 px-6 border-b border-slate-900">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.05),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading, Tagline, B2B Positioning */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-400/20 rounded-full text-sky-400 text-xs font-mono font-medium w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Digital Redesign Blueprint Enacted</span>
          </div>

          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
            Bridging the Gap in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-400">
              Elevator Safety & Comfort
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl font-sans font-light max-w-xl leading-relaxed">
            All elevator manufacturers do vertical transportation. But they fall short on the extra safety aspects and cabin comforts that high-occupancy towers demand. 
            <strong className="text-slate-200 font-normal"> Elevatech is your one-stop engineering partner </strong> providing custom, brand-agnostic elevator add-ons.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onStartConfiguring}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 px-6 py-3.5 rounded-lg font-sans font-bold tracking-wide transition-all shadow-lg shadow-sky-500/20 active:scale-95 text-sm"
            >
              <span>Launch Cabin Configurator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowStrategicDebrief(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 px-6 py-3.5 rounded-lg font-sans font-semibold tracking-wide transition-colors border border-slate-800 text-sm"
            >
              <AlertTriangle className="w-4 h-4 text-sky-400" />
              <span>Read B2B Strategy Breakdown</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-900 max-w-xl">
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white">0.0 L</div>
              <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider mt-1">Water Discharge (AC)</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-sky-400">100%</div>
              <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider mt-1">Cable Failures Eliminated</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-indigo-400">&lt; 1.5ms</div>
              <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider mt-1">Wireless CCTV Latency</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive B2B Redesign Strategy Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-bl-3xl -z-10 blur-xl" />
            
            <h3 className="font-sans font-semibold text-lg text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <CheckCircle2 className="w-5 h-5 text-sky-400" />
              <span>Expert B2B Redesign Strategy</span>
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <h4 className="text-xs font-mono font-semibold uppercase text-sky-400 tracking-wider mb-1">
                  The Redesign Mission
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                  Elevate the website from a basic <strong>"static online brochure catalog"</strong> to a consultative B2B tool that validates engineering constraints, builds design confidence, and generates high-intent qualified pipeline.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 bg-sky-500/15 rounded text-sky-400 shrink-0 text-[10px] font-mono">1</div>
                  <div>
                    <h5 className="text-xs font-semibold text-slate-200">Solution-Based Navigation</h5>
                    <p className="text-[11px] text-slate-400 font-sans font-light leading-snug">
                      Categorize by actual technical roadblocks (water drainage, high-speed cable breakage) instead of catalog lists.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 bg-sky-500/15 rounded text-sky-400 shrink-0 text-[10px] font-mono">2</div>
                  <div>
                    <h5 className="text-xs font-semibold text-slate-200">Interactive Self-Service Spec</h5>
                    <p className="text-[11px] text-slate-400 font-sans font-light leading-snug">
                      Interactive Cabin Configurator pre-qualifies buyers by capturing their shaft and high-rise limits instantly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 bg-indigo-500/15 rounded text-indigo-400 shrink-0 text-[10px] font-mono">3</div>
                  <div>
                    <h5 className="text-xs font-semibold text-slate-200">AI-Powered Advisor Grounding</h5>
                    <p className="text-[11px] text-slate-400 font-sans font-light leading-snug">
                      Provides instant technical consulting for builders and HVAC contractors, positioning Elevatech as an authority.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Dialog for the full 3 Biggest Flaws B2B Web Strategy Breakdown */}
      {showStrategicDebrief && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-10 text-slate-300">
            <button
              onClick={() => setShowStrategicDebrief(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-mono text-sm px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950/40 hover:bg-slate-950 transition-all cursor-pointer"
            >
              ✕ Close
            </button>

            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs text-sky-400 font-mono uppercase tracking-wider">Web Strategy & UI/UX Audit</span>
                <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-white mt-1">
                  The 3 Biggest Flaws of Elevatech's Current Catalog Approach
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-2">
                  Prepared by Elevatech B2B Web Strategy Council
                </p>
              </div>

              {/* Flaw 1 */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 font-mono text-xs border border-rose-500/25">1</span>
                  <span>Feature-Spewing SKU Dumping vs. Solution-Based Context</span>
                </h3>
                <div className="pl-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-rose-950/10 border border-rose-900/20 p-4 rounded-xl">
                    <span className="text-[10px] uppercase tracking-wider text-rose-400 font-mono block mb-1">The Current Flaw</span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      Presenting products simply as <strong>catalog lines</strong> (e.g. "Model V2 AC unit, 9K BTU") forces B2B prospects to determine compatibility on their own. Elevator systems have strict vertical tolerances, high-speed movement hazards, and zero water-condensation rules. Buyers don't buy an AC; they buy the resolution to code infractions.
                    </p>
                  </div>
                  <div className="bg-emerald-950/10 border border-emerald-900/20 p-4 rounded-xl">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-mono block mb-1">The Solution-Based Fix</span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      Organizing the layout around <strong>industry verticals</strong> (Healthcare, High-Rise, Commercial) and <strong>technical pain-points</strong> (e.g., "Safe overhead water-free climate control"). The site maps products into specialized engineered bundles instantly, demonstrating safety compliance out-of-the-box.
                    </p>
                  </div>
                </div>
              </div>

              {/* Flaw 2 */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 font-mono text-xs border border-rose-500/25">2</span>
                  <span>High Friction Static PDFs vs. Interactive B2B Self-Service Specs</span>
                </h3>
                <div className="pl-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-rose-950/10 border border-rose-900/20 p-4 rounded-xl">
                    <span className="text-[10px] uppercase tracking-wider text-rose-400 font-mono block mb-1">The Current Flaw</span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      Relying on downloads of static datasheets and a generic "Contact Us" email form. Consultants, building engineers, and elevator manufacturers are busy and prefer <strong>instant self-qualification tools</strong> to see if a product fits their specific shaft constraints (vibration, height, power).
                    </p>
                  </div>
                  <div className="bg-emerald-950/10 border border-emerald-900/20 p-4 rounded-xl">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-mono block mb-1">The Solution-Based Fix</span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      An <strong>Interactive Cabin Configurator & Quote Builder</strong>. Prospects select their building type, number of elevators, and mechanical constraints (like snapped cables or water bans). The site constructs a technical build specification instantly, calculates ROI impact, and drafts a precise RFQ, drastically reducing sales cycle times.
                    </p>
                  </div>
                </div>
              </div>

              {/* Flaw 3 */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 font-mono text-xs border border-rose-500/25">3</span>
                  <span>Zero Search/Answer Engine Optimization (AEO/GEO) Architecture</span>
                </h3>
                <div className="pl-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-rose-950/10 border border-rose-900/20 p-4 rounded-xl">
                    <span className="text-[10px] uppercase tracking-wider text-rose-400 font-mono block mb-1">The Current Flaw</span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      Simple online catalogs suffer from sparse, repetitive, and non-semantic text. They do not rank for complex engineering search queries, and they are completely invisible to modern AI search systems (ChatGPT, Gemini, Perplexity) which aggregate B2B providers based on <strong>unstructured authority documents</strong>.
                    </p>
                  </div>
                  <div className="bg-emerald-950/10 border border-emerald-900/20 p-4 rounded-xl">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-mono block mb-1">The Solution-Based Fix</span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      An <strong>Engineering Knowledge Center</strong> populated with rich, semantic content clusters: technical articles (such as explaining condensate re-evaporation physics), structured schemas, real case studies, and structured FAQs. This positions Elevatech as the authoritative voice and ensures high discoverability by generative AI systems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-center">
                <button
                  onClick={() => {
                    setShowStrategicDebrief(false);
                    onStartConfiguring();
                  }}
                  className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Explore the Redesigned Experience Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
