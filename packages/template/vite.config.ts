import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { builtinModules } from 'node:module'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // 将 @ 映射到 src 目录
    },
  },
  ssr: {
    noExternal: ['react', 'react-dom']
  },
  build: {
    target: 'es2022',
    outDir: './dist',
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      formats: ['es'],
      cssFileName: 'main',
      fileName: 'index',
    },
    rolldownOptions: {
      external: [...builtinModules, ...builtinModules.map(m => `node:${m}`)],  // 将 Node.js 内置模块标记为外部依赖
    }
  }
})
