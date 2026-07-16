import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const DB_PATH = path.join(process.cwd(), "data", "db.json");

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DB_PATH))) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

// Initial/default database structure
const DEFAULT_DB = {
  heartlinks: [
    {
      slug: "moonlight-script",
      title: "Moonlight Script",
      artist: "Heartscript Studios",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
      theme: "crimson-ink",
      description: "Official release. Chill, reflective Lofi with organic strings and gentle keys.",
      links: {
        spotify: "https://open.spotify.com/track/4PTG3Z6ehGkBF36qI6E67g",
        youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        appleMusic: "https://music.apple.com/us/album/never-gonna-give-you-up/1440797258",
        soundcloud: "https://soundcloud.com",
        instagram: "https://instagram.com/heartscriptstudios"
      },
      views: 342,
      clicks: {
        spotify: 184,
        youtube: 89,
        appleMusic: 42,
        soundcloud: 12,
        instagram: 15
      },
      createdAt: new Date().toISOString()
    }
  ],
  passes: [
    {
      id: "tx_mock_1",
      name: "Alex Mercer",
      email: "alex@mercerbeats.com",
      artistName: "Mercer Beats",
      tier: "pro",
      price: 199,
      status: "success",
      createdAt: new Date().toISOString(),
      activationKey: "PASS-PRO-AM82F4"
    }
  ],
  comments: [
    {
      id: "comment_1",
      trackId: "track_1",
      author: "VibeSeeker",
      email: "vibes@lofi.com",
      content: "This track got me through my late-night coding session. That vinyl crackle in the background is incredibly soothing!",
      rating: 5,
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: "comment_2",
      trackId: "track_2",
      author: "NeonDrifter",
      email: "synth@retro.com",
      content: "Pure synthwave bliss. Perfect driving tempo. Can't wait to generate a Cyan Static reel layout for this!",
      rating: 5,
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
    }
  ]
};

// Database read/write helpers
function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DB, null, 2));
      return DEFAULT_DB;
    }
    const data = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return DEFAULT_DB;
  }
}

function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing database:", error);
  }
}

// Middleware
app.use(express.json());

// API: Check server health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// API: Comments routes
app.get("/api/comments", (req, res) => {
  const db = readDB();
  const { trackId } = req.query;
  if (trackId) {
    const trackComments = db.comments.filter((c: any) => c.trackId === trackId);
    return res.json(trackComments);
  }
  res.json(db.comments);
});

app.post("/api/comments", (req, res) => {
  const db = readDB();
  const { trackId, author, email, content, rating } = req.body;
  
  if (!trackId || !author || !content || !rating) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newComment = {
    id: `comment_${Date.now()}`,
    trackId,
    author,
    email: email || "",
    content,
    rating: Number(rating),
    createdAt: new Date().toISOString()
  };

  db.comments.unshift(newComment);
  writeDB(db);
  res.status(201).json(newComment);
});

// API: HeartLinks routes
app.get("/api/heartlinks", (req, res) => {
  const db = readDB();
  res.json(db.heartlinks);
});

app.get("/api/heartlinks/:slug", (req, res) => {
  const db = readDB();
  const link = db.heartlinks.find((l: any) => l.slug.toLowerCase() === req.params.slug.toLowerCase());
  if (!link) {
    return res.status(404).json({ error: "HeartLink not found" });
  }
  
  // Track visual count
  link.views = (link.views || 0) + 1;
  writeDB(db);
  
  res.json(link);
});

app.post("/api/heartlinks", (req, res) => {
  const db = readDB();
  const { slug, title, artist, imageUrl, theme, description, links } = req.body;

  if (!slug || !title || !artist) {
    return res.status(400).json({ error: "Missing required fields (slug, title, artist)" });
  }

  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, "");
  
  // Check if slug exists (and it's not a collision edit)
  const existingIndex = db.heartlinks.findIndex((l: any) => l.slug === cleanSlug);
  
  const heartLinkObj = {
    slug: cleanSlug,
    title,
    artist,
    imageUrl: imageUrl || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
    theme: theme || "crimson-ink",
    description: description || "",
    links: links || {},
    views: existingIndex >= 0 ? db.heartlinks[existingIndex].views : 0,
    clicks: existingIndex >= 0 ? db.heartlinks[existingIndex].clicks : {
      spotify: 0,
      youtube: 0,
      appleMusic: 0,
      soundcloud: 0,
      bandcamp: 0,
      instagram: 0,
      customName: 0
    },
    createdAt: existingIndex >= 0 ? db.heartlinks[existingIndex].createdAt : new Date().toISOString()
  };

  if (existingIndex >= 0) {
    db.heartlinks[existingIndex] = heartLinkObj;
  } else {
    db.heartlinks.unshift(heartLinkObj);
  }

  writeDB(db);
  res.json(heartLinkObj);
});

