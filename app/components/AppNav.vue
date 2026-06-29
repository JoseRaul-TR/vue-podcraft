<!-- app/components/AppNav.vue -->
<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const { t, locale, locales, setLocale } = useI18n();
const { persistedLocale } = useLocale();

function handleLocaleChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value as "en" | "es" | "sv";
  setLocale(value);
  persistedLocale.value = value;
}

const isDark = useDark(); // Detects system preference + persists in localStorage
const toggleDark = useToggle(isDark); // Function to alternate the value
</script>
<template>
  <nav style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; padding-left: 1rem; padding-right: 1rem;">
    <NuxtLink
      to="/"
      style="font-weight: 700; font-size: 1rem; color: var(--text)"
      >{{ t("nav.home") }}</NuxtLink
    >
    <div style="display: flex; gap: 1rem; flex: 1">
      <NuxtLink to="/podcasts">{{ t("nav.podcasts") }}</NuxtLink>
      <NuxtLink to="/explore">Explore (TanStack Query)</NuxtLink>
      <NuxtLink to="/subscriptions">{{ t("nav.subscriptions") }}</NuxtLink>
      <NuxtLink to="/about">{{ t("nav.about") }}</NuxtLink>
    </div>

    <div style="display: flex; align-items: center; gap: 1rem">
      <!-- Theme Toggle -->
      <button
        @click="toggleDark()"
        style="padding: 0.4rem 0.6rem; font-size: 1rem; line-height: 1"
      >
        {{ isDark ? "☀️" : "🌙" }}
      </button>

      <!-- Language Selector -->
      <select :value="locale" @change="handleLocaleChange">
        <option v-for="loc in locales" :key="loc.code" :value="loc.code">
          {{ loc.name }}
        </option>
      </select>
    </div>
  </nav>
</template>

<style scoped>
a.router-link-active {
  color: var(--accent);
  font-weight: 500;
}
</style>
