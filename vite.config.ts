import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";
import { version } from "./package.json";

const manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: "Kaleido GitHub Graph",
  version,
  icons: {
    16: "16x16.png",
    48: "48x48.png",
    128: "128x128.png",
  },
  action: {
    default_popup: "index.html",
    default_title: "Kaleido GitHub Graph",
  },
  content_scripts: [
    {
      js: ["src/style-injector.tsx"],
      matches: ["https://github.com/*"],
    },
  ],
  author: "y-hiraoka",
  permissions: ["storage"],
}));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
