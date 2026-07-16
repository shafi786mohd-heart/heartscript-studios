import React, { useState, useEffect, useRef } from "react";
import { 
  Link2, 
  Sparkles, 
  Search, 
  ExternalLink, 
  Copy, 
  BarChart3, 
  Radio, 
  Globe, 
  Music, 
  Youtube, 
  Disc, 
  Instagram, 
  Smartphone,
  Save,
  Check,
  TrendingUp,
  Trash2,
  Share2,
  RefreshCw,
  Upload,
  Plus,
  PlusCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HeartLink, LinkData } from "../types";

interface HeartLinksSuiteProps {
  onNavigateToSlug: (slug: string) => void;
}

export default function HeartLinksSuite({ onNavigateToSlug }: HeartLinksSuiteProps) {
  const [pasteUrl, setPasteUrl] = useState("");
  const [scraping, setScraping] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);

  // Prefill / Editing states
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("crimson-ink");
  const [links, setLinks] = useState<LinkData>({
    spotify: "",
    youtube: "",
    appleMusic: "",
    soundcloud: "",
    bandcamp: "",
    instagram: "",
    customName: "",
    customUrl: "",
    customPlatforms: []
  });

  // Custom platforms editor states
  const [newPlatformName, setNewPlatformName] = useState("");
  const [newPlatformUrl, setNewPlatformUrl] = useState("");
  const [newPlatformLogo, setNewPlatformLogo] = useState("");
  const [logoUploadError, setLogoUploadError] = useState<string | null>(null);
  const customLogoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        setLogoUploadError("Please upload an image file.");
        return;
      }
      if (file.size > 1024 * 1024) {
        setLogoUploadError("Logo file too large. Max size is 1MB.");
        return;
      }
      setLogoUploadError(null);
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setNewPlatformLogo(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomPlatform = () => {
    if (!newPlatformName.trim() || !newPlatformUrl.trim()) return;
    const item = {
      id: "cust-" + Date.now(),
      name: newPlatformName.trim(),
      url: newPlatformUrl.trim(),
      logoUrl: newPlatformLogo || undefined
    };
    setLinks(prev => ({
      ...prev,
      customPlatforms: [...(prev.customPlatforms || []), item]
    }));
    // Reset inputs
    setNewPlatformName("");
    setNewPlatformUrl("");
    setNewPlatformLogo("");
    if (customLogoInputRef.current) {
      customLogoInputRef.current.value = "";
    }
  };

  const handleRemoveCustomPlatform = (id: string) => {
    setLinks(prev => ({
      ...prev,
      customPlatforms: (prev.customPlatforms || []).filter(p => p.id !== id)
    }));
  };

  // Analytics states
  const [publishedLinks, setPublishedLinks] = useState<HeartLink[]>([]);
  const [selectedAnalyticsLink, setSelectedAnalyticsLink] = useState<HeartLink | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    fetchPublishedLinks();
  }, []);

  const fetchPublishedLinks = async () => {
    try {
      const res = await fetch("/api/heartlinks");
      if (res.ok) {
        const data = await res.json();
        setPublishedLinks(data);
        if (data.length > 0 && !selectedAnalyticsLink) {
          setSelectedAnalyticsLink(data[0]);
        }
      }
    } catch (e) {
      console.error("Failed to load published links:", e);
    }
  };

  // Scrape audio metadata from Spotify / YouTube oEmbeds or general OG tags
  const handleScrapeLink = async () => {
    if (!pasteUrl.trim()) return;
    try {
      setScraping(true);
      const res = await fetch("/api/heartlinks/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: pasteUrl })
      });
      if (!res.ok) throw new Error("Scrape failed");
      const data = await res.json();

      // Prefill coordinates based on scraped meta
      setTitle(data.title || "My Track Title");
      setArtist(data.artist || "Independent Artist");
      setImageUrl(data.imageUrl || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745");
      setDescription(data.description || `Listen to our latest track '${data.title}' on all official services.`);
      
      // Auto-generate safe slug
      const generatedSlug = (data.title || "")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);

      // Map corresponding platform link
      const updatedLinks = { ...links };
      if (data.platform === "spotify") updatedLinks.spotify = data.originalUrl;
      if (data.platform === "youtube") updatedLinks.youtube = data.originalUrl;
      if (data.platform === "appleMusic") updatedLinks.appleMusic = data.originalUrl;
      setLinks(updatedLinks);

    } catch (e) {
      console.error(e);
    } finally {
      setScraping(false);
    }
  };

  // Submit and Publish HeartLink to server db.json
  const handlePublishLink = async () => {
    if (!slug.trim() || !title.trim() || !artist.trim()) return;
    
    const payload = {
      slug: slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, ""),
      title: title.trim(),
      artist: artist.trim(),
      imageUrl: imageUrl.trim() || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
      theme,
      description: description.trim(),
      links
    };

    try {
      const res = await fetch("/api/heartlinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const result = await res.json();
        setPublishSuccess(result.slug);
        fetchPublishedLinks();
        setSelectedAnalyticsLink(result);
        
        // Reset Creator inputs
        setPasteUrl("");
        setSlug("");
        setTitle("");
        setArtist("");
        setImageUrl("");
        setDescription("");
        setLinks({
          spotify: "",
          youtube: "",
          appleMusic: "",
          soundcloud: "",
          bandcamp: "",
          instagram: "",
          customName: "",
          customUrl: "",
          customPlatforms: []
        });
        
        setTimeout(() => setPublishSuccess(null), 8000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const copyShareLink = (slugName: string) => {
    const fullUrl = `${window.location.origin}/hl/${slugName}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slugName);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const totalViewsAcrossLinks = publishedLinks.reduce((sum, link) => sum + (link.views || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 text-left items-start relative z-10">
      
      {/* Published Links Popup */}
      <AnimatePresence>
        {publishSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:col-span-12 bg-emerald-950/40 border border-emerald-900/50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base">HeartLink Published Live!</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Your smart routing hub is configured and fully synced on the Cloud Run gateway.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() => copyShareLink(publishSuccess)}
                id="copy-pub-link-btn"
                className="flex-grow md:flex-none py-2.5 px-4 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition text-white cursor-pointer"
              >
                {copiedSlug === publishSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSlug === publishSuccess ? "Copied" : "Copy SmartLink"}</span>
              </button>
              <button
                onClick={() => onNavigateToSlug(publishSuccess)}
                id="view-pub-link-btn"
                className="flex-grow md:flex-none py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>View Standalone Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Column: Link Creator Suite (7 columns) */}
      <div className="lg:col-span-7 space-y-8 bg-neutral-900/40 border border-neutral-800 p-8 rounded-3xl backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-rose-500" />
            <span>Smart Routing Creator</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Input a single song link (Spotify or YouTube) to scrape cover art and prefill beautiful direct audio cards.
          </p>
        </div>

        {/* Link Scrape Bar */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">Pasted Audio Link</label>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Link2 className="absolute left-4 top-3.5 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={pasteUrl}
                id="scrape-url-input"
                onChange={(e) => setPasteUrl(e.target.value)}
                className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl pl-11 pr-4 py-3.5 text-xs text-white focus:outline-none transition"
                placeholder="https://open.spotify.com/track/... or YouTube link"
              />
            </div>
            <button
              onClick={handleScrapeLink}
              disabled={scraping || !pasteUrl.trim()}
              id="scrape-trigger-btn"
              className="px-5 bg-rose-600 hover:bg-rose-500 disabled:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              {scraping ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scraping...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Fetch Info</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Detail Forms */}
        <div className="space-y-6 pt-4 border-t border-neutral-850">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">Song Title</label>
              <input
                type="text"
                value={title}
                id="hub-title-input"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/20 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition"
                placeholder="Scraped song title..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">Artist / Band</label>
              <input
                type="text"
                value={artist}
                id="hub-artist-input"
                onChange={(e) => setArtist(e.target.value)}
                className="w-full bg-black/20 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition"
                placeholder="Scraped artist name..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">Custom URL Slug</label>
              <div className="flex">
                <span className="bg-neutral-950 border border-r-0 border-neutral-800 rounded-l-xl px-3.5 py-3 text-xs text-neutral-500 flex items-center select-none font-mono">
                  /hl/
                </span>
                <input
                  type="text"
                  value={slug}
                  id="hub-slug-input"
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                  className="w-full bg-black/20 border border-neutral-850 focus:border-rose-500 rounded-r-xl px-4 py-3 text-xs text-white focus:outline-none transition font-mono"
                  placeholder="my-cool-track"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">Cover Artwork Image URL</label>
              <input
                type="text"
                value={imageUrl}
                id="hub-image-input"
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-black/20 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition"
                placeholder="Cover image url..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">Description / Call to Action</label>
            <textarea
              rows={2}
              value={description}
              id="hub-desc-textarea"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/20 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition leading-relaxed"
              placeholder="e.g. My new alternative electro-beat single is out. Choose your platform below..."
            />
          </div>

          {/* Preset Visual Themes Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">Landing Page Preset Theme</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: "crimson-ink", name: "Crimson Ink" },
                { id: "cyan-static", name: "Cyan Static" },
                { id: "cream-paper", name: "Cream Paper" },
                { id: "dark-obsidian", name: "Dark Obsidian" },
                { id: "neon-synth", name: "Neon Synth" },
                { id: "retro-gold", name: "Retro Gold" },
              ].map((th) => (
                <button
                  key={th.id}
                  id={`hub-theme-preset-${th.id}`}
                  onClick={() => setTheme(th.id)}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium text-center transition cursor-pointer ${
                    theme === th.id 
                      ? "border-rose-500 bg-rose-500/10 text-rose-400 ring-2 ring-rose-500/10" 
                      : "border-neutral-850 hover:bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {th.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social Platform Link Bindings */}
          <div className="border-t border-neutral-850 pt-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Custom routing links</span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                  <Music className="w-3 h-3 text-[#1DB954]" /> Spotify URL
                </span>
                <input
                  type="text"
                  value={links.spotify}
                  id="hub-link-spotify"
                  onChange={(e) => setLinks({ ...links, spotify: e.target.value })}
                  className="w-full bg-black/20 border border-neutral-850 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  placeholder="https://open.spotify.com/track/..."
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                  <Youtube className="w-3 h-3 text-[#FF0000]" /> YouTube URL
                </span>
                <input
                  type="text"
                  value={links.youtube}
                  id="hub-link-youtube"
                  onChange={(e) => setLinks({ ...links, youtube: e.target.value })}
                  className="w-full bg-black/20 border border-neutral-850 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                  <Radio className="w-3 h-3 text-[#FC3C44]" /> Apple Music URL
                </span>
                <input
                  type="text"
                  value={links.appleMusic}
                  id="hub-link-apple"
                  onChange={(e) => setLinks({ ...links, appleMusic: e.target.value })}
                  className="w-full bg-black/20 border border-neutral-850 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  placeholder="https://music.apple.com/us/album/..."
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                  <Disc className="w-3 h-3 text-[#FF5500]" /> SoundCloud URL
                </span>
                <input
                  type="text"
                  value={links.soundcloud}
                  id="hub-link-soundcloud"
                  onChange={(e) => setLinks({ ...links, soundcloud: e.target.value })}
                  className="w-full bg-black/20 border border-neutral-850 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  placeholder="https://soundcloud.com/..."
                />
              </div>
            </div>
          </div>

          {/* Custom Platform and Logo Upload */}
          <div className="border-t border-neutral-850 pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Additional Streaming Platforms</span>
              <span className="text-[10px] font-mono text-rose-400 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">Custom Logo Support</span>
            </div>

            {/* List of currently added custom platforms */}
            {links.customPlatforms && links.customPlatforms.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {links.customPlatforms.map((plat) => (
                  <div key={plat.id} className="flex items-center justify-between p-3 bg-neutral-900/60 border border-neutral-850 rounded-xl">
                    <div className="flex items-center gap-3">
                      {plat.logoUrl ? (
                        <img src={plat.logoUrl} alt={plat.name} className="w-6 h-6 rounded-md object-cover border border-neutral-700" />
                      ) : (
                        <div className="w-6 h-6 rounded-md bg-neutral-850 border border-neutral-700 flex items-center justify-center">
                          <Music className="w-3.5 h-3.5 text-neutral-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold text-white">{plat.name}</p>
                        <p className="text-[10px] text-neutral-400 truncate max-w-[150px] sm:max-w-xs">{plat.url}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomPlatform(plat.id)}
                      className="text-neutral-500 hover:text-red-400 p-1.5 hover:bg-neutral-800 rounded-lg transition cursor-pointer"
                      title="Remove Platform"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add custom platform form */}
            <div className="bg-neutral-950/40 p-4 border border-neutral-850 rounded-2xl space-y-4">
              <p className="text-[11px] font-medium text-neutral-300">Add a platform not listed above (e.g. Tidal, Deezer, Amazon Music, Audiomack):</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Platform Name</label>
                  <input
                    type="text"
                    value={newPlatformName}
                    onChange={(e) => setNewPlatformName(e.target.value)}
                    className="w-full bg-black/20 border border-neutral-850 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                    placeholder="e.g. Tidal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Stream Link URL</label>
                  <input
                    type="text"
                    value={newPlatformUrl}
                    onChange={(e) => setNewPlatformUrl(e.target.value)}
                    className="w-full bg-black/20 border border-neutral-850 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                    placeholder="https://tidal.com/track/..."
                  />
                </div>
              </div>

              {/* Logo Upload Sub-Component */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Upload Platform Icon (Optional)</label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  
                  {/* File dropzone / click zone */}
                  <label className="flex-grow w-full h-16 border border-dashed border-neutral-800 hover:border-rose-500/50 bg-black/10 hover:bg-rose-500/2 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition">
                    <input
                      type="file"
                      ref={customLogoInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Upload className="w-4 h-4 text-neutral-400" />
                    <span className="text-[11px] text-neutral-400 font-medium">Click to upload brand logo</span>
                  </label>

                  {/* Preview of logo */}
                  {newPlatformLogo ? (
                    <div className="flex items-center gap-2 bg-neutral-900/80 p-2 border border-neutral-800 rounded-xl">
                      <img src={newPlatformLogo} alt="Logo preview" className="w-10 h-10 rounded-lg object-cover border border-neutral-700" />
                      <button
                        type="button"
                        onClick={() => setNewPlatformLogo("")}
                        className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-red-400 transition cursor-pointer"
                        title="Clear logo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center text-[10px] text-neutral-500 text-center px-1 font-mono leading-tight">
                      No Logo
                    </div>
                  )}
                </div>
                {logoUploadError && (
                  <p className="text-[10px] text-rose-400 mt-1">{logoUploadError}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleAddCustomPlatform}
                disabled={!newPlatformName.trim() || !newPlatformUrl.trim()}
                className="w-full py-2 bg-neutral-800 hover:bg-rose-500/10 hover:text-rose-400 text-neutral-300 disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-neutral-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Platform Link</span>
              </button>
            </div>
          </div>

          <button
            onClick={handlePublishLink}
            disabled={!slug.trim() || !title.trim() || !artist.trim()}
            id="publish-hub-btn"
            className="w-full py-4 bg-rose-600 hover:bg-rose-500 disabled:bg-neutral-800 text-white rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Save className="w-4 h-4 text-white" />
            <span>Publish Live HeartLink</span>
          </button>
        </div>
      </div>

      {/* Right Column: Analytics & Published Links (5 columns) */}
      <div className="lg:col-span-5 space-y-8">
        
        {/* Quick analytics card overview */}
        <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-3xl backdrop-blur-md flex justify-between items-center text-left">
          <div>
            <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Live traffic summary
            </span>
            <p className="text-2xl font-display font-extrabold text-white mt-1">{totalViewsAcrossLinks}</p>
            <p className="text-xs text-neutral-500 mt-0.5">Total fan-routing visits logged</p>
          </div>
          <div className="w-12 h-12 bg-rose-950/30 rounded-2xl border border-rose-900/30 flex items-center justify-center text-rose-500 shadow-inner">
            <BarChart3 className="w-6 h-6 text-rose-500" />
          </div>
        </div>

        {/* Links Manager List */}
        <div className="bg-neutral-900/40 border border-neutral-800 p-6 rounded-3xl backdrop-blur-md space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Active Published links</span>
          
          <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
            {publishedLinks.map((link) => (
              <button
                key={link.slug}
                id={`mgr-link-select-${link.slug}`}
                onClick={() => setSelectedAnalyticsLink(link)}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition cursor-pointer ${
                  selectedAnalyticsLink?.slug === link.slug 
                    ? "border-rose-500/60 bg-rose-500/5" 
                    : "border-neutral-850 hover:bg-neutral-850 bg-black/10"
                }`}
              >
                <img
                  src={link.imageUrl}
                  alt={link.title}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 object-cover rounded-lg border border-white/5 flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{link.title}</h4>
                  <p className="text-[10px] font-mono text-neutral-500">/hl/{link.slug}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-mono font-bold text-neutral-300">{link.views || 0}</span>
                  <p className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">views</p>
                </div>
              </button>
            ))}

            {publishedLinks.length === 0 && (
              <div className="py-12 text-center border border-dashed border-neutral-850 rounded-2xl opacity-40 text-xs font-mono">
                No active links found. Paste a track link above to publish.
              </div>
            )}
          </div>
        </div>

        {/* Detailed Smart Analytics Dashboard Panel */}
        {selectedAnalyticsLink && (
          <div className="bg-neutral-900/40 border border-neutral-800 p-6 rounded-3xl backdrop-blur-md space-y-5 text-left">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Analytics report</span>
                <h3 className="text-sm font-bold text-white truncate max-w-[180px]">{selectedAnalyticsLink.title}</h3>
              </div>
              <button
                onClick={() => onNavigateToSlug(selectedAnalyticsLink.slug)}
                id="view-active-analytics-btn"
                className="py-1.5 px-3 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/35 text-rose-400 text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Platform tap conversion percentages */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase text-neutral-500">Quick-tap click conversions</span>
              
              <div className="space-y-3">
                {[
                  { key: "spotify", name: "Spotify clicks", color: "bg-[#1DB954]", icon: Music },
                  { key: "youtube", name: "YouTube clicks", color: "bg-[#FF0000]", icon: Youtube },
                  { key: "appleMusic", name: "Apple clicks", color: "bg-[#FC3C44]", icon: Radio },
                  { key: "soundcloud", name: "SoundCloud clicks", color: "bg-[#FF5500]", icon: Disc },
                ].map((plat) => {
                  const clickCount = selectedAnalyticsLink.clicks?.[plat.key] || 0;
                  const totalClicks = (Object.values(selectedAnalyticsLink.clicks || {}) as number[]).reduce((a, b) => a + b, 0) || 1;
                  const percent = Math.min(100, Math.round((clickCount / totalClicks) * 100));
                  const PlatIcon = plat.icon;

                  return (
                    <div key={plat.key} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-neutral-400 flex items-center gap-1.5">
                          <PlatIcon className="w-3.5 h-3.5" />
                          {plat.name}
                        </span>
                        <span className="text-white font-bold">{clickCount} <span className="text-neutral-500">({percent}%)</span></span>
                      </div>
                      <div className="relative h-1.5 bg-neutral-950 rounded-full overflow-hidden">
                        <div 
                          className={`absolute top-0 left-0 h-full ${plat.color} rounded-full transition-all duration-500`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
