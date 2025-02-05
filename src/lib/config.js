let cachedConfig = null;

export const config = {
  env: process.env.NEXT_PUBLIC_APP_ENV,
  appName: 'DEALZ Management',
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
};

/**
 * Get server config
 * @returns {Promise<{config: object}>}
 */
export async function getServerConfig() {
  if (!cachedConfig) {
    const res = await fetch('/api/config');
    cachedConfig = await res.json();
  }
  return cachedConfig;
}
