import { defineConfig } from "umi";

export default defineConfig({
  title: "Github Resume",
  ssr: {},
  exportStatic: {},
  theme: {
    "@primary-color": "#000000",
  },
  links: [
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.min.css" />',
  ],
  nodeModulesTransform: {
    type: "none",
  },
  routes: [{ path: "/", component: "@/pages/index" }],
  fastRefresh: {},
});
