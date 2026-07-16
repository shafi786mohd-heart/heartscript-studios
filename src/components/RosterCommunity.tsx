import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  MessageSquare, 
  Star, 
  Music, 
  Send, 
  Calendar, 
  Disc, 
  Clock,
  Heart,
  Volume2,
  RefreshCw,
  Search,
  Plus,
  CheckCircle2,
  ExternalLink,
  SlidersHorizontal,
  Sparkles,
  Upload,
  Award,
  Info,
  Trash2,
  Radio
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TrackComment } from "../types";

interface SubscriberTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  url: string;
  submittedBy: string;
  notes: string;
  createdAt?: string;
}

export default function RosterCommunity() {
  const initialFallbackTracks: SubscriberTrack[] = [
    {
      id: "sub_1",
      title: "Moonlight Script (Chill Lofi)",
      artist: "Alex Mercer",
      genre: "Lofi Hip-Hop",
      url: "https://open.spotify.com/track/4PTG3Z6ehGkBF36qI6E67g",
      submittedBy: "Mercer Beats",
      notes: "Late night coding vibes. Made with analog tape delay and vintage Rhodes keys."
    },
    {
      id: "sub_2",
      title: "Cyan Static (Retro Synth)",
      artist: "VibeSeeker",
      genre: "Synthwave",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      submittedBy: "NeonDrifter",
      notes: "Dystopian cyberpunk highway tunes. Turn up the neon slider!"
    },
    {
      id: "sub_3",
      title: "Heartbeat Resonance",
      artist: "Acoustic Aura",
      genre: "Indie Folk / Ambient",
      url: "https://open.spotify.com/track/303DAsu28eS8BfG47M1s6h",
      submittedBy: "Acoustic Aura",
      notes: "Gentle hollow-body guitar strums with spacey delay and light vocal hums."
    },
    {
      id: "sub_4",
      title: "Lo-Fi Study Coffee",
      artist: "Study Beats Collective",
      genre: "Chillhop",
      url: "https://soundcloud.com/user-94813583/lofi-hip-hop-radio-beats-to-relax-study-to",
      submittedBy: "Study Beats Collective",
      notes: "An absolute ambient masterpiece perfect for coding, studying, and relaxing."
    },
    {
      id: "sub_5",
      title: "Dusk Horizon",
      artist: "Midnight Wave",
      genre: "Dreamwave",
      url: "https://open.spotify.com/track/7ouMYWpwJ422jWrDAS8765",
      submittedBy: "Midnight Wave",
      notes: "Retro 80s drums with nostalgic sunset pads."
    }
  ];

  // Core Track List & Active Selection States
  const [allTracks, setAllTracks] = useState<SubscriberTrack[]>([]);
  const [activeTrack, setActiveTrack] = useState<SubscriberTrack | null>(null);
  const [comments, setComments] = useState<TrackComment[]>([]);
  const [activeTab, setActiveTab] = useState<"player" | "submit">("player");
  const [loadingTracks, setLoadingTracks] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<"all" | "spotify" | "youtube" | "soundcloud">("all");

  // Subscriber Form states
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [genre, setGenre] = useState("Lofi");
  const [notes, setNotes] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // License integration
  const [userLicense, setUserLicense] = useState<string | null>(null);

  // Guestbook Form states
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentRating, setCommentRating] = useState(5);
  const [submittingComment, setSubmittingComment] = useState(false);

  // Load Tracks & License on mount
  useEffect(() => {
    // 1. Check for license in localStorage
    const savedLicense = localStorage.getItem("heartscript_license");
    if (savedLicense) {
      setUserLicense(savedLicense);
      setLicenseKey(savedLicense);
    }

    // 2. Load tracks from public/tracks.json & merge with localStorage submissions
    const fetchAndMergeTracks = async () => {
      setLoadingTracks(true);
      let fetched: SubscriberTrack[] = [];
      try {
        const res = await fetch("/tracks.json");
        if (res.ok) {
          fetched = await res.json();
        }
      } catch (e) {
        console.error("Could not fetch tracks.json, using fallbacks.", e);
      }

      if (!fetched || fetched.length === 0) {
        fetched = [...initialFallbackTracks];
      }

      // Add local submissions from localStorage
      const localStr = localStorage.getItem("heartscript_submitted_tracks");
      if (localStr) {
        try {
          const localTracks = JSON.parse(localStr);
          if (Array.isArray(localTracks)) {
            // Place local tracks first
            fetched = [...localTracks, ...fetched];
          }
        } catch (err) {
          console.error("Failed parsing local tracks:", err);
        }
      }

      setAllTracks(fetched);
      if (fetched.length > 0) {
        setActiveTrack(fetched[0]);
      }
      setLoadingTracks(false);
    };

    fetchAndMergeTracks();
  }, []);

  // Fetch comments whenever activeTrack changes
  useEffect(() => {
    if (activeTrack) {
      fetchComments();
    }
  }, [activeTrack]);

  const fetchComments = async () => {
    if (!activeTrack) return;
    try {
      const res = await fetch(`/api/comments?trackId=${activeTrack.id}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (e) {
      console.error("Failed fetching comments for track", e);
    }
  };

  // Convert typical Spotify/YouTube/SoundCloud links into their direct Embed URL equivalents
  const getEmbedUrl = (url: string): string => {
    if (!url) return "";
    const cleanUrl = url.trim();

    // 1. Spotify Embedded conversion
    if (cleanUrl.includes("spotify.com")) {
      if (cleanUrl.includes("/embed/")) return cleanUrl;
      // Convert standard tracks, albums, playlists, artists links
      return cleanUrl.replace("open.spotify.com/", "open.spotify.com/embed/");
    }

    // 2. YouTube Embedded conversion
    if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
      let videoId = "";
      if (cleanUrl.includes("youtu.be/")) {
        const parts = cleanUrl.split("youtu.be/");
        if (parts[1]) videoId = parts[1].split(/[?#]/)[0];
      } else if (cleanUrl.includes("v=")) {
        const parts = cleanUrl.split("v=");
        if (parts[1]) videoId = parts[1].split(/[&?#]/)[0];
      } else if (cleanUrl.includes("embed/")) {
        return cleanUrl;
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
      }
    }

    // 3. SoundCloud Embedded conversion
    if (cleanUrl.includes("soundcloud.com")) {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(cleanUrl)}&color=%23f43f5e&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
    }

    return cleanUrl;
  };

  // Check what service a URL belongs to
  const getUrlService = (url: string): "spotify" | "youtube" | "soundcloud" | "generic" => {
    if (!url) return "generic";
    if (url.includes("spotify.com")) return "spotify";
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    if (url.includes("soundcloud.com")) return "soundcloud";
    return "generic";
  };

  // Handle subscriber track submissions (saves to local state + localStorage)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    if (!songTitle.trim() || !artistName.trim() || !songUrl.trim()) {
      setFormError("Please fill out all required fields marked with *.");
      return;
    }

    // Basic URL validation
    const urlLower = songUrl.toLowerCase();
    if (!urlLower.startsWith("http://") && !urlLower.startsWith("https://")) {
      setFormError("Please enter a valid URL beginning with http:// or https://");
      return;
    }

    const service = getUrlService(songUrl);
    if (service === "generic") {
      setFormError("Please provide an official song link from Spotify, YouTube, or SoundCloud.");
      return;
    }

    // Construct new subscriber track object
    const newTrackId = `track_local_${Date.now()}`;
    const newTrack: SubscriberTrack = {
      id: newTrackId,
      title: songTitle.trim(),
      artist: artistName.trim(),
      genre: genre.trim(),
      url: songUrl.trim(),
      submittedBy: submittedBy.trim() || artistName.trim(),
      notes: notes.trim() || "Independent creator showcase track. Stream it below!"
    };

    // Save to local tracks list
    const currentLocalTracksStr = localStorage.getItem("heartscript_submitted_tracks");
    let currentLocalTracks: SubscriberTrack[] = [];
    if (currentLocalTracksStr) {
      try {
        currentLocalTracks = JSON.parse(currentLocalTracksStr);
      } catch (err) {
        console.error("Error loading local tracks state", err);
      }
    }

    const updatedLocal = [newTrack, ...currentLocalTracks];
    localStorage.setItem("heartscript_submitted_tracks", JSON.stringify(updatedLocal));

    // Update main tracks list
    setAllTracks((prev) => [newTrack, ...prev]);
    setActiveTrack(newTrack);
    setFormSuccess(true);

    // Reset inputs
    setSongTitle("");
    setArtistName("");
    setSongUrl("");
    setNotes("");
    setSubmittedBy("");

    // Switch tab to player instantly to preview the track!
    setTimeout(() => {
      setActiveTab("player");
      setFormSuccess(false);
    }, 1500);
  };

  // Handle removing a locally submitted track
  const handleRemoveLocalTrack = (idToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid selecting track
    const confirmDelete = window.confirm("Are you sure you want to remove your submitted track from your local showcase session?");
    if (!confirmDelete) return;

    const currentLocalTracksStr = localStorage.getItem("heartscript_submitted_tracks");
    if (currentLocalTracksStr) {
      try {
        const localTracks: SubscriberTrack[] = JSON.parse(currentLocalTracksStr);
        const filtered = localTracks.filter(t => t.id !== idToRemove);
        localStorage.setItem("heartscript_submitted_tracks", JSON.stringify(filtered));
      } catch (err) {
        console.error(err);
      }
    }

    setAllTracks((prev) => {
      const filtered = prev.filter(t => t.id !== idToRemove);
      if (activeTrack?.id === idToRemove) {
        setActiveTrack(filtered[0] || null);
      }
      return filtered;
    });
  };

  // Comment submission handling
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrack) return;
    if (!commentAuthor.trim() || !commentContent.trim()) return;

    try {
      setSubmittingComment(true);
      const payload = {
        trackId: activeTrack.id,
        author: commentAuthor.trim(),
        email: commentEmail.trim(),
        content: commentContent.trim(),
        rating: commentRating
      };

      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setCommentAuthor("");
        setCommentEmail("");
        setCommentContent("");
        setCommentRating(5);
        fetchComments();
      }
    } catch (err) {
      console.error("Error submitting guestbook review", err);
    } finally {
      setSubmittingComment(false);
    }
  };

  // Filtering Logic
  const filteredTracks = allTracks.filter((track) => {
    const service = getUrlService(track.url);
    const matchesPlatform = platformFilter === "all" || service === platformFilter;

    const matchesSearch = 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPlatform && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 text-left items-start relative z-10">
      
      {/* Left Column: Spotlight Player and Submission Forms (7 cols) */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Navigation Tabs for Player vs Submission */}
        <div className="flex border-b border-neutral-900 justify-between items-center pb-0.5">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("player")}
              id="tab-btn-player"
              className={`pb-4 px-1 text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer border-b-2 -mb-[2px] ${
                activeTab === "player"
                  ? "text-rose-500 border-rose-500"
                  : "text-neutral-500 hover:text-neutral-300 border-transparent"
              }`}
            >
              <Music className="w-4 h-4" />
              <span>Showcase Spotlight Player</span>
            </button>

            <button
              onClick={() => setActiveTab("submit")}
              id="tab-btn-submit"
              className={`pb-4 px-1 text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer border-b-2 -mb-[2px] ${
                activeTab === "submit"
                  ? "text-rose-500 border-rose-500"
                  : "text-neutral-500 hover:text-neutral-300 border-transparent"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Submit Song Showcase</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest bg-neutral-950/40 py-1 px-3 border border-neutral-900 rounded-full">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>{allTracks.length} Subscriber Tracks</span>
          </div>
        </div>

        {/* Tab 1 Content: Showcase Spotlight Player */}
        {activeTab === "player" && (
          <div className="space-y-6">
            {activeTrack ? (
              <div className="bg-neutral-900/30 border border-neutral-800 p-6 rounded-3xl backdrop-blur-md shadow-xl relative overflow-hidden space-y-6">
                
                {/* Background Rotating Disc Aesthetic */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Disc className="w-48 h-48 animate-spin text-white" style={{ animationDuration: "16s" }} />
                </div>

                {/* Selected Track Metadata Header */}
                <div className="flex flex-col sm:flex-row gap-5 items-start justify-between relative z-10 border-b border-neutral-800/40 pb-5">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/10">
                        {activeTrack.genre}
                      </span>
                      {activeTrack.id.includes("local") ? (
                        <span className="text-[9px] font-mono text-yellow-400 uppercase tracking-widest px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Local Session</span>
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>Pass Subscriber</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-display font-extrabold text-white leading-tight">
                        {activeTrack.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        By <span className="font-semibold text-neutral-200">{activeTrack.artist}</span>
                      </p>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed font-sans max-w-xl">
                      "{activeTrack.notes}"
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-shrink-0 text-right">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">Submitted By</span>
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5 bg-black/30 px-3 py-1 border border-neutral-850 rounded-xl">
                      <Award className="w-3.5 h-3.5 text-rose-500" />
                      {activeTrack.submittedBy}
                    </span>
                    <a
                      href={activeTrack.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1 mt-1 underline"
                    >
                      <span>Open Direct Link</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* Dynamic Browser-Side Embed Magic Block */}
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between items-center text-xs font-mono text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" />
                      <span>Streaming via Official public oEmbed Streamers</span>
                    </span>
                    <span className="uppercase text-[9px] tracking-wider px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                      {getUrlService(activeTrack.url)} Player
                    </span>
                  </div>

                  {/* Responsive Iframe Container */}
                  <div className="w-full bg-black/60 rounded-2xl overflow-hidden border border-neutral-800/80 shadow-2xl transition">
                    {getUrlService(activeTrack.url) === "spotify" ? (
                      <iframe
                        src={getEmbedUrl(activeTrack.url)}
                        width="100%"
                        height="352"
                        allowFullScreen={false}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="block w-full border-0"
                        title={activeTrack.title}
                      />
                    ) : getUrlService(activeTrack.url) === "youtube" ? (
                      <div className="relative w-full aspect-video">
                        <iframe
                          src={getEmbedUrl(activeTrack.url)}
                          width="100%"
                          height="100%"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                          className="absolute inset-0 w-full h-full border-0"
                          title={activeTrack.title}
                        />
                      </div>
                    ) : getUrlService(activeTrack.url) === "soundcloud" ? (
                      <iframe
                        src={getEmbedUrl(activeTrack.url)}
                        width="100%"
                        height="166"
                        allow="autoplay"
                        loading="lazy"
                        className="block w-full border-0"
                        title={activeTrack.title}
                      />
                    ) : (
                      <div className="py-12 text-center text-neutral-500 text-xs font-mono">
                        Unable to render embed player for this track link.
                      </div>
                    )}
                  </div>
                  
                  <p className="text-[10px] text-neutral-500 font-sans leading-relaxed text-center">
                    🎧 Tracks are fetched dynamically and streamed live from official Spotify/YouTube servers, ensuring blazing-fast site speed and 100% legal hosting.
                  </p>
                </div>

              </div>
            ) : (
              <div className="py-16 text-center border border-dashed border-neutral-800 rounded-3xl text-neutral-500 font-mono text-xs">
                No active showcase track loaded. Fetching tracks...
              </div>
            )}
          </div>
        )}

        {/* Tab 2 Content: Subscriber Submission Portal */}
        {activeTab === "submit" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/30 border border-neutral-800 p-6 rounded-3xl backdrop-blur-md shadow-xl relative overflow-hidden space-y-6"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-rose-500" />
                  <span>Subscriber Roster Submission</span>
                </h3>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400">SERVERLESS STORE</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed font-sans">
                Are you an active license holder? Submit your song link to join the showcase immediately. Visitors can stream your official music player directly, boosting your streams and followers in a lightweight, high-performance roster.
              </p>
            </div>

            {/* License verification callout */}
            {userLicense ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white leading-none">Creator License Verified</p>
                  <p className="text-[10px] text-emerald-400/80 font-mono mt-1">License Key: {userLicense}</p>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-950/40 border border-neutral-850 p-4 rounded-2xl flex items-start gap-3">
                <Info className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-neutral-200">No Premium License Found</p>
                  <p className="text-[10px] text-neutral-400 leading-normal font-sans">
                    Subscription-based tracks can still be mock-submitted here. They will appear inside your local session grid instantly! To save permanent songs globally in the repository, subscribers can edit <code className="font-mono bg-black px-1 rounded text-rose-400 text-[10px]">tracks.json</code>.
                  </p>
                </div>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Song Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                    placeholder="e.g. Dreamscape Avenue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Artist / Band Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                    placeholder="e.g. Lofi Cadet"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Official Song URL * (Spotify, YouTube, or SoundCloud)
                </label>
                <input
                  type="text"
                  required
                  value={songUrl}
                  onChange={(e) => setSongUrl(e.target.value)}
                  className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none transition font-mono"
                  placeholder="e.g. https://open.spotify.com/track/4PTG3Z6ehGkBF36qI6E67g"
                />
                <span className="text-[9px] text-neutral-500 font-sans block">
                  Supports Spotify track links, YouTube URLs/Shorts, and SoundCloud share links.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Genre / Mood Tag
                  </label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  >
                    <option value="Lofi Hip-Hop">Lofi Hip-Hop</option>
                    <option value="Synthwave">Synthwave</option>
                    <option value="Ambient Chill">Ambient Chill</option>
                    <option value="Acoustic Folk">Acoustic Folk</option>
                    <option value="Cyberpunk Beats">Cyberpunk Beats</option>
                    <option value="Dream Pop">Dream Pop</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Submitted By / Alias
                  </label>
                  <input
                    type="text"
                    value={submittedBy}
                    onChange={(e) => setSubmittedBy(e.target.value)}
                    className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                    placeholder="e.g. Lofi Cadet (or blank to match Artist)"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Artist Note / Inspiration (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition font-sans leading-normal"
                  placeholder="Tell listeners what inspired this track..."
                />
              </div>

              {formError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Showcase submitted successfully! Swapping to preview player...</span>
                </div>
              )}

              <button
                type="submit"
                id="submit-roster-song-btn"
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Subscription Showcase</span>
              </button>
            </form>
          </motion.div>
        )}

        {/* Search, Filters, and Track list Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block self-start sm:self-center">
              Subscriber Showcase Roster
            </span>

            {/* Quick Search and filters */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-rose-500/60 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none transition"
                  placeholder="Search title, artist, genre..."
                />
              </div>
            </div>
          </div>

          {/* Platform filter pills */}
          <div className="flex flex-wrap gap-2 border-b border-neutral-900/60 pb-3">
            {[
              { id: "all", label: "All Showcase" },
              { id: "spotify", label: "Spotify Links" },
              { id: "youtube", label: "YouTube Videos" },
              { id: "soundcloud", label: "SoundCloud Tracks" }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setPlatformFilter(pill.id as any)}
                className={`py-1 px-3 text-[10px] font-mono tracking-wider uppercase rounded-full border transition cursor-pointer ${
                  platformFilter === pill.id
                    ? "bg-rose-500/10 border-rose-500/40 text-rose-400"
                    : "bg-black/20 border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Grid Layout of Cards */}
          {loadingTracks ? (
            <div className="py-16 text-center text-neutral-500 text-xs font-mono">
              Loading subscriber roster...
            </div>
          ) : filteredTracks.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-neutral-850 rounded-2xl opacity-40 text-xs font-mono">
              No subscriber tracks found matching search parameters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTracks.map((track) => {
                const service = getUrlService(track.url);
                const isActive = activeTrack?.id === track.id;

                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      setActiveTrack(track);
                      setActiveTab("player");
                    }}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3.5 transition cursor-pointer relative overflow-hidden group ${
                      isActive
                        ? "border-rose-500 bg-rose-500/5 ring-2 ring-rose-500/10"
                        : "border-neutral-850 hover:bg-neutral-850/30 hover:border-neutral-700 bg-black/10"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-white group-hover:text-rose-400 transition truncate leading-snug">
                            {track.title}
                          </h4>
                          <span className="text-[10px] text-neutral-400 mt-0.5 block">
                            By <span className="font-semibold">{track.artist}</span>
                          </span>
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-black/40 border border-neutral-800 uppercase tracking-widest text-neutral-400">
                            {track.genre}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-neutral-500 leading-normal font-sans line-clamp-2">
                        {track.notes}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2.5 border-t border-neutral-850/60 text-[9px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-rose-500" />
                        <span className="text-neutral-400">Owner: {track.submittedBy}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-rose-400 font-semibold uppercase tracking-wider flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Preview</span>
                          <Play className="w-2.5 h-2.5 fill-rose-400" />
                        </span>

                        {/* Allow removal if locally submitted track to keep session clean */}
                        {track.id.includes("local") && (
                          <button
                            type="button"
                            onClick={(e) => handleRemoveLocalTrack(track.id, e)}
                            className="p-1 text-neutral-600 hover:text-rose-400 transition hover:bg-neutral-800 rounded"
                            title="Remove Track"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Subtle aesthetic indicator of active state */}
                    {isActive && (
                      <div className="absolute right-0 top-0 h-full w-1 bg-rose-500" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Right Column: Guestbook Comment Feed (5 cols) */}
      <div className="lg:col-span-5 space-y-8 bg-neutral-900/40 border border-neutral-800 p-8 rounded-3xl backdrop-blur-md">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-rose-500" />
            <span>Community Guestbook</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Read listener logs or submit feedback on <strong className="text-white">'{activeTrack ? activeTrack.title : "this track"}'</strong>.
          </p>
        </div>

        {/* Comment Entry Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3.5">
            <input
              type="text"
              required
              value={commentAuthor}
              id="comment-author-input"
              onChange={(e) => setCommentAuthor(e.target.value)}
              className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
              placeholder="Username *"
            />
            <input
              type="email"
              value={commentEmail}
              id="comment-email-input"
              onChange={(e) => setCommentEmail(e.target.value)}
              className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
              placeholder="Email (optional)"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-neutral-500 font-mono">
              <span>Your rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    id={`rating-star-select-${star}`}
                    onClick={() => setCommentRating(star)}
                    className="p-0.5 text-amber-500 hover:scale-110 transition cursor-pointer"
                  >
                    <Star className={`w-4 h-4 ${star <= commentRating ? "fill-amber-500 text-amber-500" : "text-neutral-700"}`} />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              rows={3}
              required
              value={commentContent}
              id="comment-content-textarea"
              onChange={(e) => setCommentContent(e.target.value)}
              className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition leading-normal"
              placeholder="Write review/feedback log..."
            />
          </div>

          <button
            type="submit"
            disabled={submittingComment || !activeTrack}
            id="submit-comment-btn"
            className="w-full py-3 bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-40"
          >
            {submittingComment ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>Log Listener Review</span>
          </button>
        </form>

        {/* Live Database-synced comments feed */}
        <div className="border-t border-neutral-850 pt-6 space-y-4 text-left">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            Guestbook feed
          </span>
          
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
            {comments.map((comm) => (
              <div 
                key={comm.id} 
                className="bg-black/25 border border-neutral-850 p-4 rounded-2xl space-y-2.5 hover:bg-neutral-850/20 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none">{comm.author}</h4>
                    <span className="text-[9px] font-mono text-neutral-500 mt-1 block">
                      {new Date(comm.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star 
                        key={idx} 
                        className={`w-3 h-3 ${idx < comm.rating ? "fill-amber-500 text-amber-500" : "text-neutral-800"}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">{comm.content}</p>
              </div>
            ))}

            {comments.length === 0 && (
              <div className="py-12 text-center border border-dashed border-neutral-850 rounded-2xl opacity-40 text-xs font-mono">
                No listener logs for this track yet. Write the first one!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
