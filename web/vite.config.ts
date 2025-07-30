import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/3DReflecNet/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    fs: {
      // Allow access to instance files in project root directory
      allow: [".."],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@instances": path.resolve(__dirname, "../"),
    },
  },
});
