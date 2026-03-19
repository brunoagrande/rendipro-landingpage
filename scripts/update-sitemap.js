/**
 * Atualiza o campo <lastmod> do sitemap.xml com a data atual (YYYY-MM-DD).
 * Executado automaticamente antes do vite build via package.json scripts.
 *
 * Uso: node scripts/update-sitemap.js
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sitemapPath = join(__dirname, '..', 'public', 'sitemap.xml')
const today = new Date().toISOString().split('T')[0]

let sitemap = readFileSync(sitemapPath, 'utf8')
sitemap = sitemap.replace(/<lastmod>.*<\/lastmod>/, `<lastmod>${today}</lastmod>`)
writeFileSync(sitemapPath, sitemap)

console.log(`✅ sitemap.xml atualizado: lastmod = ${today}`)
