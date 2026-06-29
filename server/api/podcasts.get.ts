// server/api/podcasts.get.ts
import * as z from "zod/mini";
import type { Podcast } from "~~/shared/types/podcast";

interface ItunesPodcast {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl600: string;
  primaryGenreName: string;
  trackCount: number;
}

interface ItunesSearchResponse {
  resultCount: number;
  results: ItunesPodcast[];
}

// Schema to describes the expected query params
const QuerySchema = z.object({
  term: z.optional(z.string()),
  limit: z.optional(z.string()),
});

export default defineEventHandler(async (event): Promise<Podcast[]> => {
  const result = z.safeParse(QuerySchema, getQuery(event));

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0]?.message ?? "Invalid query",
    });
  }

  const term = (result.data.term ?? "technology").trim();
  const limit = Number(result.data.limit ?? 20);

  const raw = await $fetch<string>(`https://itunes.apple.com/search`, {
    query: {
      term,
      media: "podcast",
      limit,
    },
  });

  const response = JSON.parse(raw) as ItunesSearchResponse;

  if (!response.results || response.resultCount === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: `No podcast found for term: ${term}`,
    });
  }

  // Normalize the response – return just what is needed
  return response.results.map((podcast) => ({
    id: String(podcast.collectionId),
    title: podcast.collectionName,
    author: podcast.artistName,
    image: podcast.artworkUrl600,
    genre: podcast.primaryGenreName,
    episodeCount: podcast.trackCount,
  }));
});
