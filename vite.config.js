import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
  },
})
