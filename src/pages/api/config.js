/**
 * Fetches the serverside config from env vars
 * @returns {Promise<{
 *   apiUrl: string,
 *   googleClientId: string,
 *   googleClientSecret: string,
 *   appEnv: string
 * }>}
 */
export default function handler(req, res) {
  res.status(200).json({
    apiUrl: process.env.API_URL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    appEnv: process.env.APP_ENV,
  });
}
