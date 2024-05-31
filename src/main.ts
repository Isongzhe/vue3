// 引入createApp用於創建Vue應用
import { createApp } from "vue";
// 引入App.vue根組件
import App from "./App.vue";
// 引入pinia狀態管理庫
import { createPinia } from "pinia";

// 創建Vue應用
const app = createApp(App);

// 創建Pinia狀態管理庫
const pinia = createPinia();
// 安裝Pinia狀態管理庫
app.use(pinia);

// 挂載Vue應用
app.mount("#app");
