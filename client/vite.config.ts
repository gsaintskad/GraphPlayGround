import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Your Backend URL
        changeOrigin: true,
        secure: false,
        // Rewrite: Remove '/api' before sending to backend
        // (Use this only if your NestJS app does NOT have a global prefix 'api')
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
