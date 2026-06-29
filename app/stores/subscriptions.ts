import { useLocalStorage } from "@vueuse/core";

// app/stores/subscriptions.ts
export const useSubscriptionsStore = defineStore("subscriptions", () => {
  // useLocalStorage instead of ref – persists automatically
  const subscriptions = useLocalStorage<string[]>("podcraft-subscriptions", []);

  // Getters
  const count = computed(() => subscriptions.value.length);

  const isSubscribed = (id: string) =>
    computed(() => subscriptions.value.includes(id));

  // Actions
  function subscribe(id: string) {
    if (!subscriptions.value.includes(id)) {
      subscriptions.value.push(id);
    }
  }

  function unsubscribe(id: string) {
    subscriptions.value = subscriptions.value.filter((s) => s !== id);
  }

  function toggle(id: string) {
    isSubscribed(id).value ? unsubscribe(id) : subscribe(id);
  }

  return { subscriptions, count, isSubscribed, subscribe, unsubscribe, toggle };
});
