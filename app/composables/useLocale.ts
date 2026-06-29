// app/composables/useLocale.ts
import { useLocalStorage } from "@vueuse/core";

export const useLocale = () => {
  const persistedLocale = useLocalStorage<string>("podcraft-locale", "en");
  return { persistedLocale };
};
