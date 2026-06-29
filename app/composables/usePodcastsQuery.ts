// app/composables/usePodcastsQuery.ts
import { useQuery } from "@tanstack/vue-query";
import type { Podcast } from "~~/shared/types/podcast";

export function usePodcastsQuery(term: Ref<string>) {
  return useQuery({
    queryKey: ["podcasts", term], // It executes when term changes
    queryFn: () => $fetch<Podcast[]>(`/api/podcasts?term=${term.value}`),
    staleTime: 1000 * 60 * 2, // It keeps previous data while load new one
    placeholderData: (prev) => prev, // Equivalent to keepPreviousData en v4
  });
}

export function usePodcastDetailQuery(id: Ref<string>) {
  return useQuery({
    queryKey: ["podcast", id],
    queryFn: () => $fetch(`/api/podcasts/${id.value}`),
    staleTime: 1000 * 60 * 5,
    enabled: computed(() => !!id.value), // executed only if id exists
  });
}
