<!-- app/layouts/podcast.vue -->
<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column">
    <header
      style="
        border-bottom: 1px solid var(--border);
        background: var(--bg-surface);
      "
    >
      <div class="container" style="padding-top: 1rem; padding-bottom: 1rem">
        <AppNav />
      </div>
    </header>

    <main
      class="container"
      style="
        flex: 1;
        padding-top: 2rem;
        padding-bottom: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
    >
      <slot />
    </main>

    <footer
      style="border-top: 1px solid var(--border); background: var(--bg-surface)"
    >
      <div
        class="container"
        style="
          padding-top: 1rem;
          padding-bottom: 1rem;
          color: var(--text-muted);
          font-size: 0.85rem;
        "
      >
        {{ t("footer") }}
      </div>
    </footer>
  </div>
</template>
