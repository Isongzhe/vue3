import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueSetupExtend from "vite-plugin-vue-setup-extend";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/vue3/" : "/",
  plugins: [vue(), VueSetupExtend()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "docs", // 將輸出目錄設定為 'docs'
  },
  optimizeDeps: {
    include: ["element-plus"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "element-plus/theme-chalk/src/common/var.scss";`,
      },
    },
  },
});
