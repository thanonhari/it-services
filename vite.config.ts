import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/it-services/', // ต้องระบุชื่อ Repository เพื่อให้ GitHub Pages โหลดไฟล์ถูกครับ
})
