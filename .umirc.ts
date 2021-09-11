import { defineConfig } from "umi";

export default defineConfig({
  title: "Github Resume",
  // ssr: {},
  // exportStatic: {},
  theme: {
    "@primary-color": "#000000",
  },
  nodeModulesTransform: {
    type: "none",
  },
  routes: [{ path: "/", component: "@/pages/index" }],
  fastRefresh: {},
});
