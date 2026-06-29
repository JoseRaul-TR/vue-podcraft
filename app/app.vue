<!-- app/app.vue -->
<template>
  <!-- NuxtLayout searches in /layouts the active layout for the route -->
  <NuxtLayout>
    <!-- NuxtPage renders the page (component) for the actual route -->
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* ── Tokens ─────────────────────────────────────────── */
:root {
  --bg: #fafafa;
  --bg-surface: #ffffff;
  --text: #111111;
  --text-muted: #666666;
  --border: #e8e8e8;
  --accent: #7c3aed;
  --accent-soft: #ede9fe;
  --radius: 8px;
  --font-sans: "Inter", system-ui, sans-serif;
  --max-width: 860px;
  --spacing: 1.5rem;
}
.dark {
  --bg: #111111;
  --bg-surface: #1a1a1a;
  --text: #f0f0f0;
  --text-muted: #888888;
  --border: #2a2a2a;
  --accent-soft: #2e1065;
}
/* ––– Reset ──────────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  transition:
    background 0.2s,
    color 0.2s;
}
/* ── Typography ──────────────────────────────────────── */
h1 {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}
h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
p {
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}
small {
  font-size: 0.8rem;
  color: var(--text-muted);
}
/* ── Links ───────────────────────────────────────────── */
a {
  color: var(--accent);
  text-decoration: none;
  transition: opacity 0.15s;
}
a:hover {
  opacity: 0.75;
}
/* ── Buttons ─────────────────────────────────────────── */
button {
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--bg-surface);
  color: var(--text);
  transition:
    background 0.15s,
    border-color 0.15s;
}
button:hover:not(:disabled) {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}
button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
button.primary {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
button.primary:hover:not(:disabled) {
  opacity: 0.85;
}
/* ── Inputs ──────────────────────────────────────────── */
input[type="search"],
input[type="text"] {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  padding: 0.5rem 0.875rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-surface);
  color: var(--text);
  width: 100%;
  max-width: 420px;
  outline: none;
  transition: border-color 0.15s;
}
input:focus {
  select {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--bg-surface);
    color: var(--text);
    cursor: pointer;
  }
  /* ── Layout util ─────────────────────────────────────── */
  .container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--spacing);
  }
  border-color: var(--accent);
}
</style>
