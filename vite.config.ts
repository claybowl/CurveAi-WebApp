import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { vercelPreset } from '@vercel/remix/vite'
import esbuild from 'esbuild'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { remixPWA } from '@remix-pwa/dev'

installGlobals()

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true
  }
}

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
        unstable_optimizeDeps: true,
      },
      serverBuildFile: 'remix.js',
      serverModuleFormat: "esm",
      serverPlatform: "node",
      presets: [
        vercelPreset()
      ],
      buildEnd: async () => {
        await esbuild
          .build({
            alias: { '~': './app', '@': './app' },
            outfile: 'build/server/index.js',
            entryPoints: ['server/index.ts'],
            external: ['./build/server/*'],
            platform: 'node',
            format: 'esm',
            packages: 'external',
            bundle: true,
            logLevel: 'info',
          })
          .catch((error: unknown) => {
            console.error('Error building server:', error)
            process.exit(1)
          })
      },
    }),
    tsconfigPaths(),
    
    ...(isProduction ? [remixPWA()] : []),
    
  ],
})
