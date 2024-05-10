<template>
  <div class="person">
    <h2></h2>
    <h2></h2>
    <button></button><button></button>
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

// Methods方法

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