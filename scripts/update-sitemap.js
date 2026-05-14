/**
 * Regenera o sitemap.xml completo com lastmod atualizado para hoje.
 * Executado automaticamente antes do vite build via package.json scripts.
 *
 * Para adicionar páginas novas: incluir entradas no array `pages`.
 * Uso: node scripts/update-sitemap.js
 */
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sitemapPath = join(__dirname, '..', 'public', 'sitemap.xml')
const today = new Date().toISOString().split('T')[0]

const pages = [
  { url: '/',           lastmod: today,       changefreq: 'weekly',  priority: '1.0' },
  { url: '/termos',     lastmod: today,       changefreq: 'yearly',  priority: '0.3' },
  { url: '/privacidade',lastmod: today,       changefreq: 'yearly',  priority: '0.3' },
]

const urls = pages.map(({ url, lastmod, changefreq, priority }) => `
  <url>
    <loc>https://rendipro.com.br${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`

writeFileSync(sitemapPath, sitemap)
console.log(`✅ sitemap.xml regenerado com ${pages.length} URL(s) — lastmod = ${today}`)