// API: Record quick-tap click on shareable page
app.post("/api/heartlinks/click/:slug/:platform", (req, res) => {
  const db = readDB();
  const { slug, platform } = req.params;
  const link = db.heartlinks.find((l: any) => l.slug.toLowerCase() === slug.toLowerCase());
  
  if (link) {
    if (!link.clicks) link.clicks = {};
    link.clicks[platform] = (link.clicks[platform] || 0) + 1;
    writeDB(db);
    return res.json({ success: true, clicks: link.clicks });
  }
  res.status(404).json({ error: "HeartLink not found" });
});

// API: Link Scraper
app.post("/api/heartlinks/scrape", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const lowerUrl = url.toLowerCase();
    
    // Spotify scraper
    if (lowerUrl.includes("spotify.com")) {
      const oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
      const response = await fetch(oembedUrl);
      if (response.ok) {
        const metadata = await response.json();
        return res.json({
          title: metadata.title || "",
          artist: metadata.thumbnail_url ? "Spotify Track" : metadata.provider_name,
          imageUrl: metadata.thumbnail_url || "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=500&auto=format&fit=crop&q=80",
          platform: "spotify",
          originalUrl: url
        });
      }
    }

    // YouTube scraper
    if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
      const response = await fetch(oembedUrl);
      if (response.ok) {
        const metadata = await response.json();
        return res.json({
          title: metadata.title || "",
          artist: metadata.author_name || "YouTube Creator",
          imageUrl: metadata.thumbnail_url || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=80",
          platform: "youtube",
          originalUrl: url
        });
      }
    }

    // Apple Music & general OpenGraph meta tags fallback scraper
    // We make a safe fetch call with a typical User-Agent to avoid blocks
    const pageResponse = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36"
      }
    });

    if (pageResponse.ok) {
      const html = await pageResponse.text();
      
      // Basic og tag parsing with regex
      const titleMatch = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i) || 
                         html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:title"/i) ||
                         html.match(/<title>([^<]+)<\/title>/i);
                         
      const imageMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i) ||
                         html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i);
                         
      const descMatch = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i) ||
                        html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:description"/i);

      let title = titleMatch ? titleMatch[1] : "";
      let imageUrl = imageMatch ? imageMatch[1] : "";
      let description = descMatch ? descMatch[1] : "";

      // Clean up entities
      title = title.replace(/&amp;/g, "&").replace(/&quot;/g, '"');
      description = description.replace(/&amp;/g, "&").replace(/&quot;/g, '"');

      let artist = "Various Artists";
      if (lowerUrl.includes("apple.com")) {
        // Apple Music specific cleanups: "Song Title by Artist Name on Apple Music"
        const appleMatch = title.match(/(.+) by (.+)/);
        if (appleMatch) {
          title = appleMatch[1];
          artist = appleMatch[2];
        } else {
          artist = "Apple Music Track";
        }
      }

      return res.json({
        title: title || "Scraped Track",
        artist: artist || "Independent Artist",
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
        description: description,
        platform: lowerUrl.includes("apple.com") ? "appleMusic" : "other",
        originalUrl: url
      });
    }

    // Fallback if scraping completely fails
    return res.json({
      title: "Custom Share Link",
      artist: "Independent Creator",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
      platform: "custom",
      originalUrl: url
    });

  } catch (error) {
    console.error("Scraper failed:", error);
    res.json({
      title: "Shared Audio Resource",
      artist: "Independent Artist",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
      platform: "unknown",
      originalUrl: url
    });
  }
});

// API: Creator Passes checkout registration
app.post("/api/passes/buy", (req, res) => {
  const db = readDB();
  const { name, email, artistName, tier, price } = req.body;

  if (!name || !email || !artistName || !tier) {
    return res.status(400).json({ error: "Missing purchase details" });
  }

  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  const activationKey = `PASS-${tier.toUpperCase()}-${randomSuffix}`;

  const newPass = {
    id: `tx_${Date.now()}`,
    name,
    email,
    artistName,
    tier,
    price: Number(price),
    status: "success",
    createdAt: new Date().toISOString(),
    activationKey
  };

  db.passes.push(newPass);
  writeDB(db);

  res.json({
    success: true,
    pass: newPass
  });
});

app.get("/api/passes", (req, res) => {
  const db = readDB();
  res.json(db.passes);
});

