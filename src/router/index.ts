// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import FormPage from "@/views/FormPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/form",
    name: "Form",
    component: FormPage,
  },
  {
    path: "/:pathMatch(.*)*", // 404頁面
    redirect: { name: "Home" }, // 重定向到首頁
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
