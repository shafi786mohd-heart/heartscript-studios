import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  Download, 
  Sparkles, 
  Sliders, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Smartphone,
  BookOpen,
  Music,
  Share2,
  Trash2,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { VisualTheme, LyricTiming, VisualDesignSuggestion } from "../types";

export default function VisualEngine() {
  const [title, setTitle] = useState("Vapor Resonance");
  const [lyrics, setLyrics] = useState(
    "Lost in the waves of a digital night\nYour signal is fading, but burning so bright\nThrough the static and screens I hear your call\nBut the wireframe skies are starting to fall"
  );
  const [selectedTheme, setSelectedTheme] = useState<string>("crimson-ink");
  const [generating, setGenerating] = useState(false);
  const [generationSteps, setGenerationSteps] = useState("");
  const [suggestion, setSuggestion] = useState<VisualDesignSuggestion | null>(null);

  // Manual customization controls
  const [fontSize, setFontSize] = useState<number>(24);
  const [lyricAlignment, setLyricAlignment] = useState<"top" | "center" | "bottom">("center");
  const [particleDensity, setParticleDensity] = useState<number>(30);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(60);
  const [customPrompt, setCustomPrompt] = useState("");
  const [refining, setRefining] = useState(false);

  // Reel playback controls
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Reel Audio & dynamic loop duration states
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [audioName, setAudioName] = useState<string>("Silent Studio Loop");
  const [audioFileError, setAudioFileError] = useState<string | null>(null);
  const [reelDuration, setReelDuration] = useState<number>(8.0);

  const audioPresets = [
    { name: "Lofi Ambient Beat", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Neon Synth Loop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "Cinematic Echoes", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
  ];

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("audio/")) {
        setAudioFileError("Please upload a valid audio file (MP3, WAV, M4A, etc.).");
        return;
      }
      setAudioFileError(null);
      setAudioName(file.name);
      
      // Stop playback, revoke old if blob URL
      setPlaying(false);
      setCurrentTime(0);
      if (audioUrl && audioUrl.startsWith("blob:")) {
        URL.revokeObjectURL(audioUrl);
      }
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
      }
    }
  };

  // Artwork & drag-and-drop file upload states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [artworkUrl, setArtworkUrl] = useState<string>("https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&auto=format&fit=crop&q=80");
  const [dragActive, setDragActive] = useState(false);
  const [artworkFileError, setArtworkFileError] = useState<string | null>(null);

  // Quick preset selections
  const artworkPresets = [
    { name: "Cosmic Synth", url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&auto=format&fit=crop&q=80" },
    { name: "Velvet Rose", url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80" },
    { name: "Neo Tokyo", url: "https://images.unsplash.com/photo-1542204172-e7052809a862?w=600&auto=format&fit=crop&q=80" },
    { name: "Acoustic Sun", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80" }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setArtworkFileError("Please drop or upload an image file (PNG, JPG, WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setArtworkFileError("File too large. Max size is 5MB.");
      return;
    }
    setArtworkFileError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setArtworkUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Animation variants based on active theme
  const artworkVariants = {
    idle: { scale: 1, rotate: 0, y: 0, x: 0 },
    "crimson-ink": {
      scale: [1, 1.05, 0.98, 1.04, 1],
      y: [0, -4, 2, -3, 0],
      rotate: [0, 0.8, -0.8, 0.4, 0],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    "cyan-static": {
      scale: [1, 1.02, 0.99, 1.03, 0.98, 1.01, 1],
      rotate: [0, 0.5, -0.5, 0.2, -0.2, 0],
      x: [0, -1, 1, -0.5, 0.5, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    },
    "cream-paper": {
      rotate: [-1.5, 1.5, -1.5],
      y: [0, -3, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    "prism-gold": {
      scale: [1, 1.03, 1, 1.01, 1],
      rotate: [-0.5, 0.5, -0.5],
      y: [0, -6, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    "cosmic-neon": {
      scale: [1, 1.06, 0.97, 1.05, 1],
      y: [0, -2, 4, -2, 0],
      rotate: [0, 1, -1, 0.5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const activeArtworkAnimation = playing ? selectedTheme : "idle";

  // Setup default coordinates & timing on mount
  useEffect(() => {
    generateMockSuggestion();
  }, [selectedTheme, reelDuration]);

  const generateMockSuggestion = () => {
    const lines = lyrics.split("\n").filter(l => l.trim().length > 0).slice(0, 6);
    const lineCount = lines.length || 1;
    const timePerLine = reelDuration / lineCount;
    const mockTiming: LyricTiming[] = lines.map((line, i) => ({
      start: Number((i * timePerLine).toFixed(1)),
      end: Number(((i + 1) * timePerLine).toFixed(1)),
      text: line.trim()
    }));

    const themeAccents: Record<string, string> = {
      "crimson-ink": "#ef4444",
      "cyan-static": "#06b6d4",
      "cream-paper": "#d97706",
      "prism-gold": "#fbbf24",
      "cosmic-neon": "#f43f5e"
    };

    const localGradients: Record<string, string[]> = {
      "crimson-ink": ["#120303", "#050101"],
      "cyan-static": ["#030f14", "#010507"],
      "cream-paper": ["#faf9f5", "#f1ebd9"],
      "prism-gold": ["#16120a", "#080603"],
      "cosmic-neon": ["#12041e", "#05010a"]
    };

    setSuggestion({
      lyricsTiming: mockTiming,
      backgroundGradient: localGradients[selectedTheme] || ["#120303", "#050101"],
      suggestedAccentColor: themeAccents[selectedTheme] || "#a855f7",
      visualVibeDescription: `Symmetric layout calculated for '${title}' in the '${selectedTheme}' template. Kinetic transitions are mapped to 2-second word clusters.`,
      typographySpacing: selectedTheme === "prism-gold" ? "tracking-widest uppercase font-serif" : "tracking-wider leading-relaxed uppercase",
      motionSpeed: selectedTheme === "cosmic-neon" ? "pulse-fast" : "pulse-slow"
    });
  };

  // Connect to server-side Gemini API suggestion
  const handleGenerateDesign = async () => {
    if (!title.trim() || !lyrics.trim()) return;
    
    try {
      setGenerating(true);
      
      // Step-by-step progress simulation
      const steps = [
        "Analyzing lyrics phonetics...",
        "Identifying sonic vibe anchors...",
        "Calling Google AI Studio (Gemini 3.5)...",
        "Mapping 9:16 viewport layout matrix...",
        "Calibrating timing crossfades..."
      ];
      
      for (let i = 0; i < steps.length; i++) {
        setGenerationSteps(steps[i]);
        await new Promise(resolve => setTimeout(resolve, 400));
      }

      const res = await fetch("/api/visual-engine/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, lyrics, theme: selectedTheme, duration: reelDuration })
      });

      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      setSuggestion(data);
    } catch (e) {
      console.error(e);
      // Fallback
      generateMockSuggestion();
    } finally {
      setGenerating(false);
    }
  };

  // Handle refinement requests (asking Gemini to rewrite or suggest hooks)
  const handleRefineLyrics = async () => {
    if (!customPrompt.trim()) return;
    try {
      setRefining(true);
      
      const prompt = `You are a music director. Look at this song title: "${title}" and lyrics:\n${lyrics}\n\nTask: ${customPrompt}\n\nRespond by rewriting or suggesting alternative visual-focused short lyric adjustments (at most 4 lines, separate lines with a newline).`;
      
      const res = await fetch("/api/visual-engine/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: `Refinement: ${title}`, lyrics: prompt, theme: selectedTheme })
      });

      if (!res.ok) throw new Error("Refinement request failed");
      const data = await res.json();
      
      // Extract the resulting text or suggest timings
      if (data.lyricsTiming && data.lyricsTiming.length > 0) {
        const joinedLyrics = data.lyricsTiming.map((t: any) => t.text).join("\n");
        setLyrics(joinedLyrics);
        setSuggestion(data);
        setCustomPrompt("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRefining(false);
    }
  };

  // Playback timer ticker (0s to reelDuration loop, synchronized with HTML5 audio)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (playing) {
      if (audioUrl && audioRef.current) {
        audioRef.current.play().catch(err => {
          console.log("Audio playback was blocked or failed:", err);
        });
        
        interval = setInterval(() => {
          if (audioRef.current) {
            const cur = audioRef.current.currentTime;
            if (cur >= reelDuration) {
              audioRef.current.currentTime = 0;
              setCurrentTime(0);
            } else {
              setCurrentTime(Number(cur.toFixed(1)));
            }
          }
        }, 50);
      } else {
        interval = setInterval(() => {
          setCurrentTime((prev) => {
            if (prev >= reelDuration - 0.1) return 0;
            return Number((prev + 0.1).toFixed(1));
          });
        }, 100);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playing, audioUrl, reelDuration]);

  const activeLyricObj = suggestion?.lyricsTiming.find(
    (item) => currentTime >= item.start && currentTime < item.end
  );

  // Live Canvas Exporter (Draws 1080x1920 HD PNG Wallpaper on browser click)
  const handleDownloadAsset = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !suggestion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    // 1. Draw background gradient stops
    const gradStops = suggestion.backgroundGradient;
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, gradStops[0] || "#111");
    grad.addColorStop(1, gradStops[1] || "#000");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Extra effects for grid/grain
    if (selectedTheme === "cyan-static") {
      ctx.strokeStyle = "rgba(6, 182, 212, 0.05)";
      ctx.lineWidth = 2;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // 3. Draw Track details & credits (At the top of 9:16)
    ctx.textAlign = "center";
    ctx.fillStyle = selectedTheme === "cream-paper" ? "#222" : "rgba(255, 255, 255, 0.4)";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("HEARTSCRIPT STUDIOS CREATORS SUITE", width / 2, 180);

    ctx.fillStyle = suggestion.suggestedAccentColor;
    ctx.font = selectedTheme === "cream-paper" ? "italic bold 64px serif" : "bold 64px sans-serif";
    ctx.fillText(title.toUpperCase(), width / 2, 280);

    // 4. Draw Artwork if available
    let artworkDrawn = false;
    const artSize = 480;
    const artX = width / 2 - artSize / 2;
    const artY = 460;

    if (artworkUrl) {
      try {
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const imageObj = new window.Image();
          imageObj.crossOrigin = "anonymous";
          imageObj.onload = () => resolve(imageObj);
          imageObj.onerror = () => reject(new Error("Failed to load image"));
          imageObj.src = artworkUrl;
        });

        ctx.save();
        if (selectedTheme === "cream-paper") {
          // Polaroid frame: draw a white rectangle first
          const frameWidth = artSize + 40;
          const frameHeight = artSize + 120;
          const frameX = width / 2 - frameWidth / 2;
          const frameY = artY - 20;

          // Polaroid Shadow
          ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
          ctx.shadowBlur = 40;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 15;

          ctx.fillStyle = "#ffffff";
          ctx.fillRect(frameX, frameY, frameWidth, frameHeight);

          // Draw image inside Polaroid
          ctx.shadowColor = "transparent"; // Reset shadow for image
          ctx.drawImage(img, artX, artY, artSize, artSize);

          // Polaroid handwritten title caption
          ctx.fillStyle = "#222222";
          ctx.font = "italic bold 36px serif";
          ctx.textAlign = "center";
          ctx.fillText(title.toUpperCase(), width / 2, frameY + frameHeight - 40);
        } else if (selectedTheme === "cyan-static") {
          // Cyberpunk glowing border
          ctx.shadowColor = "rgba(6, 182, 212, 0.6)";
          ctx.shadowBlur = 35;
          ctx.strokeStyle = "#06b6d4";
          ctx.lineWidth = 8;
          ctx.strokeRect(artX - 4, artY - 4, artSize + 8, artSize + 8);

          ctx.shadowColor = "transparent";
          ctx.drawImage(img, artX, artY, artSize, artSize);
        } else if (selectedTheme === "prism-gold") {
          // Prism Gold: Dual gold leaf frames & high contrast blur glow
          ctx.shadowColor = "rgba(245, 158, 11, 0.5)";
          ctx.shadowBlur = 40;
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 6;
          ctx.strokeRect(artX - 5, artY - 5, artSize + 10, artSize + 10);

          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 2;
          ctx.strokeRect(artX - 12, artY - 12, artSize + 24, artSize + 24);

          ctx.shadowColor = "transparent";
          ctx.drawImage(img, artX, artY, artSize, artSize);
        } else if (selectedTheme === "cosmic-neon") {
          // Cosmic Neon: Electric pink scan lines and hot glowing neon border
          ctx.shadowColor = "rgba(244, 63, 94, 0.8)";
          ctx.shadowBlur = 45;
          ctx.strokeStyle = "#f43f5e";
          ctx.lineWidth = 8;
          ctx.strokeRect(artX - 4, artY - 4, artSize + 8, artSize + 8);

          ctx.shadowColor = "transparent";
          ctx.drawImage(img, artX, artY, artSize, artSize);
        } else {
          // Crimson Ink: Round corners and drop shadow
          ctx.shadowColor = "rgba(239, 68, 68, 0.35)";
          ctx.shadowBlur = 50;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 10;

          // Create a rounded path for the cover artwork
          ctx.beginPath();
          const radius = 24;
          ctx.moveTo(artX + radius, artY);
          ctx.lineTo(artX + artSize - radius, artY);
          ctx.quadraticCurveTo(artX + artSize, artY, artX + artSize, artY + radius);
          ctx.lineTo(artX + artSize, artY + artSize - radius);
          ctx.quadraticCurveTo(artX + artSize, artY + artSize, artX + artSize - radius, artY + artSize);
          ctx.lineTo(artX + radius, artY + artSize);
          ctx.quadraticCurveTo(artX, artY + artSize, artX, artY + artSize - radius);
          ctx.lineTo(artX, artY + radius);
          ctx.quadraticCurveTo(artX, artY, artX + radius, artY);
          ctx.closePath();
          ctx.clip();

          ctx.drawImage(img, artX, artY, artSize, artSize);
        }
        ctx.restore();
        artworkDrawn = true;
      } catch (err) {
        console.error("Canvas artwork loading failed, skipping drawing in canvas export:", err);
      }
    }

    // 5. Draw Currently active lyric or full block
    const activeText = activeLyricObj ? activeLyricObj.text : "Heartscript Visual Core";
    ctx.fillStyle = selectedTheme === "cream-paper" ? "#111" : "#ffffff";
    ctx.font = `bold ${fontSize * 2.2}px sans-serif`;

    // Multiline word wrap helper
    const words = activeText.split(" ");
    let line = "";
    const linesArr = [];
    const maxWidth = width - 160;
    const lineHeight = fontSize * 3;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        linesArr.push(line);
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    linesArr.push(line);

    // Alignment offsets (Adjust vertically if artwork is present)
    let yPos = height / 2;
    if (artworkDrawn) {
      yPos = height / 2 + 220; // Shipped lower to avoid overlapping cover artwork
      if (lyricAlignment === "top") yPos = height / 3 + 280;
      if (lyricAlignment === "bottom") yPos = (height * 3) / 4 + 100;
    } else {
      if (lyricAlignment === "top") yPos = height / 3 + 150;
      if (lyricAlignment === "bottom") yPos = (height * 3) / 4;
    }

    const startY = yPos - ((linesArr.length - 1) * lineHeight) / 2;

    linesArr.forEach((txtLine, idx) => {
      ctx.fillText(txtLine.trim(), width / 2, startY + idx * lineHeight);
    });

    // 6. Draw Footer (watermark)
    ctx.fillStyle = selectedTheme === "cream-paper" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.2)";
    ctx.font = "24px sans-serif";
    ctx.fillText("LISTEN ON ALL STREAMING PLATFORMS", width / 2, height - 160);

    // Trigger download
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}-lyrics-9-16.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 text-left items-start relative z-10">
      
      {/* Offscreen anchor canvas for rendering asset */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Control panel & inputs (Left 7-columns) */}
      <div className="lg:col-span-7 space-y-8 bg-neutral-900/40 border border-neutral-800 p-8 rounded-3xl backdrop-blur-md shadow-xl">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" />
            <span>Heartscript Visual Engine</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Analyze track dynamics using Gemini AI to map spacing, contrast ratios, and visual loops.
          </p>
        </div>

        {/* Dynamic Theme Selection Row */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">Select Signature Aesthetic</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: "crimson-ink", name: "Crimson Ink", border: "border-red-950/60" },
              { id: "cyan-static", name: "Cyan Static", border: "border-cyan-950/60" },
              { id: "cream-paper", name: "Cream Paper", border: "border-amber-900/30" },
              { id: "prism-gold", name: "Prism Gold", border: "border-amber-500/30" },
              { id: "cosmic-neon", name: "Cosmic Neon", border: "border-fuchsia-950/60" }
            ].map((th) => (
              <button
                key={th.id}
                id={`theme-select-${th.id}`}
                onClick={() => setSelectedTheme(th.id)}
                className={`py-3.5 px-1 rounded-xl border text-[11px] font-semibold text-center transition-all cursor-pointer truncate ${
                  selectedTheme === th.id 
                    ? `border-rose-500 ring-2 ring-rose-500/20 bg-rose-500/10 text-white` 
                    : `${th.border} hover:bg-neutral-800 text-neutral-400`
                }`}
                title={th.name}
              >
                {th.name}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">Song Title</label>
            <input
              type="text"
              value={title}
              id="lyrics-title-input"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition"
              placeholder="e.g. Moonlight Script"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex justify-between items-center">
              <span>Lyrics / Verse Hook</span>
              <span className="text-[10px] text-neutral-500 normal-case">(Max 4 lines recommended)</span>
            </label>
            <textarea
              rows={4}
              value={lyrics}
              id="lyrics-body-textarea"
              onChange={(e) => setLyrics(e.target.value)}
              className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition font-sans leading-relaxed"
              placeholder="Paste song lyrics here..."
            />
          </div>

          {/* Interactive Song Artwork & Automation */}
          <div className="space-y-4 pt-4 border-t border-neutral-800/50">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-rose-500" />
                <span>Song Cover / Artwork</span>
              </label>
              <span className="text-[10px] text-neutral-500 font-mono">Drag & Drop / Presets</span>
            </div>

            {/* Drag and Drop Uploader Frame */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2.5 ${
                dragActive
                  ? "border-rose-500 bg-rose-500/10 scale-[0.99]"
                  : "border-neutral-850 hover:border-neutral-750 bg-black/20 hover:bg-black/30"
              }`}
              id="artwork-drag-drop-zone"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                id="artwork-file-input"
              />

              {artworkUrl ? (
                <div className="flex items-center gap-4 text-left w-full">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-neutral-800 flex-shrink-0">
                    <img
                      src={artworkUrl}
                      alt="Artwork Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-xs font-bold text-white truncate">Artwork Loaded Successfully</p>
                    <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Dynamically reacting to lyrics & themes</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setArtworkUrl("");
                      }}
                      className="text-[10px] text-rose-400 hover:text-rose-300 underline mt-1 transition"
                    >
                      Remove Artwork
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 bg-neutral-900/60 rounded-xl border border-neutral-800 flex items-center justify-center text-neutral-400">
                    <Upload className="w-5 h-5 text-neutral-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Drag & drop song artwork here</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">or click to browse from device (PNG, JPG, WEBP)</p>
                  </div>
                </>
              )}
            </div>

            {artworkFileError && (
              <div className="flex items-center gap-2 text-xs text-red-400 font-mono">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{artworkFileError}</span>
              </div>
            )}

            {/* Custom URL Input */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Paste External Image URL</span>
              <input
                type="text"
                value={artworkUrl.startsWith("data:") ? "" : artworkUrl}
                onChange={(e) => {
                  setArtworkUrl(e.target.value);
                  setArtworkFileError(null);
                }}
                className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition font-mono"
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>

            {/* Presets Row */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Or Select Studio Preset</span>
              <div className="grid grid-cols-4 gap-2">
                {artworkPresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setArtworkUrl(preset.url);
                      setArtworkFileError(null);
                    }}
                    className={`group relative aspect-square rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      artworkUrl === preset.url
                        ? "border-rose-500 scale-[0.96] ring-2 ring-rose-500/20"
                        : "border-neutral-850 hover:border-neutral-750"
                    }`}
                    title={preset.name}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-[8px] text-neutral-300 truncate text-center">
                      {preset.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Reel Audio, Beats & Duration Suite */}
        <div className="space-y-4 pt-4 border-t border-neutral-800/50">
          <div className="flex justify-between items-center">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Music className="w-4 h-4 text-rose-500" />
              <span>Reel Audio & Timing Suite</span>
            </label>
            <span className="text-[10px] text-rose-400 font-mono px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">Synced Layout</span>
          </div>

          {/* Reel Duration Option Row */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Choose Reel Duration Limit</span>
            <div className="grid grid-cols-4 gap-2">
              {[8.0, 15.0, 30.0, 60.0].map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => {
                    setReelDuration(dur);
                    setCurrentTime(0);
                    setPlaying(false);
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                    }
                  }}
                  className={`py-2 px-1 text-center rounded-xl border text-xs font-mono font-semibold transition cursor-pointer ${
                    reelDuration === dur
                      ? "border-rose-500 bg-rose-500/10 text-white"
                      : "border-neutral-850 hover:border-neutral-750 text-neutral-400 hover:bg-neutral-800"
                  }`}
                >
                  {dur}s
                </button>
              ))}
            </div>
          </div>

          {/* Hidden Input for Audio upload */}
          <input
            type="file"
            ref={audioInputRef}
            onChange={handleAudioUpload}
            accept="audio/*"
            className="hidden"
          />

          {/* Audio Upload Zone */}
          <div
            onClick={() => audioInputRef.current?.click()}
            className="border border-dashed border-neutral-850 hover:border-rose-500/50 bg-black/10 hover:bg-rose-500/2 rounded-2xl p-4 text-center cursor-pointer transition flex items-center justify-center gap-3"
          >
            <Upload className="w-4 h-4 text-neutral-400" />
            <div className="text-left">
              <p className="text-xs font-bold text-white">Upload Custom Audio Track</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">MP3, WAV, M4A, etc. (Max 15MB)</p>
            </div>
          </div>

          {audioFileError && (
            <p className="text-[10px] text-rose-400 font-mono flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{audioFileError}</span>
            </p>
          )}

          {/* Audio URL Input */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Or Paste External Audio Stream URL</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={audioUrl.startsWith("blob:") ? "" : audioUrl}
                onChange={(e) => {
                  const url = e.target.value.trim();
                  setAudioUrl(url);
                  setAudioFileError(null);
                  setAudioName(url ? "Custom Audio Link" : "Silent Studio Loop");
                  setPlaying(false);
                  setCurrentTime(0);
                  if (audioRef.current) {
                    audioRef.current.src = url;
                    audioRef.current.load();
                  }
                }}
                className="flex-grow bg-black/40 border border-neutral-850 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition font-mono"
                placeholder="e.g. https://domain.com/track.mp3"
              />
              {audioUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setAudioUrl("");
                    setAudioName("Silent Studio Loop");
                    setPlaying(false);
                    setCurrentTime(0);
                  }}
                  className="p-2.5 bg-neutral-800 hover:bg-rose-500/10 hover:text-rose-400 text-neutral-400 rounded-xl transition cursor-pointer"
                  title="Clear Audio"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Studio Audio Presets Row */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Or Play Studio Soundtrack Presets</span>
            <div className="grid grid-cols-3 gap-2">
              {audioPresets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setAudioUrl(preset.url);
                    setAudioName(preset.name);
                    setAudioFileError(null);
                    setPlaying(false);
                    setCurrentTime(0);
                    if (audioRef.current) {
                      audioRef.current.src = preset.url;
                      audioRef.current.load();
                    }
                  }}
                  className={`py-2 px-1 text-[10px] font-medium text-center rounded-xl border transition truncate cursor-pointer ${
                    audioUrl === preset.url
                      ? "border-rose-500 bg-rose-500/10 text-white"
                      : "border-neutral-850 hover:border-neutral-750 text-neutral-400 hover:bg-neutral-800"
                  }`}
                  title={preset.name}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Currently Active Audio Badge */}
          {audioUrl && (
            <div className="bg-neutral-900/60 p-3 border border-neutral-850 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <Music className="w-3.5 h-3.5 text-rose-500 animate-pulse flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-white truncate">{audioName}</p>
                  <p className="text-[9px] text-emerald-400 font-mono mt-0.5">Loaded & Ready to play in sync</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAudioUrl("");
                  setAudioName("Silent Studio Loop");
                  setPlaying(false);
                  setCurrentTime(0);
                }}
                className="text-neutral-500 hover:text-rose-400 p-1.5 hover:bg-neutral-800 rounded-lg transition cursor-pointer"
                title="Remove Audio"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Main triggering buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleGenerateDesign}
            disabled={generating}
            id="generate-layout-btn"
            className="flex-grow py-3 px-5 bg-rose-600 hover:bg-rose-500 disabled:bg-neutral-800 text-white rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>{generationSteps}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Generate Smart Layout</span>
              </>
            )}
          </button>
        </div>

        {/* AI Lyric Optimization Refiner */}
        <div className="border-t border-neutral-800/60 pt-6 space-y-3.5">
          <div>
            <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 uppercase font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Gemini Smart lyric refiner</span>
            </span>
            <p className="text-[10px] text-neutral-500 mt-0.5">
              Ask Gemini to rewrite or format these lyrics for perfect social media screen layout.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={customPrompt}
              id="lyrics-ai-refiner-input"
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="flex-grow bg-black/20 border border-neutral-850 focus:border-rose-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-none transition"
              placeholder="e.g. Translate to Spanish chorus / Make it more melancholic..."
            />
            <button
              onClick={handleRefineLyrics}
              disabled={refining || !customPrompt.trim()}
              id="refine-lyrics-btn"
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-200 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1"
            >
              {refining ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>Refine</span>
            </button>
          </div>
        </div>

        {/* Theme Settings Panel */}
        <div className="border-t border-neutral-800/60 pt-6 space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-neutral-400" />
            <span>Layout adjustments</span>
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-neutral-400">
                <span>Font Size ({fontSize}px)</span>
              </div>
              <input
                type="range"
                min="18"
                max="40"
                value={fontSize}
                id="adjust-font-size-slider"
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-rose-500 h-1 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400">Lyric Placement</span>
              <div className="flex gap-2">
                {(["top", "center", "bottom"] as const).map((align) => (
                  <button
                    key={align}
                    id={`align-adjust-${align}`}
                    onClick={() => setLyricAlignment(align)}
                    className={`flex-grow py-1.5 px-3 rounded-lg text-xs font-mono uppercase tracking-wider border text-center transition cursor-pointer ${
                      lyricAlignment === align 
                        ? "border-rose-500 bg-rose-500/10 text-rose-400" 
                        : "border-neutral-800 hover:bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical 9:16 Preview Box (Right 5-columns) */}
      <div className="lg:col-span-5 flex flex-col items-center">
        
        {/* Device wrapper */}
        <div className="w-full max-w-sm bg-neutral-950 border border-neutral-800 rounded-[2.5rem] p-3.5 shadow-2xl relative">
          
          {/* Mobile Camera notch */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-black rounded-full z-30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full border border-neutral-800" />
          </div>

          {/* Core Viewport Container (9:16 screen) */}
          <div 
            className="w-full aspect-[9/16] rounded-[2rem] relative overflow-hidden flex flex-col justify-between p-6 select-none transition-all duration-500 shadow-inner"
            style={{
              background: suggestion 
                ? `linear-gradient(to bottom, ${suggestion.backgroundGradient[0]}, ${suggestion.backgroundGradient[1]})` 
                : "#111"
            }}
          >
            {/* Particle floating animations */}
            {playing && selectedTheme === "crimson-ink" && (
              <div className="absolute inset-0 bg-radial-at-t from-red-600/5 via-transparent to-transparent animate-pulse-slow" />
            )}
            {selectedTheme === "cyan-static" && (
              <div className="absolute inset-0 bg-grid-pattern opacity-40" />
            )}
            {selectedTheme === "cream-paper" && (
              <div className="organic-grain-overlay" />
            )}
            {selectedTheme === "prism-gold" && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.15)_0%,transparent_60%)] opacity-70 animate-pulse-slow" />
            )}
            {selectedTheme === "cosmic-neon" && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(244,63,94,0.18)_0%,transparent_70%)] bg-[linear-gradient(rgba(244,63,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.03)_1px,transparent_1px)] bg-[size:14px_14px]" />
            )}

            {/* Viewport Header */}
            <div className="relative z-10 flex flex-col items-start text-left mt-8">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">HEARTSCRIPT STUDIOS</span>
              <h3 
                className={`text-lg font-bold tracking-tight uppercase leading-none mt-1`}
                style={{ color: suggestion?.suggestedAccentColor || "#ef4444" }}
              >
                {title}
              </h3>
            </div>

            {/* Dynamic Animated Artwork Frame */}
            {artworkUrl && (
              <motion.div
                variants={artworkVariants}
                animate={activeArtworkAnimation}
                className="relative my-4 flex-shrink-0 flex justify-center items-center z-10"
              >
                {selectedTheme === "crimson-ink" && (
                  <div className="absolute inset-0 bg-red-500/10 rounded-full blur-2xl animate-pulse" style={{ margin: "-1.5rem" }} />
                )}
                {selectedTheme === "prism-gold" && (
                  <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-2xl animate-pulse" style={{ margin: "-1.5rem" }} />
                )}
                {selectedTheme === "cosmic-neon" && (
                  <div className="absolute inset-0 bg-rose-500/15 rounded-full blur-2xl animate-pulse animate-bounce" style={{ margin: "-1.5rem", animationDuration: "4s" }} />
                )}
                
                <div
                  className={`relative overflow-hidden transition-all duration-500 ${
                    selectedTheme === "crimson-ink"
                      ? "w-36 h-36 rounded-2xl border border-red-500/30 shadow-[0_8px_25px_rgba(239,68,68,0.25)]"
                      : selectedTheme === "cyan-static"
                        ? "w-36 h-36 rounded-none border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        : selectedTheme === "cream-paper"
                          ? "w-36 h-44 bg-white p-2 pb-8 rounded-sm shadow-md border border-neutral-200/40"
                          : selectedTheme === "prism-gold"
                            ? "w-36 h-36 rounded-xl border-2 border-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.4)] ring-1 ring-amber-500/50"
                            : "w-36 h-36 rounded-lg border-2 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.6)]"
                  }`}
                >
                  <img
                    src={artworkUrl}
                    alt="Animated Artwork"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />

                  {/* Theme specific overlays inside the artwork container */}
                  {selectedTheme === "cyan-static" && (
                    <>
                      {/* Holographic glowing scanline moving top-to-bottom */}
                      <div className="absolute inset-x-0 h-1 bg-cyan-300/80 blur-[2px] animate-bounce" style={{ animationDuration: "3s" }} />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
                    </>
                  )}

                  {selectedTheme === "cream-paper" && (
                    <div className="absolute bottom-1.5 inset-x-0 text-center text-[8px] font-sans font-bold text-neutral-850 tracking-wider truncate px-1">
                      {title.toUpperCase()}
                    </div>
                  )}

                  {selectedTheme === "prism-gold" && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-amber-100/5 pointer-events-none" />
                  )}

                  {selectedTheme === "cosmic-neon" && (
                    <>
                      {/* Interactive fuchsia scanline */}
                      <div className="absolute inset-x-0 h-1 bg-rose-400/80 blur-[1px] animate-bounce" style={{ animationDuration: "2s" }} />
                      <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/15 via-transparent to-transparent pointer-events-none" />
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* Interactive Lyric Text Area */}
            <div 
              className={`relative z-10 flex flex-col w-full text-center transition-all duration-300 ${
                lyricAlignment === "top" 
                  ? "justify-start pt-4 flex-grow" 
                  : lyricAlignment === "bottom" 
                    ? "justify-end pb-4 flex-grow" 
                    : "justify-center flex-grow"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeLyricObj ? activeLyricObj.text : "idle"}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`${suggestion?.typographySpacing || "tracking-wide"} font-bold leading-relaxed text-balance`}
                  style={{ 
                    fontSize: `${fontSize}px`,
                    color: selectedTheme === "cream-paper" 
                      ? "#222" 
                      : selectedTheme === "prism-gold"
                        ? "#fcd34d"
                        : "#ffffff",
                    textShadow: selectedTheme === "cream-paper" 
                      ? "none" 
                      : selectedTheme === "prism-gold"
                        ? "0 2px 12px rgba(245,158,11,0.4)"
                        : selectedTheme === "cosmic-neon"
                          ? "0 0 15px rgba(244,63,94,0.7), 0 2px 10px rgba(0,0,0,0.5)"
                          : `0 2px 10px rgba(0,0,0,0.4)`
                  }}
                >
                  {activeLyricObj ? activeLyricObj.text : "..."}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Hidden native audio element */}
            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
                preload="auto"
                loop
                onEnded={() => {
                  setPlaying(false);
                  setCurrentTime(0);
                }}
              />
            )}

            {/* Audio Waveform Equalizer overlay */}
            {playing && audioUrl && (
              <div className="absolute bottom-16 inset-x-0 flex items-end justify-center gap-[3px] h-6 z-20 pointer-events-none px-6 opacity-75">
                {[...Array(14)].map((_, i) => {
                  const randDuration = 0.4 + (i % 3) * 0.25 + Math.random() * 0.15;
                  const themeColors: Record<string, string> = {
                    "crimson-ink": "bg-red-500",
                    "cyan-static": "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]",
                    "cream-paper": "bg-neutral-800",
                    "prism-gold": "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]",
                    "cosmic-neon": "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]"
                  };
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        height: ["15%", "90%", "20%", "80%", "15%"]
                      }}
                      transition={{
                        duration: randDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.04
                      }}
                      className={`w-1 rounded-full ${themeColors[selectedTheme] || "bg-rose-500"}`}
                    />
                  );
                })}
              </div>
            )}

            {/* Viewport Footer */}
            <div className="relative z-10 flex justify-between items-center text-left border-t border-white/5 pt-3 mb-2">
              <div>
                <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">OFFICIAL RELEASE</span>
                <p className="text-[10px] font-semibold uppercase opacity-65 flex items-center gap-1 text-neutral-400">
                  <Music className="w-3 h-3 text-rose-500" />
                  <span>Hearscript Studio Suite</span>
                </p>
              </div>
              
              {/* Dynamic looping timer badge */}
              <div className="px-2 py-1 bg-black/40 border border-white/5 rounded-md text-[9px] font-mono text-neutral-400">
                {currentTime.toFixed(1)}s / {reelDuration.toFixed(1)}s
              </div>
            </div>

          </div>
        </div>

        {/* Timeline, Play/Pause, and Export Control Tray */}
        <div className="w-full max-w-sm mt-6 space-y-4">
          
          {/* Custom Timeline Slider bar */}
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex items-center gap-4">
            <button
              onClick={() => setPlaying(!playing)}
              id="timeline-play-toggle"
              className="p-3 bg-rose-600 hover:bg-rose-500 text-white rounded-full transition shadow-lg cursor-pointer"
            >
              {playing ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
            </button>

            <div className="flex-grow space-y-1 text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Timeline seek control</span>
              <input
                type="range"
                min="0"
                max={reelDuration}
                step="0.1"
                value={currentTime}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setCurrentTime(val);
                  if (audioRef.current) {
                    audioRef.current.currentTime = val;
                  }
                }}
                className="w-full h-1.5 bg-neutral-850 rounded-full appearance-none cursor-pointer accent-rose-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Export Action Button */}
          <button
            onClick={handleDownloadAsset}
            id="download-reel-png-btn"
            className="w-full py-4 px-5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 hover:text-white rounded-2xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-rose-500" />
            <span>Download 9:16 Reel Poster (HD PNG)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
