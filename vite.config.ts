import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) {
              return 'vendor-react'
            }
            if (id.includes('lucide-react')) return 'vendor-icons'
          }
          if (id.includes('/views/AdminView')) return 'admin'
        },
      },
    },
  },
})
