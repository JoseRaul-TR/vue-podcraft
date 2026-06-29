// shared/types/podcast.ts
export interface Podcast {
  id: string;
  title: string;
  displayTitle?: string;
  author: string;
  image: string;
  genre: string;
  episodeCount: number;
}

export interface Episode {
  id: string;
  title: string;
  date: string;
  durationMs: number;
  description: string;
  url: string;
}

export interface PodcastDetail extends Podcast {
  episodes: Episode[];
}
