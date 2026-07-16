import React, { useEffect, useState } from "react";
import { 
  Heart, 
  ArrowRight, 
  Radio, 
  Music, 
  Sparkles, 
  Layers, 
  MessageSquare,
  Flame,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroSectionProps {
  onNavigateSection: (section: string) => void;
}

export default function HeroSection({ onNavigateSection }: HeroSectionProps) {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = [
    "AUTOMATE YOUR VISUAL MARKETING",
    "BYPASS EXPENSIVE DESIGN LABS",
    "OWN YOUR FAN ROUTING SUITE",
    "KINETIC REEL LYRICS IN SECONDS"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative text-neutral-200 overflow-hidden py-16 md:py-24">
      {/* Dynamic Background Mesh Grid */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-950/20 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-950/10 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow" />

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Branding & Value Props */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-950/30 border border-rose-900/40 text-rose-400 text-xs font-mono tracking-widest uppercase mb-8">
            <Flame className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
            <span>HEARTSCRIPT STUDIOS &bull; CREATOR SUITE</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-none mb-6">
            Where Sound Finds Its <span className="text-rose-500 underline decoration-rose-950 decoration-wavy">Vision</span>
          </h1>

          {/* Automated Editorial Headlines */}
          <div className="h-10 sm:h-12 flex items-center overflow-hidden mb-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={headlineIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-xs sm:text-sm md:text-base font-mono tracking-widest text-rose-400 font-bold uppercase"
              >
                &gt;&gt; {headlines[headlineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl mb-10">
            Automate visual marketing, generate vertical 9:16 reels from raw lyrics, and route streaming traffic securely with high-converting, single-tap smart links. Built for independent musicians reclaiming their visual agency.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => onNavigateSection("visual")}
              id="cta-visual-engine-btn"
              className="py-4 px-6 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition shadow-xl shadow-rose-950/30 cursor-pointer"
            >
              <span>Launch Heartscript Visual Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateSection("links")}
              id="cta-links-btn"
              className="py-4 px-6 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Radio className="w-4 h-4 text-rose-500" />
              <span>Create HeartLink Hub</span>
            </button>
          </div>

          {/* Feature highlights list */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 border-t border-neutral-900 pt-8 w-full">
            <div>
              <p className="text-xl font-display font-bold text-white mb-1">0%</p>
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Design Skills Needed</p>
            </div>
            <div>
              <p className="text-xl font-display font-bold text-white mb-1">8s</p>
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Reel Video Mockups</p>
            </div>
            <div>
              <p className="text-xl font-display font-bold text-white mb-1">Live</p>
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Public oEmbed Scrapers</p>
            </div>
          </div>
        </div>

        {/* Right: Immersive Microphone / Sonic Visualizer */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          
          {/* Animated background rings */}
          <div className="absolute w-80 h-80 rounded-full border border-neutral-900/30 animate-pulse-slow pointer-events-none" />
          <div className="absolute w-60 h-60 rounded-full border border-neutral-800/20 animate-pulse-slow pointer-events-none" style={{ animationDelay: "2s" }} />

          {/* Styled Microphone SVG container */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-8 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
          >
            {/* Visual audio visualizer graph */}
            <div className="flex gap-1 justify-center items-end h-16 mb-8 px-4 opacity-50">
              {[2, 4, 3, 7, 5, 8, 4, 9, 6, 8, 4, 7, 3, 5, 2].map((val, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${val * 10}%`, `${(val + 3) % 10 * 10}%`, `${val * 10}%`] }}
                  transition={{ repeat: Infinity, duration: 1.5 + (i * 0.1), ease: "easeInOut" }}
                  className="w-1.5 bg-rose-500 rounded-full"
                />
              ))}
            </div>

            {/* Simulated Vinyl Track Player Layout */}
            <div className="border border-neutral-800 rounded-2xl p-4 bg-black/40 flex items-center gap-3">
              <div className="relative w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center border border-neutral-800 overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                  className="w-full h-full bg-cover rounded-full"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100')" }}
                />
                <div className="absolute w-3 h-3 bg-rose-500 border-2 border-black rounded-full" />
              </div>
              <div className="text-left flex-grow">
                <p className="text-xs font-bold text-white truncate">Cyan Static (Visual Suite Remix)</p>
                <p className="text-[10px] font-mono text-neutral-500">Heartscript Studio Releases</p>
              </div>
              <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" />
            </div>

            {/* Minimalist Microphonic Backdrop Badge */}
            <div className="mt-8 flex justify-center">
              <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                STUDIO CORE ACTIVE
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
