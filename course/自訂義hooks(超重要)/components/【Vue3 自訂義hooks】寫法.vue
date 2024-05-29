<template>
  <div class="person">
    <h2>當前和為:{{ sum }}</h2>
    <button @click="add">點我+1</button>
    <hr>
    <img v-for="(dog, index) in dogList" :src="dog" :key="index">
    <button @click="getDog">新增一隻柯基</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
// import useDogs from '@/hooks/useDogs';
// import uesSum from '@/hooks/uesSum';

// const { sum, add } = uesSum();
// const { dogList, getDog } = useDogs();

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

img {
  width: 100px;
  margin-right: 5px;
}
</style>