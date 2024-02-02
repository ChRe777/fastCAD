import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  kit: {
    adapter: adapter(),
    // moved vite.resolve.alias... inside kit and removed path ../* 
    vite: {
      resolve: {
        alias: {
          $src: resolve('./src/'),
          $lib: resolve('./src/lib/'),
          $components: resolve('./src/lib/components/'),
          $stores: resolve('./src/lib/stores/'),
          $templates: resolve('./src/lib/templates/'),
          $utils: resolve('./src/lib/utils/'),
          $types: resolve('./src/types/'),
          $styles: resolve('./src/styles')
        }
      }
    }
  },
})
