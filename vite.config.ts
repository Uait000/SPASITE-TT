import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/auth': {
        target: 'https://tih-ttgt.ru',
        changeOrigin: true,
      },
      '/content': {
        target: 'https://tih-ttgt.ru',
        changeOrigin: true,
      },
      '/settings': {
        target: 'https://tih-ttgt.ru',
        changeOrigin: true,
      },
      '/admin/settings': {
        target: 'https://tih-ttgt.ru',
        changeOrigin: true,
      },
      '/admin': {
        target: 'https://tih-ttgt.ru',
        changeOrigin: true,
        bypass: (req, res, options) => {
          // Если браузер просит HTML-страницу, не проксируем,
          // а отдаем /index.html, чтобы React-приложение загрузилось
          if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return '/index.html';
          }
          // Во всех остальных случаях (API-запросы) - проксируем
          return null;
        },
      },
      '/api': {
        target: 'https://tih-ttgt.ru',
        changeOrigin: true,
      },
      '/files': {
        target: 'https://tih-ttgt.ru',
        changeOrigin: true,
      },
      '/websocket': {
        target: 'https://tih-ttgt.ru',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/websocket/, '/websocket')
      }
    }
  },

  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
