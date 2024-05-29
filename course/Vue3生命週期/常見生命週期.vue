<template>
  <div class="person">
    <h2>當前和為:{{ sum }}</h2>
    <button @click="add">點我+1</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

// 數據
let sum = ref(0)
// 方法
const add = () => {
  sum.value += 1
}
// 創建(vue3創建是綁定到setup上)
console.log('創建')

// vue3生命週期

// 常用的生命週期
// onMounted(掛載完畢) onUpdated(更新完畢) onBeforeUnmount(卸載之前)

// 掛載前
onBeforeMount(() => {
  console.log('掛載前')
})
// 掛載完畢，子組件先掛載，父組件後掛載(App.vue最後)
onMounted(() => {
  console.log('子--掛載完畢')
})
// 更新前
onBeforeUpdate(() => {
  console.log('更新前')
})
// 更新完畢
onUpdated(() => {
  console.log('更新完畢')
})
// 卸載前 (通常是父組件切換時觸發，不要了)
onBeforeUnmount(() => {
  console.log('卸載前')
})
// 卸載完畢
onUnmounted(() => {
  console.log('卸載完畢')
})
</script>


<!-- scoped局部樣式，css樣式只在當前組件內生效 -->
<!-- 很重要，避免開發時樣式互相干擾 -->

<style scoped>
.person {
  background-color: rgb(37, 81, 65);
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  width: 800px;
  margin: 0 auto;

  div {
    border: 3px solid #ccc;
    padding: 15px;
  }
}

.person>* {
  margin-bottom: 10px;
  font-size: 20px;
}

h2 {
  color: white;
}

button {
  margin: 0 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  font-size: 20px;
  color: white;
}
</style>