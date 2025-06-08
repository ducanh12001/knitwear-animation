import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router'],

          // Animation libraries
          'gsap-vendor': ['gsap'],
          'animation-vendor': ['framer-motion', 'lenis'],

          // Form libraries
          'form-vendor': ['react-hook-form'],

          // UI/Utility libraries
          'ui-vendor': ['react-responsive'],
          'utils-vendor': ['lodash', 'clsx'],

          // Page chunks - group related pages
          'home-chunk': [
            './src/pages/HomePage/index.tsx',
            './src/pages/OkkeWorld/index.tsx',
          ],
          'product-chunk': [
            './src/pages/ProductCollection/index.tsx',
            './src/pages/ProductDetail/index.tsx',
          ],
          'commerce-chunk': [
            './src/pages/Cart/index.tsx',
            './src/pages/Payment/index.tsx',
          ],
          'static-chunk': [
            './src/pages/Contacts/index.tsx',
            './src/pages/TermsAndPolicies/index.tsx',
            './src/pages/PasswordRecovery/index.tsx',
            './src/pages/OkkeLimited/index.tsx',
          ],
        },
        // ✅ Better chunk naming
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId
                .split('/')
                .pop()
                ?.replace('.tsx', '')
                .replace('.ts', '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext || '')) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // ✅ Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
    // ✅ Enable source maps for production debugging (optional)
    sourcemap: false,
  },
  // ✅ Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router',
      'gsap',
      'lenis',
      'react-hook-form',
    ],
  },
});
