import React, { useEffect, useState } from "react";
import { HeartLink } from "../types";
import { 
  Music, 
  Youtube, 
  Disc, 
  ExternalLink, 
  Instagram, 
  AlertCircle, 
  Play, 
  Radio, 
  Heart,
  Share2
} from "lucide-react";
import { motion } from "motion/react";

interface HeartLinkViewProps {
  slug: string;
  onNavigateHome: () => void;
}

export default function HeartLinkView({ slug, onNavigateHome }: HeartLinkViewProps) {
  const [linkData, setLinkData] = useState<HeartLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchLink() {
      try {
        setLoading(true);
        const res = await fetch(`/api/heartlinks/${slug}`);
        if (!res.ok) {
          throw new Error("This HeartLink doesn't exist yet, or was removed.");
        }
        const data = await res.json();
        setLinkData(data);
      } catch (err: any) {
        setError(err.message || "Failed to load HeartLink.");
      } finally {
        setLoading(false);
      }
    }
    fetchLink();
  }, [slug]);

  const handlePlatformClick = async (platform: string, url: string) => {
    // Fire-and-forget analytics recording
    try {
      await fetch(`/api/heartlinks/click/${slug}/${platform}`, { method: "POST" });
    } catch (e) {
      console.error("Failed to record click analytics", e);
    }
    // Open link
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-neutral-200 font-sans p-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-10 h-10 border-2 border-rose-500 border-t-transparent rounded-full mb-4"
        />
        <p className="text-xs font-mono tracking-widest text-neutral-400 uppercase">Fetching HeartLink Metadata...</p>
      </div>
    );
  }

  if (error || !linkData) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-neutral-200 font-sans p-6 text-center">
        <div className="max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold text-white mb-2">Link Not Found</h2>
          <p className="text-sm text-neutral-400 mb-6">{error || "The link identifier is invalid."}</p>
          <button
            onClick={onNavigateHome}
            id="back-home-error-btn"
            className="w-full py-3 px-5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-rose-900/30"
          >
            Create Your Own Link Suite
          </button>
        </div>
      </div>
    );
  }

  // Define theme styling profiles
  const themes: Record<string, {
    bgClass: string;
    cardClass: string;
    textClass: string;
    subtextClass: string;
    accentClass: string;
    btnClass: string;
    logoColor: string;
  }> = {
    "crimson-ink": {
      bgClass: "bg-radial from-neutral-900 via-neutral-950 to-black text-neutral-200",
      cardClass: "bg-neutral-950/80 border border-red-950/40 backdrop-blur-md shadow-2xl shadow-red-950/10",
      textClass: "text-white font-serif",
      subtextClass: "text-red-200/60",
      accentClass: "text-red-500",
      btnClass: "bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-100 hover:border-red-500/50",
      logoColor: "#ef4444"
    },
    "cyan-static": {
      bgClass: "bg-neutral-950 text-neutral-300 bg-grid-pattern",
      cardClass: "bg-neutral-950/90 border border-cyan-950/60 shadow-2xl shadow-cyan-950/20 font-mono",
      textClass: "text-cyan-400 font-mono tracking-tight",
      subtextClass: "text-neutral-500",
      accentClass: "text-cyan-400",
      btnClass: "bg-cyan-950/10 hover:bg-cyan-950/30 border border-cyan-900/30 text-cyan-200 hover:border-cyan-400/50",
      logoColor: "#06b6d4"
    },
    "cream-paper": {
      bgClass: "bg-[#fbfaf5] text-neutral-800",
      cardClass: "bg-white border border-neutral-200 shadow-xl font-serif text-neutral-900",
      textClass: "text-neutral-900 font-serif font-bold",
      subtextClass: "text-neutral-500 font-sans text-xs uppercase tracking-wider",
      accentClass: "text-amber-800",
      btnClass: "bg-neutral-50 hover:bg-neutral-100 border border-neutral-300 text-neutral-800 hover:border-neutral-500 shadow-sm",
      logoColor: "#78350f"
    },
    "dark-obsidian": {
      bgClass: "bg-black text-neutral-300",
      cardClass: "bg-neutral-900/40 border border-neutral-800 backdrop-blur-xl shadow-2xl shadow-black",
      textClass: "text-white font-display font-medium",
      subtextClass: "text-neutral-400",
      accentClass: "text-white",
      btnClass: "bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 text-neutral-100 hover:border-neutral-700",
      logoColor: "#ffffff"
    },
    "neon-synth": {
      bgClass: "bg-radial from-indigo-950 via-neutral-950 to-black text-neutral-200",
      cardClass: "bg-neutral-900/75 border border-fuchsia-950 backdrop-blur-md shadow-2xl shadow-fuchsia-950/20",
      textClass: "text-fuchsia-300 font-display font-bold",
      subtextClass: "text-indigo-300/60",
      accentClass: "text-fuchsia-400",
      btnClass: "bg-fuchsia-950/20 hover:bg-fuchsia-950/40 border border-fuchsia-900/30 text-fuchsia-200 hover:border-fuchsia-500",
      logoColor: "#e879f9"
    },
    "retro-gold": {
      bgClass: "bg-neutral-950 text-neutral-200",
      cardClass: "bg-neutral-900/50 border border-amber-950/50 shadow-2xl shadow-amber-950/10",
      textClass: "text-amber-400 font-display font-medium",
      subtextClass: "text-neutral-400",
      accentClass: "text-amber-400",
      btnClass: "bg-amber-950/20 hover:bg-amber-950/40 border border-amber-900/30 text-amber-200 hover:border-amber-400",
      logoColor: "#fbbf24"
    }
  };

  const currentTheme = themes[linkData.theme] || themes["crimson-ink"];

  // Prepare standard stream platforms list
  const platforms = [
    { key: "spotify", name: "Spotify", icon: Music, color: "hover:text-[#1DB954]" },
    { key: "youtube", name: "YouTube Music / Video", icon: Youtube, color: "hover:text-[#FF0000]" },
    { key: "appleMusic", name: "Apple Music", icon: Radio, color: "hover:text-[#FC3C44]" },
    { key: "soundcloud", name: "SoundCloud", icon: Disc, color: "hover:text-[#FF5500]" },
    { key: "bandcamp", name: "Bandcamp", icon: Disc, color: "hover:text-[#1DA1F2]" },
    { key: "instagram", name: "Instagram Profile", icon: Instagram, color: "hover:text-[#E1306C]" },
  ];

  const activePlatforms = platforms.filter(p => linkData.links[p.key as keyof typeof linkData.links]);

  return (
    <div className={`min-h-screen ${currentTheme.bgClass} flex flex-col justify-between py-12 px-4 relative overflow-hidden transition-colors duration-500`}>
      
      {/* Background ambient visuals */}
      {linkData.theme === "crimson-ink" && (
        <div className="absolute inset-0 bg-radial-at-t from-red-950/10 via-transparent to-transparent pointer-events-none" />
      )}
      {linkData.theme === "neon-synth" && (
        <div className="absolute inset-0 bg-radial-at-b from-fuchsia-950/10 via-transparent to-transparent pointer-events-none" />
      )}
      {linkData.theme === "cream-paper" && (
        <div className="organic-grain-overlay" />
      )}

      {/* Floating Header */}
      <div className="max-w-md w-full mx-auto flex justify-between items-center z-10 mb-6">
        <button
          onClick={onNavigateHome}
          id="branding-back-btn"
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-60 hover:opacity-100 transition-all cursor-pointer"
        >
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Heartscript Suite</span>
        </button>

        <button
          onClick={handleShare}
          id="share-slug-btn"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer flex items-center gap-1.5 text-xs font-mono"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? "Copied" : "Share"}</span>
        </button>
      </div>

      {/* Main card */}
      <main className="max-w-md w-full mx-auto z-10 flex-grow flex items-center justify-center py-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`w-full p-8 rounded-3xl ${currentTheme.cardClass} flex flex-col items-center text-center`}
        >
          {/* Cover Art */}
          <div className="relative w-44 h-44 mb-6 group">
            <motion.div
              animate={{ rotate: [0, 2, 0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img
                src={linkData.imageUrl}
                alt={linkData.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <div className="absolute -bottom-2 -right-2 bg-neutral-900 border border-neutral-800 p-2 rounded-full text-white shadow-lg">
              <Play className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
          </div>

          {/* Titles */}
          <h1 className={`text-2xl font-bold tracking-tight mb-1 ${currentTheme.textClass}`}>
            {linkData.title}
          </h1>
          <p className="text-sm font-display tracking-wide uppercase opacity-75 mb-3 flex items-center gap-1.5 justify-center">
            <Music className="w-3.5 h-3.5" style={{ color: currentTheme.logoColor }} />
            <span>{linkData.artist}</span>
          </p>

          {/* Bio */}
          {linkData.description && (
            <p className="text-xs max-w-sm leading-relaxed opacity-60 mb-8 border-t border-white/5 pt-4 font-sans">
              {linkData.description}
            </p>
          )}

          {/* Stream Badges List */}
          <div className="w-full space-y-3.5">
            {activePlatforms.map((plat) => {
              const IconComp = plat.icon;
              return (
                <button
                  key={plat.key}
                  id={`link-plat-${plat.key}`}
                  onClick={() => handlePlatformClick(plat.key, linkData.links[plat.key as keyof typeof linkData.links] || "")}
                  className={`w-full py-4 px-5 rounded-2xl text-left flex items-center justify-between transition-all group cursor-pointer ${currentTheme.btnClass}`}
                >
                  <div className="flex items-center gap-4">
                    <IconComp className={`w-5 h-5 transition-colors duration-300 ${plat.color}`} />
                    <span className="text-xs font-semibold tracking-wide uppercase">{plat.name}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}

            {/* Custom Link if defined */}
            {linkData.links.customUrl && (
              <button
                id="link-plat-custom"
                onClick={() => handlePlatformClick("custom", linkData.links.customUrl || "")}
                className={`w-full py-4 px-5 rounded-2xl text-left flex items-center justify-between transition-all group cursor-pointer ${currentTheme.btnClass}`}
              >
                <div className="flex items-center gap-4">
                  <Music className="w-5 h-5 text-neutral-400 group-hover:text-white" />
                  <span className="text-xs font-semibold tracking-wide uppercase">
                    {linkData.links.customName || "Official Website"}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
            )}

            {/* Custom Platforms list if defined */}
            {linkData.links.customPlatforms && linkData.links.customPlatforms.map((plat) => (
              <button
                key={plat.id}
                id={`link-plat-${plat.id}`}
                onClick={() => handlePlatformClick(plat.name, plat.url)}
                className={`w-full py-4 px-5 rounded-2xl text-left flex items-center justify-between transition-all group cursor-pointer ${currentTheme.btnClass}`}
              >
                <div className="flex items-center gap-4">
                  {plat.logoUrl ? (
                    <img 
                      src={plat.logoUrl} 
                      alt={plat.name} 
                      className="w-5 h-5 rounded-md object-cover border border-white/10 group-hover:border-white/30 transition-all" 
                    />
                  ) : (
                    <Music className="w-5 h-5 text-neutral-400 group-hover:text-white animate-pulse" />
                  )}
                  <span className="text-xs font-semibold tracking-wide uppercase">
                    {plat.name}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}

            {activePlatforms.length === 0 && !linkData.links.customUrl && (!linkData.links.customPlatforms || linkData.links.customPlatforms.length === 0) && (
              <div className="py-8 text-center border border-dashed border-neutral-800 rounded-2xl opacity-45 text-xs font-mono">
                No active streaming links defined yet.
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full text-center py-4 z-10">
        <button
          onClick={onNavigateHome}
          id="footer-brand-referral-btn"
          className="text-[10px] font-mono tracking-widest uppercase opacity-40 hover:opacity-100 hover:text-rose-500 transition-all cursor-pointer"
        >
          Made with Heartscript Studios &bull; Claim Your Space
        </button>
      </footer>
    </div>
  );
}
