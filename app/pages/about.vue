<!-- app/pages/about.vue -->
<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: t("about.title"),
  meta: [
    {
      name: "description",
      content: "About Podcraft.",
    },
  ],
});
</script>

<template>
  <div>
    <h1>{{ t("about.title") }}</h1>
    <p>{{ t("about.description") }}</p>
    <NuxtLink to="/">{{ t("podcasts.back") }}</NuxtLink>
  </div>
</template>
