import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function seoFilesPlugin(siteUrl) {
  const origin = (siteUrl || 'https://metrum.ru').replace(/\/$/, '')

  const writeFiles = (outDir) => {
    const urls = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/finishing', priority: '0.9', changefreq: 'weekly' },
      { path: '/projects', priority: '0.8', changefreq: 'weekly' },
      { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
      { path: '/terms', priority: '0.3', changefreq: 'yearly' },
    ]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path: p, priority, changefreq }) => `  <url>
    <loc>${origin}${p === '/' ? '/' : p}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

    const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${origin}/sitemap.xml
`

    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap)
    fs.writeFileSync(path.join(outDir, 'robots.txt'), robots)
  }

  return {
    name: 'seo-files',
    writeBundle(_options, _bundle) {
      writeFiles(path.resolve(__dirname, 'dist'))
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    publicDir: 'public',
    plugins: [react(), seoFilesPlugin(env.VITE_SITE_URL)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
