import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://kennyke0706.github.io",
  integrations: [sitemap()],
});
