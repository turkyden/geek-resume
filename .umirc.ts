import { defineConfig } from "umi";

export default defineConfig({
  title: "极简简历 - 纯 Markdown，一套专为开发者量身定制的优雅简历模板",
  metas: [
    {
      name: "keywords",
      content: "程序员简历, 前端工程师简历, Markdown",
    },
    {
      name: "description",
      content: "纯 Markdown，一套专为开发者量身定制的优雅简历模板",
    },
  ],
  // ssr: {},
  // exportStatic: {},
  hash: true,
  analytics: {
    baidu: "9ac0124fa09ddf2c6f1edcd0ca3c6330",
  },
  runtimePublicPath: true,
  publicPath:
    process.env.NODE_ENV === "production"
      ? "https://cdn.jsdelivr.net/gh/turkyden/geek-resume@gh-pages/"
      : "/",
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
