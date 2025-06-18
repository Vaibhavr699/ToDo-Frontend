import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
      plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Use the new JSX transform
      jsxRuntime: 'automatic',
      jsxImportSource: 'react'
    })
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@mui/x-date-pickers',
      'date-fns',
      'react-router-dom',
      '@tanstack/react-query'
    ],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@': '/src',
      'date-fns': 'date-fns/esm'
    },
    dedupe: ['react', 'react-dom']
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      strict: true,
      allow: ['..']
    },
    hmr: {
      overlay: true
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      input: {
        main: '/index.html'
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers'],
          'utils-vendor': ['date-fns', '@tanstack/react-query']
        }
      }
    }
  }
});

