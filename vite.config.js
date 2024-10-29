import path from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import reactPlugin from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 8009
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      'boot': path.resolve(__dirname, './boot'),
      'feature': path.resolve(__dirname, './feature'),
    }
  },
  plugins: [
    reactPlugin(),
  ],
})