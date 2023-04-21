import { defineConfig } from 'vite'
//Plugin for using Ract
import react from '@vitejs/plugin-react'
//For PWA feature
import { VitePWA } from 'vite-plugin-pwa'
//For importing SVGs
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          }
        ]
      },

      manifest: {
        name: 'Hx Skits',
        short_name: 'Hx Skits',
        description: 'This is an app created for the Hyphonix (HX) community to assist with skits and make them easier to execute',
        theme_color: '#2980B9',
        icons: [
          {
            src: 'favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    svgr()
  ]
})