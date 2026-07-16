export interface VisualTheme {
  id: string;
  name: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
  fontFamily: string;
  backdropEffect: 'none' | 'gradient-pulse' | 'static-grid' | 'crimson-bleed' | 'cyan-glow' | 'organic-grain';
  timingAnimation: string;
}

export interface LyricTiming {
  start: number;
  end: number;
  text: string;
}

export interface VisualDesignSuggestion {
  lyricsTiming: LyricTiming[];
  backgroundGradient: string[];
  suggestedAccentColor: string;
  visualVibeDescription: string;
  typographySpacing: string;
  motionSpeed: string;
}

export interface LinkData {
  spotify?: string;
  youtube?: string;
  appleMusic?: string;
  soundcloud?: string;
  bandcamp?: string;
  instagram?: string;
  customName?: string;
  customUrl?: string;
  customPlatforms?: {
    id: string;
    name: string;
    url: string;
    logoUrl?: string;
  }[];
}

export interface HeartLink {
  slug: string;
  title: string;
  artist: string;
  imageUrl: string;
  theme: string;
  description?: string;
  links: LinkData;
  views: number;
  clicks: Record<string, number>;
  createdAt: string;
}

export interface CreatorPass {
  id: string;
  name: string;
  email: string;
  artistName: string;
  tier: 'basic' | 'pro' | 'ultimate';
  price: number;
  status: 'pending' | 'success';
  createdAt: string;
  activationKey: string;
}

export interface TrackComment {
  id: string;
  trackId: string;
  author: string;
  email: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface Track {
  id: string;
  title: string;
  releaseDate: string;
  coverUrl: string;
  audioUrl: string;
  duration: string;
  genre: string;
  lyrics: string;
  description: string;
}
