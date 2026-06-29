// server/api/podcasts/[id].get.ts
import type { PodcastDetail } from "~~/shared/types/podcast";

interface ItunesPodcastResult {
  wrapperType: "track";
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl600: string;
  primaryGenreName: string;
}

interface ItunesEpisodeResult {
  wrapperType: "podcastEpisode";
  trackId: number;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
  shortDescription: string;
  episodeUrl: string;
}

interface ItunesLookupResponse {
  resultCount: number;
  results: [ItunesPodcastResult, ...ItunesEpisodeResult[]]; // first element is the podcast, the rest are episodes
}

export default defineEventHandler(async (event): Promise<PodcastDetail> => {
  const id = getRouterParam(event, "id")

  // Manual Validatation – more apropiate for an unique simple parameter
  if (!id || !/^\d+$/.test(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid podcast ID. Must be a number',
    });
  }


  const raw = await $fetch<string>(`https://itunes.apple.com/lookup`, {
    query: {
      id,
      media: "podcast",
      entity: "podcastEpisode",
      limit: 10,
    },
  });

  const response = JSON.parse(raw) as ItunesLookupResponse;

  // iTunes returns empty results if ID doesn't exists
  if (!response.results || response.results.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: `Podcast with id ${id} not found`,
    });
  }

  const [podcast, ...episodes] = response.results;

  return {
    id: String(podcast.collectionId),
    title: podcast.collectionName,
    author: podcast.artistName,
    image: podcast.artworkUrl600,
    genre: podcast.primaryGenreName,
    episodeCount: 0,
    episodes: episodes.map((ep) => ({
      id: String(ep.trackId),
      title: ep.trackName,
      date: ep.releaseDate,
      durationMs: ep.trackTimeMillis,
      description: ep.shortDescription,
      url: ep.episodeUrl,
    })),
  };
});
