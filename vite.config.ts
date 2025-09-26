import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],

    // 👇 IMPORTANT for GitHub Pages (must match your repo name exactly)
    base: mode === 'development' ? '/' : '/K-DN-Dashboard/',

    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // 👈 better to point to src folder
      },
    },

    server: {
      port: 5173,
      open: true,
    },

    build: {
      outDir: 'dist', // gh-pages expects "dist"
      sourcemap: false,
    },
  }
})
