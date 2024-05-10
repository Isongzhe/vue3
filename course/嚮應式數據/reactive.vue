<template>
    <div class="person">
      <div class="car">
        <h2>汽車(物件)</h2>
        <h2>一輛{{car.brand}}車，價格為新台幣{{car.price}}萬元</h2>
        <button @click="changePrice">漲價10萬</button>
      </div>
  
      <div class="game">
        <h2>遊戲列表(字典)</h2>
        <!-- <使用:key(=v-bind單向綁定)，key最好加:歷遍時唯一標示 -->
        <ul>
          <li v-for="game in games" :key="game.id">{{game.name}}</li>
        </ul>
        <button @click="changeGame1Name">改變第一個遊戲名稱</button>
      </div>
  
      <div class="company">
        <h2>公司資訊(複雜層級物件)</h2>
        <ul>
          <li>公司名稱: {{CompanyObj.name}}</li>
          <li>公司地址: {{CompanyObj.address}}</li>
          <li>公司網址: {{CompanyObj.homepage}}</li>
          <li>員工名單:</li>
          <ul>
            <li v-for="(employee, key) in CompanyObj.employees" :key="key">
              {{employee.name}}，年齡{{employee.age}}
            </li>
          </ul>
        </ul>
        <button @click="changeEmployee1Name">改變第一個員工名稱</button>
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
  import { reactive } from 'vue'
  // reactive可定義Object物件數據，但基本數據不行
  // 利用reactive創建響應式數據(Object物件數據)
  let car = reactive({brand: 'Toyota', price: 100})
  
  // 利用reactive創建響應式數據(dict字典數據)
  let games = reactive([
    {id:'game001', name:'LOL'},
    {id:'game002', name:'PUBG'},
    {id:'game003', name:'APEX'},
  ])
  
  let CompanyObj = reactive({
    name:'Google',
    address:'USA',
    homepage:'www.google.com',
    employees:{
      '001':{
        name:'Max',
        age:27,
      },
      '002':{
        name:'Anna',
        age:25,
      }
    }
  })
  
  
  
  // Methods方法
  const changePrice = () => {
    car.price += 10
  }
  
  const changeGame1Name = () => {
    games[0].name = 'Minecraft'
  }
  
  const changeEmployee1Name = () => {
    CompanyObj.employees['001'].name = 'John'
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