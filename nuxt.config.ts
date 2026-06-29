// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n"],
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "es", name: "Español", file: "es.json" },
      { code: "sv", name: "Svenska", file: "sv.json" },
    ],
    strategy: "no_prefix",
  },

  // Global Metadata – applied to all the pages as base
  app: {
    head: {
      titleTemplate: "%s — Podcraft", // %S = Specific title for every page
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Discover, subscribe and track your favorite podcasts.",
        },
        { name: "theme-color", content: "#18181b" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    public: {
      appName: "Podcraft",
    },
  },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
