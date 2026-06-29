// app/composables/useSubscriptionsMutation.ts
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export function useSubscriptionsMutation() {
  const queryClient = useQueryClient();
  const store = useSubscriptionsStore();

  const subscribeMutation = useMutation({
    mutationFn: async (podcastId: string) => {
      store.subscribe(podcastId);
      return podcastId;
    },
    onSuccess: (podcastId) => {
      // Invalidate related queries – forces related data refetch
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      console.log(`Subscribed to ${podcastId}`);
    },
    onError: (error) => {
      console.error("Failed to subscribe:", error);
    },
  });

  const unsubscribeMutation = useMutation({
    mutationFn: async (podcastId: string) => {
      store.unsubscribe(podcastId);
      return podcastId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });

  return { subscribeMutation, unsubscribeMutation };
}
