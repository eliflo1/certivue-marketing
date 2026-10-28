import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://certivue.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  outDir: './dist',
  integrations: [react()],
})
