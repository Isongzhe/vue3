<template>
    <div class="person">
      <h1>{{ name }}</h1>
      <p>Age: {{ age }}</p>
      <p>Tel: {{ tel }}</p>
      <button @click="changeName">Change Name</button>
      <button @click="changeAge">Change Age</button>
      <button @click="showTel">Show Tel</button>
    </div>
</template>


<script lang="ts" setup name="PersonComponent">
// 可以這麼寫，但是兩件事
// 1.npm i vite-plugin-vue-setup-extend -D (下載插件擴展)
// 2.在vite.config.ts中配置插件(參考下面的代碼)

// -vite.config.ts
// import { fileURLToPath, URL } from 'node:url'
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import VueSetupExtend from 'vite-plugin-vue-setup-extend' (Focus on:引入插件)

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     VueSetupExtend() (Focus on:使用插件)
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

</script>

<style scoped>
.person{
    background-color: rgb(0, 183, 255);
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    border-radius: 10px;
}
</style>