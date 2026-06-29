<!-- app/layouts/default.vue -->
<script setup lang="ts">
const { t } = useI18n();
const config = useRuntimeConfig();
</script>

<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column">
    <header
      style="
        border-bottom: 1px solid var(--border);
        background: var(--bg-surface);
      "
    >
      <div class="container" style="padding: 1rem;">
        <AppNav />
      </div>
    </header>

    <!-- slot is where the content is injected for every route -->
    <!-- Equivalent to {children} in Next.js layout.tsx -->
    <main
      class="container"
      style="
        flex: 1;
        padding: 2rem;
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
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        {{ t("footer") }}
      </div>
    </footer>
  </div>
</template>
