// app/plugins/locale.client.ts

// The sufix .client.ts indicates that is executed in the client
// – avoids the localStorage problem on the server
import { useLocalStorage } from "@vueuse/core";

export default defineNuxtPlugin((nuxtApp) => {
  const persistedLocale = useLocalStorage<string>("podcraft-locale", "en");

  // Access a i18n through Nuxt context – without useI18n()
  const i18n = nuxtApp.$i18n as { setLocale: (locale: string) => void };
  if (persistedLocale.value) {
    i18n.setLocale(persistedLocale.value);
  }
});
