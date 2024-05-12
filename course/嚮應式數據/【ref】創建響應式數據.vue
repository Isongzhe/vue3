<template>
    <div class="person">
      <h1>{{ name }}</h1>
      <h1>Age: {{ age }}</h1>
      <h1>Address: {{ address }}</h1>
      <button @click="changeName">Change Name</button>
      <button @click="changeAge">Change Age</button>
      <button @click="showTel">Show Tel</button>
    </div>
</template>

<script lang="ts">
// 暴露組件名稱"Person.vue"讓外部引用
export default {
name: 'Person',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue' // 引入ref
let name = ref('Max') // 定義響應式數據(基本數據類型)
let age = ref(18)
let tel = '123456789' // 不需要改變的值就不用響應式
let address = 'Taipei City 100'

const changeName = () => {
name.value = 'Anna' // 修改數據(注意.value)
}
const changeAge = () => {
age.value += 1
}
const showTel = () => {
alert(tel)
}

</script>

<style scoped>
.person{
    background-color: rgb(0, 183, 255);
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    border-radius: 10px;
}
button{
    margin: 10px;
}
</style>