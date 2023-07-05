import { defineConfig } from 'vite'
//Plugin for using Ract
import react from '@vitejs/plugin-react'
//For PWA feature
import { VitePWA } from 'vite-plugin-pwa'
//For importing SVGs
import svgr from 'vite-plugin-svgr'
//For HTTPS
import mkcert from 'vite-plugin-mkcert'
//Legacy
import legacy from '@vitejs/plugin-legacy';
//Support ts transpilation
import ts from 'vite-plugin-ts';

import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  server: {
    https: true
  },
  plugins: [
    mkcert(),
    react(),
    VitePWA({
      strategies: 'injectManifest',
      injectManifest: {
        rollupFormat: 'iife',
      },
      registerType: 'autoUpdate',
      srcDir: 'src',
      filename: 'sw.ts',

      devOptions: {
        enabled: true,
        type: "module"
      },

      manifest: {
        name: 'Hx Skits',
        short_name: 'Hx Skits',
        description: 'This is an app created for the Hyphonix (HX) community to assist with skits and make them easier to execute',
        theme_color: '#2980B9',
        start_url: "/",
        display: 'standalone',
        orientation: 'portrait',
        id: 'com.hyphonix.skits',
        prefer_related_applications: true,
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      }
    }),
    svgr(),

  ],
  build: {
    target: 'es2015'
  }
})