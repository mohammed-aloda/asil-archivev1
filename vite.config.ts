import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 3001,
      host: '0.0.0.0',
    },
    plugins: [react()],
    build: {
      // Split big libraries into their own files so returning visitors keep them cached
      // when only the site code changes.
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
