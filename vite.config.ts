import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";
import { version } from "./package.json";

const manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: "Kaleido GitHub Graph",
  version,
  action: {
    default_popup: "index.html",
  },
}));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
