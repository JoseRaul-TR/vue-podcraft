<!-- app/pages/podcasts/[id].vue -->
<script setup lang="ts">
import type { PodcastDetail } from "~~/shared/types/podcast";

const { t } = useI18n();

// definePageMeta is a Nuxt macro — as export const metadata in Next.js
// It runs in compile, not in runtime
definePageMeta({
  layout: "podcast", // Uses layouts/podcast.vue instead of layouts/default.vue
});

const route = useRoute(); // Auto-import in Nuxt – no need of manual import
const subscriptionStore = useSubscriptionsStore();

// Critical Data – block navigation until having the podcast
const {
  data: podcast,
  status,
  error,
} = await useAsyncData<PodcastDetail>(`podcast-${route.params.id}`, () =>
  $fetch(`/api/podcasts/${route.params.id}`),
);

// useSeoMeta con reactive data — updates as the data arrives
useSeoMeta({
  title: () => podcast.value?.title ?? "Podcast",
  description: () =>
    `${podcast.value?.author} — ${podcast.value?.genre} podcast on Podcraft.`,
  // Open Graph — to share in Social Networks
  ogTitle: () => podcast.value?.title ?? "Podcast",
  ogDescription: () => `Listen to ${podcast.value?.title} on Podcraft.`,
  ogImage: () => podcast.value?.image ?? "",
  ogType: "website",
  // Twitter Card
  twitterCard: "summary_large_image",
  twitterTitle: () => podcast.value?.title ?? "Podcast",
  twitterImage: () => podcast.value?.image ?? "",
});

// Secondary Data – Don't block navigation
const { data: related, status: relatedStatus } = useFetch("/api/podcasts", {
  query: { term: podcast.value?.genre ?? "technology" },
  lazy: true, // without await – loads in the background
});

const id = route.params.id as string;
const isSubscribed = subscriptionStore.isSubscribed(id);

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}
</script>

<template>
  <div>
    <div v-if="status === 'pending'">{{ t("podcasts.loading") }}</div>
    <div v-else-if="error">{{ error.statusText }}</div>

    <div
      v-else-if="podcast"
      style="display: flex; gap: 2.5rem; align-items: flex-start"
    >
      <!-- Sidebar inside of page, not in layout -->
      <aside style="width: 320px; flex-shrink: 0; text-align: center">
        <img
          :src="podcast.image"
          :alt="podcast.title"
          style="
            width: 180px;
            height: 180px;
            border-radius: var(--radius);
            margin-bottom: 1rem;
          "
        />
        <h2 style="font-size: 1rem; margin-bottom: 0.25rem">
          {{ podcast.title }}
        </h2>
        <p style="font-size: 0.85rem; margin-bottom: 1rem">
          {{ podcast.author }} · {{ podcast.genre }}
        </p>

        <!-- Subscription button -->
        <button
          :class="isSubscribed ? 'primary' : ''"
          @click="subscriptionStore.toggle(id)"
          style="width: fit-content; border-radius: var(--radius);"
        >
          {{
            isSubscribed ? t("podcasts.subscribed") : t("podcasts.subscribe")
          }}
        </button>
      </aside>

      <!-- Episodes -->
      <div style="flex: 1; min-width: 0">
        <h2>{{ t("podcasts.latestEpisodes") }}</h2>
        <ul
          style="
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0;
          "
        >
          <li
            v-for="episode in podcast.episodes"
            :key="episode.id"
            style="padding: 1rem 0; border-bottom: 1px solid var(--border)"
          >
            <strong style="display: block; margin-bottom: 0.25rem">{{
              episode.title
            }}</strong>
            <p style="font-size: 0.85rem; margin-bottom: 0.5rem">
              {{ episode.description }}
            </p>
            <small
              >{{ new Date(episode.date).toLocaleDateString() }} ·
              {{ formatDuration(episode.durationMs) }}</small
            >
          </li>
        </ul>
      </div>

      <!-- Related – Lazy Load -->
      <aside style="width: 320px; flex-shrink: 0; text-align: center">
        <h3>{{ t("podcasts.moreIn") }} {{ podcast.genre }}</h3>
        <p v-if="relatedStatus === 'pending'" style="font-size: 0.85rem">
          {{ t("podcasts.loadingRelated") }}
        </p>

        <ul
          v-else-if="related"
          style="
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 0.75rem;
          "
        >
          <li v-for="p in related.slice(0, 3)" :key="p.id">
            <NuxtLink :to="`/podcasts/${p.id}`">{{ p.title }}</NuxtLink>
          </li>
        </ul>
      </aside>
    </div>
    <NuxtLink to="/podcasts" style="display: inline-block; margin-top: 1.5rem">
      {{ t("podcasts.back") }}</NuxtLink
    >
  </div>
</template>
