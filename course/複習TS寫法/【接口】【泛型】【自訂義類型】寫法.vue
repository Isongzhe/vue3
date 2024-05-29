<template>
  <div class="person">

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 引入規範的接口類型 {type ...}，@為跳回src目錄
// import { type PersonInter } from '@/types'; (正確的)
import { type PersonInter } from 'D:\\GitHub\\Vue3+TS\\vue3\\src\\types\\index.ts';

// 定義單一物件
// let person: PersonInter = {
//   id: '001',
//   name: 'John Doe',
//   age: 30,
// }

// 定義物件陣列，有多個物件，使用泛型
// 方法1. 使用Array<PersonInter>:缺點是未來接口多的話，很麻煩
let personlist: Array<PersonInter> = [
  { id: '001', name: 'John Doe', age: 30 },
  { id: '002', name: 'Jane Doe', age: 25 },
  { id: '003', name: 'Tom Smith', age: 35 },
]

// 方法2. 在types目錄下先定義好list接口類型，然後引入
// import { type Persons } from '@/types'
import { type Persons } from 'D:\\GitHub\\Vue3+TS\\vue3\\src\\types\\index.ts';
// 這樣就可以直接使用Persons接口類型
let persons: Persons = [
  { id: '001', name: 'John Doe', age: 30 },
  { id: '002', name: 'Jane Doe', age: 25 },
  { id: '003', name: 'Tom Smith', age: 35 },
]

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