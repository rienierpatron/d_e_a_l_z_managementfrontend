let cachedConfig = null;

// config variable will be use to store app global config
export const config = {};

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
