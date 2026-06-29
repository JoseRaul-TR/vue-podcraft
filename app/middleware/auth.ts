// app/middleware/auth.ts

// Only executes when a page declares it with definePageMeta
export default defineNuxtRouteMiddleware((to) => {
  // useNuxApp() gives access to Nuxt context – similar to useRouter in Vue
  const isAuthenticated = true; // simulates no authenticated user

  if (!isAuthenticated) {
    // navigateTo equivalent to roouter.push() in Nuxt
    // but works both in the server as in the client
    return navigateTo(`/login?redirect=${to.fullPath}`, {
      redirectCode: 302, // HTTP code for SSR
    });
  }
});
