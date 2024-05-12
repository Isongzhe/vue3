<template>
    <div class="person">
        <h1>《情況1》:【watch】監聽【ref】定義的基本數據</h1>
        <h2>{{ sum }}</h2>
        <button @click="changeSum">sum+1</button>
    </div>
</template>

<script lang="ts">
// 暴露組件名稱"Person.vue"讓外部引用
export default {
    name: 'Person',
}
</script>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'

let sum = ref(0);

let changeSum = () => {
    sum.value += 1;
}

// 《情況1》:【watch】監聽【ref】定義的基本數據
// 監聽sum的改變，語法為watch(要監聽的數據, [回調函式](新值, 舊值) => {})
// watch(sum, (newVal, oldVal) => {
//   console.log('sum改變了', newVal, oldVal);
// })

// 停止監聽方式
const stopWatch = watch(sum, (newVal, oldVal) => {
    console.log('sum改變了', newVal, oldVal);
    // 如果sum>=5，停止監聽
    if (newVal >= 5) {
        stopWatch();
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