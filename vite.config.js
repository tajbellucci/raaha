import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Project Pages site is served from https://tajbellucci.github.io/raaha/
  // Only apply the sub-path for production builds; dev/preview stays at root.
  base: command === 'build' ? '/raaha/' : '/',
  plugins: [react()],
  server: {
    // Preview harness assigns a free port via PORT when 5173 is taken
    port: Number(process.env.PORT) || 5173,
    fs: {
      // Dev server may be launched via the 8.3 short path (folder name has spaces)
      allow: ['C:/OTHERF~1/flowpath', 'C:/Other fable projects/flowpath'],
    },
  },
}))
