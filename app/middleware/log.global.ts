// app/middleware/log.global.ts

export default defineNuxtRouteMiddleware((to, from) => {
    const timestamp = new Date().toISOString();
  // It is executed in every navigation – equivalent to router.beforeEach in Vue
  console.log(`[${timestamp}] – Navigating from ${from.path} to ${to.path}`);
  // No return = keep navigating
});
