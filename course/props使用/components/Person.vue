<template>
  <div class="person">
    <ul>
      <!-- 用v-for循環數據，並加上歷遍 :key，避免更新數據出錯 -->
      <li v-for="person in list" :key="person.id">
        {{ person.name }}--{{ person.age }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue' // vue3不一定要引入，但是為了代碼規範，最好引入
// import { type Persons } from '@/types'
import { type Persons } from 'D:\\GitHub\\Vue3+TS\\vue3\\src\\types\\index.ts';

// 只接收父組件傳遞的數據
// defineProps(['list'])

// 接收list並限制類型
// defineProps<{ list: Persons }>()

// 接收list + 限制類型 + 限制必要性(?可傳可怖船) + 指定默認值(不傳要給默認值)
import { withDefaults } from 'vue'
// 指定默認值完整寫法
withDefaults(defineProps<{ list?: Persons }>(), {
  list: () => [{ id: '001', name: 'John Doe', age: 30 }]
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