// app/plugins/vue-query.ts
import {
  VueQueryPlugin,
  QueryClient,
  dehydrate,
  hydrate,
} from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // Fresh data during 5 min
        gcTime: 1000 * 60 * 10, // Cached memory during 10 min
        retry: 1, // Restart one time in case of error
        refetchOnWindowFocus: false, // Don't refetch when navigating back to the browser tab
      },
    },
  });

  // SSR: serialize the cache state from the server to the client
  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });

  if (import.meta.server) {
    // In server: saves the state to send it to the client
    nuxtApp.hooks.hook("app:rendered", () => {
      nuxtApp.payload.vueQueryState = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    // In the client: restore the state that comes from the server
    hydrate(queryClient, nuxtApp.payload.vueQueryState);
  }
});