// Lazy-initialization client utility for Gemini API
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is not defined or is placeholder. Gemini logic will be simulated.");
    return null;
  }
  
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API: Visual Engine suggestion generated by Gemini
app.post("/api/visual-engine/suggest", async (req, res) => {
  const { title, lyrics, theme, duration = 8 } = req.body;
  if (!title || !lyrics) {
    return res.status(400).json({ error: "Title and lyrics are required" });
  }

  const ai = getAiClient();

  if (!ai) {
    // Elegant fallback simulation if API key is missing, so the app remains 100% usable!
    console.log(`Simulating Gemini dynamic visual styling for ${duration}s...`);
    const themeAccents: Record<string, string> = {
      "crimson-ink": "#ef4444",
      "cyan-static": "#06b6d4",
      "cream-paper": "#d97706",
      "prism-gold": "#fbbf24",
      "cosmic-neon": "#f43f5e"
    };
    
    const lines = lyrics.split("\n").filter((l: string) => l.trim().length > 0).slice(0, 6);
    const lineCount = lines.length || 1;
    const timePerLine = duration / lineCount;
    const mockTiming = lines.map((line: string, i: number) => ({
      start: Number((i * timePerLine).toFixed(1)),
      end: Number(((i + 1) * timePerLine).toFixed(1)),
      text: line.trim()
    }));

    let mockGrad = ["#1a0505", "#0a0202"];
    if (theme === "cyan-static") mockGrad = ["#05151a", "#010608"];
    else if (theme === "cream-paper") mockGrad = ["#fcfbf7", "#f3ebd8"];
    else if (theme === "prism-gold") mockGrad = ["#1a140a", "#080603"];
    else if (theme === "cosmic-neon") mockGrad = ["#180424", "#06010a"];

    return res.json({
      lyricsTiming: mockTiming,
      backgroundGradient: mockGrad,
      suggestedAccentColor: themeAccents[theme] || "#a855f7",
      visualVibeDescription: `Synthesized layout for '${title}' using the '${theme}' signature palette. Standardizing typography tracking and kinetic rhythm offsets.`,
      typographySpacing: theme === "prism-gold" ? "tracking-widest uppercase font-serif" : "tracking-wider leading-relaxed",
      motionSpeed: "slow-pulse"
    });
  }

  try {
    const themeInstruction = `
      Theme is "${theme}".
      - "crimson-ink" is a moody, dark editorial theme with charcoal background, blood red/crimson accents, elegant bold serif or gothic-tinged sans-serif typography.
      - "cyan-static" is a tech-forward cybernetic style with obsidian background, electric cyan/teal neon accents, retro-terminal font settings, and subtle grid lines.
      - "cream-paper" is a minimalist vintage tactile look, textured warm paper backgrounds, black ink typography, elegant classic serif headings, and sepia accents.
      - "prism-gold" is an ultra-premium golden/luxury promo theme with soft glowing amber and gold border contours, sophisticated luxury serif title sizing, and deep warm golden reflections.
      - "cosmic-neon" is an electric, high-vibe synthwave/cyberpunk aesthetic with intense fuchsia/magenta neon glow highlights, starry starry starry backdrop mesh, and fast tracking glitch transitions.
    `;

    const prompt = `
      You are an elite creative director for Heartscript Studios. An artist has submitted a track titled "${title}".
      Lyrics:
      ${lyrics}

      Generate visual design parameters and a synchronized lyrics layout for a ${duration}-second 9:16 social media reel.
      ${themeInstruction}

      Split the lyrics into at most 6 logical timeline segments fitting within a ${duration}-second window (each segment's start and end must fall within 0 and ${duration} seconds, e.g. start: 0, end: ${duration/4}, etc.). Spacing must be proportional to cover the entire duration of the video.
      Ensure you output valid JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["lyricsTiming", "backgroundGradient", "suggestedAccentColor", "visualVibeDescription", "typographySpacing", "motionSpeed"],
          properties: {
            lyricsTiming: {
              type: Type.ARRAY,
              description: "Lyrics divided into timing segments (start and end in seconds, max 8s total)",
              items: {
                type: Type.OBJECT,
                required: ["start", "end", "text"],
                properties: {
                  start: { type: Type.INTEGER },
                  end: { type: Type.INTEGER },
                  text: { type: Type.STRING }
                }
              }
            },
            backgroundGradient: {
              type: Type.ARRAY,
              description: "Array of 2 CSS hex colors representing background gradient stops",
              items: { type: Type.STRING }
            },
            suggestedAccentColor: {
              type: Type.STRING,
              description: "CSS hex color code for dynamic highlights matching the theme"
            },
            visualVibeDescription: {
              type: Type.STRING,
              description: "A short, evocative description of the design and mood concept (1-2 sentences)"
            },
            typographySpacing: {
              type: Type.STRING,
              description: "Tailwind font utility classes for tracking, leading, and casing (e.g. tracking-widest uppercase leading-loose)"
            },
            motionSpeed: {
              type: Type.STRING,
              description: "The speed setting for the backdrop pulse (e.g., 'pulse-fast', 'pulse-slow', 'pulse-normal')"
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);

  } catch (error) {
    console.error("Gemini suggestion API failed:", error);
    res.status(500).json({ error: "Failed to connect to visual suggestion services" });
  }
});


// Boot up Express server with Vite integration
async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA Wildcard Route
    app.get("*", (req, res, next) => {
      // Allow API routes to slide by
      if (req.path.startsWith("/api/")) {
        return next();
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Heartscript Studios server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
