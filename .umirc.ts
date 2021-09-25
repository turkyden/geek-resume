import { defineConfig } from "umi";

export default defineConfig({
  title: "MD Resume - Pure Markdown, an online resume editor for developer.",
  // ssr: {},
  // exportStatic: {},
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
