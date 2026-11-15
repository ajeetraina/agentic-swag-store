import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Compose uses the internal API service name. For a host-run frontend,
// retain the original host.docker.internal default.
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: process.env.API_PROXY_TARGET || "http://host.docker.internal:3000",
        changeOrigin: true,
      },
    },
  },
});
