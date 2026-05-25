import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Plugin custom: injeta <link rel="preload" as="font"> no <head> para as fontes
 * Inter latin/latin-ext geradas pelo @fontsource-variable. O nome do arquivo
 * inclui hash de build (ex: inter-latin-wght-normal-Dx4kXJAl.woff2), então
 * não dá pra hard-code no index.html. Esse plugin lê o bundle gerado e injeta
 * os preloads com o nome correto, garantindo que a fonte do LCP comece a
 * baixar antes do CSS ser parsed.
 */
function preloadCriticalFonts() {
  const FONT_PATTERN = /inter-latin(-ext)?-wght-normal-[\w-]+\.woff2$/
  const fontFiles = []

  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    generateBundle(_, bundle) {
      fontFiles.length = 0
      for (const fileName of Object.keys(bundle)) {
        if (FONT_PATTERN.test(fileName)) fontFiles.push(fileName)
      }
    },
    transformIndexHtml(html) {
      if (fontFiles.length === 0) return html
      const links = fontFiles
        .map(
          (f) =>
            `<link rel="preload" as="font" type="font/woff2" href="/${f}" crossorigin />`
        )
        .join('\n  ')
      return html.replace(
        '<meta name="viewport"',
        `${links}\n  <meta name="viewport"`
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    preloadCriticalFonts(),
  ],
  build: {
    rollupOptions: {
      output: {
        // Code splitting manual para reduzir o bundle inicial (era 567KB).
        // Vendors caros vão em chunks separados que o browser cacheia
        // independentemente do app code (que muda em todo deploy).
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-helmet-async'],
          'motion-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'utils-vendor': ['clsx', 'tailwind-merge'],
        },
      },
    },
    // Em 2026-05-24 framer-motion saiu do path crítico (entries do App não
    // usam mais). Mas o Vite preload por default todos os chunks atingíveis,
    // incluindo motion-vendor (~120KB) que só é necessário quando os lazy
    // components renderizam. Filtramos esses chunks pra parar de adicionar
    // <link rel="modulepreload"> deles no HTML inicial e segurar o LCP.
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((d) => !/motion-vendor|supabase-vendor/.test(d)),
    },
  },
})
