<!-- app/pages/explore.vue -->
<script setup lang="ts">
import { refDebounced } from "@vueuse/core";
import { usePodcastsQuery } from "~/composables/usePodcastsQuery";

const { t } = useI18n();
useHead({ title: t("explore.title") });

const { searchTerm } = useSearch();
const debouncedTerm = refDebounced(searchTerm, 400);

const {
  data: podcasts,
  isLoading,
  isError,
  error,
  refetch,
} = usePodcastsQuery(debouncedTerm);
</script>

<template>
  <div>
    <h1>{{ t("explore.headline") }}</h1>
    <p
      style="
        margin-bottom: 0.5rem;
        font-size: 0.85rem;
        color: var(--text-muted);
      "
    >
      Powered by TanStack Query
    </p>

    <div style="display: flex; gap: 0.5rem; margin: 1.5rem 0">
      <input
        v-model="searchTerm"
        :placeholder="t('podcasts.search')"
        type="search"
      />
      <button @click="refetch()" :disabled="isLoading">↺</button>
    </div>

    <p v-if="isLoading">{{ t("podcasts.loading") }}</p>
    <p v-else-if="isError">{{ error?.message }}</p>

    <ul
      v-else-if="podcasts"
      style="
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      "
    >
      <li v-for="podcast in podcasts" :key="podcast.id">
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
              podcast.title
            }}</strong>
            <small>{{ podcast.author }}</small>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
