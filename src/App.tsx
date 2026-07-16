import React, { useState, useEffect } from "react";
import { 
  Heart, 
  Sparkles, 
  Link2, 
  Flame, 
  Music, 
  Menu, 
  X, 
  Award,
  Globe,
  Radio
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import HeroSection from "./components/HeroSection";
import VisualEngine from "./components/VisualEngine";
import HeartLinksSuite from "./components/HeartLinksSuite";
import CreatorPasses from "./components/CreatorPasses";
import RosterCommunity from "./components/RosterCommunity";
import HeartLinkView from "./components/HeartLinkView";

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userPremium, setUserPremium] = useState<string | null>(null);

  // Check if we are viewing a standalone HeartLink page (e.g. /hl/some-slug)
  const [heartLinkSlug, setHeartLinkSlug] = useState<string | null>(null);

  useEffect(() => {
    const handleRouteCheck = () => {
      const path = window.location.pathname;
      if (path.startsWith("/hl/")) {
        const slug = path.substring(4).trim();
        if (slug) {
          setHeartLinkSlug(slug);
        } else {
          setHeartLinkSlug(null);
        }
      } else {
        setHeartLinkSlug(null);
      }
    };

    // Run on load
    handleRouteCheck();

    // Persist path state
    window.addEventListener("popstate", handleRouteCheck);
    return () => window.removeEventListener("popstate", handleRouteCheck);
  }, []);

  // Listen for simulated purchases to instantly unlock premium badge!
  useEffect(() => {
    const checkPremiumSession = () => {
      const activeKey = localStorage.getItem("heartscript_license");
      if (activeKey) {
        setUserPremium(activeKey);
      }
    };
    checkPremiumSession();
    
    // Check periodically for updates (simulated session integration)
    const interval = setInterval(checkPremiumSession, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigateSection = (section: string) => {
    setCurrentSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Push state if we navigation back to root from standalone
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
      setHeartLinkSlug(null);
    }
  };

  const handleNavigateToSlug = (slug: string) => {
    window.history.pushState({}, "", `/hl/${slug}`);
    setHeartLinkSlug(slug);
  };

  const handleBackHome = () => {
    window.history.pushState({}, "", "/");
    setHeartLinkSlug(null);
    setCurrentSection("home");
  };

  // 1. Render standalone link bio page
  if (heartLinkSlug) {
    return <HeartLinkView slug={heartLinkSlug} onNavigateHome={handleBackHome} />;
  }

  // 2. Render general storefront layout
  return (
    <div className="min-h-screen bg-[#080808] text-neutral-200 font-sans relative flex flex-col justify-between overflow-x-hidden">
      
      {/* Absolute background visual blobs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Main Top Header */}
      <header className="sticky top-0 z-40 bg-[#080808]/85 backdrop-blur-md border-b border-neutral-900/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* Logo Branding */}
          <button
            onClick={() => handleNavigateSection("home")}
            id="brand-logo-trigger"
            className="flex items-center gap-2 text-left cursor-pointer transition group"
          >
            <div className="relative w-10 h-10 bg-rose-950/20 border border-rose-900/40 rounded-xl flex items-center justify-center text-rose-500 shadow-inner group-hover:scale-105 transition-all duration-300">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500/10 group-hover:fill-rose-500/30 transition-all" />
              <div className="absolute w-2 h-2 bg-rose-500 rounded-full animate-ping top-1 right-1" />
            </div>
            <div>
              <span className="font-display font-black text-sm tracking-widest text-white block">HEARTSCRIPT</span>
              <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">Creators Suite</span>
            </div>
          </button>

          {/* Desktop Nav Menu */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { id: "visual", name: "Heartscript Visual Engine", icon: Sparkles },
              { id: "links", name: "Smart Links", icon: Link2 },
              { id: "passes", name: "Creator Passes", icon: Flame },
              { id: "roster", name: "Community & Roster", icon: Music }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavigateSection(item.id)}
                  className={`text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer pb-1 border-b-2 ${
                    currentSection === item.id 
                      ? "text-rose-500 border-rose-500" 
                      : "text-neutral-400 hover:text-white border-transparent"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Tray (Premium authorization badge) */}
          <div className="hidden md:flex items-center gap-4">
            {userPremium ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 border border-rose-500/40 text-rose-400 text-[10px] font-mono tracking-widest uppercase rounded-full">
                <Award className="w-3.5 h-3.5 animate-pulse" />
                <span>PRO CREATOR ACTIVE</span>
              </div>
            ) : (
              <button
                onClick={() => handleNavigateSection("passes")}
                id="header-upgrade-btn"
                className="py-2.5 px-4 bg-rose-600/15 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/40 hover:border-transparent text-xs font-bold tracking-wider uppercase rounded-xl transition cursor-pointer"
              >
                Go Premium
              </button>
            )}
          </div>

          {/* Hamburger triggering button for mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-hamburger-btn"
            className="p-2 md:hidden text-neutral-400 hover:text-white transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-950 border-b border-neutral-900 z-30"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {[
                { id: "visual", name: "Heartscript Visual Engine", icon: Sparkles },
                { id: "links", name: "Smart Links", icon: Link2 },
                { id: "passes", name: "Creator Passes", icon: Flame },
                { id: "roster", name: "Community & Roster", icon: Music }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavigateSection(item.id)}
                    className={`text-sm font-semibold uppercase tracking-wider text-left py-2.5 flex items-center gap-2.5 cursor-pointer ${
                      currentSection === item.id ? "text-rose-500" : "text-neutral-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                );
              })}

              <div className="pt-4 border-t border-neutral-900">
                {userPremium ? (
                  <div className="w-full text-center py-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono tracking-widest uppercase rounded-xl">
                    PRO CREATOR ACTIVE
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigateSection("passes")}
                    id="mobile-upgrade-btn"
                    className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition text-center cursor-pointer"
                  >
                    Unlock Pro Suite
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container Core */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentSection === "home" && (
              <HeroSection onNavigateSection={handleNavigateSection} />
            )}
            {currentSection === "visual" && <VisualEngine />}
            {currentSection === "links" && (
              <HeartLinksSuite onNavigateToSlug={handleNavigateToSlug} />
            )}
            {currentSection === "passes" && <CreatorPasses />}
            {currentSection === "roster" && <RosterCommunity />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Footer */}
      <footer className="bg-[#050505] border-t border-neutral-900 py-12 px-6 mt-16 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="font-display font-black tracking-widest text-white">HEARTSCRIPT STUDIOS</span>
              <span className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-[8px] font-mono rounded text-rose-500 uppercase">PREVIEW V1.0</span>
            </div>
            <p className="max-w-md text-neutral-600 font-sans leading-relaxed">
              Autonomous storefront and visual marketing automation for independent artists. Hand-designed and crafted in high-contrast editorial slate.
            </p>
          </div>

          <div className="flex gap-6 font-mono text-[10px] tracking-widest uppercase">
            <button onClick={() => handleNavigateSection("visual")} className="hover:text-rose-500 transition cursor-pointer">Visuals</button>
            <button onClick={() => handleNavigateSection("links")} className="hover:text-rose-500 transition cursor-pointer">SmartLinks</button>
            <button onClick={() => handleNavigateSection("passes")} className="hover:text-rose-500 transition cursor-pointer">Licenses</button>
            <button onClick={() => handleNavigateSection("roster")} className="hover:text-rose-500 transition cursor-pointer">Comments</button>
          </div>

        </div>
        <div className="max-w-7xl mx-auto text-center border-t border-neutral-950 pt-8 mt-8 opacity-45">
          &copy; {new Date().getFullYear()} Heartscript Studios. Powered by Gemini Full-Stack AI engine.
        </div>
      </footer>

    </div>
  );
}
