import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@utils": "/src/utils",
      "@redux": "/src/redux",
      "@config": "/src/config",
      "@hooks": "/src/hooks",
    },
  },
});
