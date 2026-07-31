/** In production (behind Nginx) empty string = same origin. In dev → local API. */
export function getApiUrl() {
  const fromEnv = import.meta.env.VITE_API_URL
  if (fromEnv !== undefined && String(fromEnv).trim() !== '') {
    return String(fromEnv).replace(/\/$/, '')
  }
  if (import.meta.env.PROD) return ''
  return 'http://localhost:3001'
}
