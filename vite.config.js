import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // relative asset paths so the built site can be opened from any folder
  server: {
    // Allow public tunnel hosts (cloudflared/ngrok) so the dev server can be
    // shared with someone outside this machine. Vite blocks unknown hosts by
    // default, which returns "Blocked request. This host is not allowed."
    allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.io', 'localhost'],
  },
  preview: {
    allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.io', 'localhost'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
