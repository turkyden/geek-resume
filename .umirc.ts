import { defineConfig } from "umi";

export default defineConfig({
  title: "Geek Resume - Pure Markdown, an online resume editor for developer.",
  ssr: {},
  exportStatic: {},
  publicPath: "https://cdn.jsdelivr.net/gh/turkyden/geek-resume@gh-pages/",
  mfsu: {},
  favicon: "/assets/favicon.ico",
  theme: {
    "@primary-color": "#000000",
  },
  links: [""],
  nodeModulesTransform: {
    type: "none",
  },
  routes: [{ path: "/", component: "@/pages/index" }],
  fastRefresh: {},
});
