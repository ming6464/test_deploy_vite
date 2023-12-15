import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  base: "/test_deploy_vite/",
  plugins: [vue()],
  define: {
    'process.env': {
      VITE_API: process.env.VITE_API
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
