<template>
    <div class="person">
        <h1>《情況2》:【watch】監聽【ref】定義的物件數據</h1>
        <h2>姓名: {{ person.name }}</h2>
        <h2>年齡: {{ person.age }}</h2>
        <button @click="changeName">姓名+~</button>
        <button @click="changeAge">age+1</button>
        <button @click="resetPerson">重置初始物件</button>
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

let person = ref({
    name: 'John',
    age: 18
});

let changeName = () => {
    person.value.name += '~';
}

let changeAge = () => {
    person.value.age += 1;
}
let resetPerson = () => {
    person.value = {
        name: 'John',
        age: 18
    }
}

/*《情況2》:【watch】監聽【ref】定義的物件數據，監聽person物件的改變
如果想要監聽屬性內部的改變，可以使用深度監聽(deep:true)
傳入的參數
1. 要監聽的數據
2. 回調函式(newVal, oldVal) => {} (實務上通常只需要newVal，除非需要比較舊值)
3. 選項配置{deep:true(深度監聽),immediate:true(初始化時立即執行一次回調函式)}
*/
watch(person, (newVal, oldVal) => {
    console.log('person改變了', newVal, oldVal);
}, { deep: true, immediate: true })


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