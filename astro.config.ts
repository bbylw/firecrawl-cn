import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import nimbus, {
  defineConfig as defineNimbusConfig,
} from "@cloudflare/nimbus-docs";
import { tableScroll } from "@cloudflare/nimbus-docs/markdown";

const nimbusConfig = defineNimbusConfig({
  site: "https://firecrawl.ndjp.net",
  title: "Firecrawl 中文文档",
  description:
    "大规模搜索、抓取和交互网页的 API —— 为 AI 智能体提供干净的网络数据。",
  locale: "zh-CN",
  github: "https://github.com/firecrawl/firecrawl",
  socialImageAlt: "Firecrawl 中文文档预览",
  sidebar: {
    overviewLabel: "概览",
    items: [{ label: "文档", autogenerate: { directory: "docs" } }],
  },
});

export default defineConfig({
  output: "static",
  // Tailwind v4 via its Vite plugin (the integration Astro recommends for
  // Tailwind v4 — replaces the PostCSS plugin, which doesn't build under
  // Astro 7's Vite 8 bundler).
  vite: {
    plugins: [tailwindcss()],
  },
  // Hover-prefetch link targets so full-page navigations feel instant without
  // a client-side router.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    nimbus(nimbusConfig, {
      rules: {
        "nimbus/frontmatter-shape": "error",
        "nimbus/internal-link": "error",
      },
      markdown: {
        // Wrap wide tables so they scroll instead of overflowing the page.
        hastPlugins: [tableScroll()],
        features: { headingAttributes: true },
      },
    }),
  ],
});