<!-- app/pages/subscriptions.vue -->
<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  middleware: "auth", // Nuxt executes auth.ts before rendering this page
});

const store = useSubscriptionsStore();
useHead({ title: t("subscriptions.title") });
</script>

<template>
  <div>
    <h1>{{ t("subscriptions.title") }}</h1>
    <p v-if="store.count === 0" style="margin-top: 1rem">
      {{ t("subscriptions.empty") }}
    </p>
    <ul v-else>
      <li
        v-for="id in store.subscriptions"
        :key="id"
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: var(--bg-surface);
        "
      >
        <NuxtLink :to="`/podcasts/${id}`">Podcast: {{ id }}</NuxtLink>
        <button @click="store.unsubscribe(id)">
          {{ t("subscriptions.remove") }}
        </button>
      </li>
    </ul>
  </div>
</template>
