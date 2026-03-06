import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Cloudflare Pages ปกติจะใช้ root path (/) เป็นหลักครับ
  base: '/', 
})
