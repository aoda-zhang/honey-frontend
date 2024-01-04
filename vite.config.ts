import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  envPrefix: "REACT_APP_",
  server: {
    port: 3001,
    proxy: {
      "/api/v1": {
        target: "http://localhost:2826",
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
  define: {
    "process.env": process.env,
  },
  build: {
    outDir: "build",
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/shared/styles/theme.scss";
        @import "./src/shared/styles/medias.scss";
        @import "./src/shared/styles/common.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
