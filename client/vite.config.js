import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import inject from "@rollup/plugin-inject";
import path from "path"; // ✅ Ensure path is imported

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "global.browser": "{}",
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  }, // ✅ Correctly closed resolve block
  plugins: [
    react({
      include: "**/*.jsx",
    }),
    inject({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
});
