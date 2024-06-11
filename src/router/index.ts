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

// // 在這裡添加導航守衛
// router.beforeEach((to, from, next) => {
//   const userInfo = localStorage.getItem("userInfo");

//   if (userInfo) {
//     // 如果localStorage裡有userInfo，並且目標路徑不是form，則重定向到form
//     if (to.name !== "Form") {
//       next({ name: "Form" });
//     } else {
//       next();
//     }
//   } else {
//     // 如果localStorage裡沒有userInfo，並且目標路徑不是home，則重定向到home
//     if (to.name !== "Home") {
//       next({ name: "Home" });
//     } else {
//       next();
//     }
//   }
// });

export default router;
