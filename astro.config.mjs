import { defineConfig } from 'astro/config';
import alpinejs from "@astrojs/alpinejs";
import node from "@astrojs/node";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), react()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});