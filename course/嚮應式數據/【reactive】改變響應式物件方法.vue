<template>
    <div class="person">
      <div class="number">
        <h2>數字(基本類型)</h2>
        <h2>數字{{num}}</h2>
        <button @click="changeNum">+1</button>
      </div>
  
      <div class="car">
        <h2>汽車(物件)</h2>
        <h2>一輛{{car.brand}}車，價格為新台幣{{car.price}}萬元</h2>
        <button @click="changeCar">改變車(物件)</button>
      </div>
  
      <div class="game">
        <h2>遊戲列表(字典)</h2>
        <!-- <使用:key(=v-bind單向綁定)，key最好加:歷遍時唯一標示 -->
        <ul>
          <li v-for="game in games" :key="game.id">{{game.name}}</li>
        </ul>
        <button @click="changeGame1Name">改變第一個遊戲名稱</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  // 暴露組件名稱"Person.vue"讓外部引用
  export default {
    name: 'Person',
  }
  </script>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { reactive } from 'vue'
  
  // ref對比reactive
  // 1. ref定義基本類型數據/簡單的物件: 要使用.value
  // 2. reactive定義複雜的物件: 重新定義物件時要使用assign
  
  
  let car = reactive({brand: 'Toyota', price: 100})
  // let car = ref({brand: 'Toyota', price: 100}) 可以改成ref
  
  let games = ref([
    {id:'game001', name:'LOL'},
    {id:'game002', name:'PUBG'},
    {id:'game003', name:'APEX'},
  ])
  
  let num = ref(0)
  
  // Methods方法
  
  //reactive 想改變car物件時(改全部，非單一屬性值而已)
  const changeCar = () => {
    // 錯誤寫法: 重新定義物件(破壞響應式)
    // car = reactive({brand: 'Benz', price: 200})\
  
    // 正確寫法: Object.assign(目標物件, 新物件) 覆蓋舊物件
    Object.assign(car, {brand: 'Benz', price: 200})
  }
  
  const changeGame1Name = () => {
    games.value[0].name = 'Minecraft'
  }
  
  const changeNum = ()=>{
    num.value += 1
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