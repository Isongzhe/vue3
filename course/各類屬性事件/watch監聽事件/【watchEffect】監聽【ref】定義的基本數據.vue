<template>
    <div class="person">
        <h1>《情況3》:【watchEffect】監聽【ref】定義的基本數據</h1>
        <h2>需求:當水溫達到60度c，或水位達到80cm時</h2>
        <h2>當前水溫: {{ temp }}度C</h2>
        <h2>當前水位: {{ level }}cm</h2>
        <button @click="changeTemp">水溫+10</button>
        <button @click="changeLevel">水位+10</button>
    </div>
</template>

<script lang="ts">
// 暴露組件名稱"Person.vue"讓外部引用
export default {
    name: 'Person',
}
</script>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue'

let temp = ref(10);
let level = ref(0);

let changeTemp = () => {
    temp.value += 10;
}

let changeLevel = () => {
    level.value += 10;
}
/*
// 監聽水溫和水位
// 寫法1，要指名到姓(監聽誰)，如果元素過多，不建議使用，請使用寫法2
watch([temp, level], (value) => {
  console.log('水溫或水位改變了', value);
  let [newTemp, newLevel] = value
  if (newTemp >= 60 || newLevel >= 80) {
    console.log('水溫或水位達到了要求');
    console.log('水溫:', newTemp, '水位:', newLevel);
  }
})
*/

// 寫法2，使用watchEffect，當元素過多方便管理
// 自動分析要監聽temp和level的改變，有改變才監聽
watchEffect(() => {
    console.log('水溫或水位改變了', temp.value, level.value);
    if (temp.value >= 60 || level.value >= 80) {
        console.log('水溫或水位達到了要求');
        console.log('水溫:', temp.value, '水位:', level.value);
    }
})

</script>

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