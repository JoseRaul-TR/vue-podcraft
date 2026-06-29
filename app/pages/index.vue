<!-- app/pages/index.vue -->
<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: t("home.title"),
  meta: [
    {
      name: "description",
      content: "Discover and track your favorite podcasts with Podcraft.",
    },
  ],
});
</script>

<template>
  <div>
    <h1>{{ t("home.headline") }}</h1>
    <p>{{ t("home.tagline") }}</p>
    <NuxtLink to="/podcasts">
      <button class="primary" style="margin-top: 1rem">
        {{ t("home.browse") }}
      </button>
    </NuxtLink>
  </div>
</template>
