<template>
<div class="person">
    <h2>姓名: {{user.name}}</h2>
    <h2>年齡: {{user.age}}</h2>
    <h2>年齡(Refs解構後): {{age}}</h2>

    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年齡</button>

    <h2>車子品牌: {{user.car.brand}}</h2>
    <h2>車子價格(萬): {{user.car.price}}</h2>
    <button @click="changePrice">價格+10萬</button>
</div>
</template>

<script lang="ts">
// 暴露組件名稱"Person.vue"讓外部引用
export default {
name: 'Person',
}
</script>

<script lang="ts" setup>
import { ref,reactive,toRefs,toRef } from 'vue'


// Data數據
let user = reactive({
    name: 'John',
    age: 30,
    car: {
    brand: 'Toyota',
    price: 100
    },
    games: [
    {id:'game001', name:'LOL'},
    {id:'game002', name:'PUBG'},
    {id:'game003', name:'APEX'},
    ]
})

// 解構賦值，使用toRefs將reactive物件屬性轉換為新的ref物件(但值仍然是reactive的)
let {name,age,car,games} = toRefs(user)
// let n1 = toRef(user,'name') 跟上面概念一樣，只是轉換單一屬性(少用)

// Methods方法
const changeName = () => {
    name.value = 'Tom'
}
const changeAge = () => {
    age.value += 1
}

const changePrice = () => {
    car.value.price += 10
}
</script>

<style scoped>
.person{
    background-color: rgb(37, 81, 65);
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    border-radius: 10px;
    width: 50%;
    margin: auto;

    div{
    border: 3px solid #ccc;
    padding: 15px;
    }
}
h2{
color: white;
}
button{
    margin: 0 5px;
}
ul{
list-style-type: none;
padding: 0;
}
li{
font-size: 20px;
color: white;
}
</style>