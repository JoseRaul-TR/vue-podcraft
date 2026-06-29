<!-- app/pages/podcasts/index.vue -->
<script setup lang="ts">
import { refDebounced } from "@vueuse/core";
import type { Podcast } from "~~/shared/types/podcast";

const { t } = useI18n();

useHead({
  title: t("podcasts.title"),
  meta: [
    {
      name: "description",
      content: "Search and discover podcasts across all genres.",
    },
  ],
});

// useSearch for SSR safe state
const { searchTerm } = useSearch();

// debouncedTerm updates 400ms after searchTerm stops changing
const debouncedTerm = refDebounced(searchTerm, 400);

const {
  data: podcasts,
  status,
  error,
  refresh,
} = await useFetch<Podcast[]>("/api/podcasts", {
  query: { term: debouncedTerm },
  watch: [debouncedTerm],
  transform: (data) =>
    data.map((podcast) => ({
      ...podcast,
      displayTitle:
        podcast.title.length > 40
          ? podcast.title.slice(0, 40) + "..."
          : podcast.title,
    })),
});
</script>

<template>
  <div>
    <h1>{{ t("podcasts.title") }}</h1>

    <div style="display: flex; gap: 0.5rem; margin: 1.5rem 0">
      <input
        v-model="searchTerm"
        :placeholder="t('podcasts.search')"
        type="search"
      />
      <button @click="refresh()" :disabled="status === 'pending'">↺</button>
    </div>

    <p v-if="status === 'pending'">{{ t("podcasts.loading") }}</p>
    <p v-else-if="error">{{ error.statusText }}</p>

    <ul
      v-else-if="podcasts"
      style="
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      "
    >
      <li v-for="podcast in podcasts" :key="podcast.id" class="podcast-item">
        <NuxtLink
          :to="`/podcasts/${podcast.id}`"
          style="
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.875rem 1rem;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            background: var(--bg-surface);
            color: inherit;
          "
        >
          <img
            :src="podcast.image"
            :alt="podcast.title"
            width="56"
            height="56"
            style="border-radius: 6px; flex-shrink: 0"
          />
          <div>
            <strong style="display: block; color: var(--text)">{{
              podcast.displayTitle
            }}</strong>
            <small>{{ podcast.author }}</small>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
