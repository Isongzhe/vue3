// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import FormPage from "@/views/FormPage.vue";
import MapPage from "@/views/MapPage.vue";
import PlacePage from "@/views/PlaceView.vue";
import PlanPage from "@/views/PlanView.vue";

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
    path: "/map",
    name: "Map",
    component: MapPage,
    children: [
      {
        path: "place",
        name: "Place",
        component: PlacePage,
      },
      {
        path: "plan",
        name: "Plan",
        component: PlanPage,
      },
    ],
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

// 添加全局導航守衛
router.beforeEach((to, from, next) => {
  const isReload = sessionStorage.getItem("isReload") === "true";
  const allowedRoutes = ["Home", "Place", "Plan"];
  if (
    isReload &&
    typeof to.name === "string" &&
    !allowedRoutes.includes(to.name)
  ) {
    sessionStorage.setItem("isReload", "false"); // 重置標記
    next({ name: "Home" });
  } else {
    sessionStorage.setItem("isReload", "false");
    next();
  }
});

// 在頁面加載時設置標記
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("isReload", "true");
});
export default router;
