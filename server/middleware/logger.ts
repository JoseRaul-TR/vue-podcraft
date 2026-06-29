// server/middleware/logger.ts
export default defineEventHandler((event) => {
  const method = event.method;
  const url = event.path;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url}`);
  // No return – keep running to next handler automatically
});
