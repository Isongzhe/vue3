<template>
    <div class="person">
        姓: <input type="text" v-model="lastName"></input><br>
        名: <input type="text" v-model="firstName"></input><br>
        <h3>全名: {{ fullName }}</h3><br>
        <button @click="changeFullName">改變全名(計算屬性)</button>

    </div>
</template>

<script lang="ts">
// 暴露組件名稱"Person.vue"讓外部引用
export default {
    name: 'Person',
}
</script>

<script lang="ts" setup>
import { ref, computed } from 'vue'


// Data數據
let lastName = ref('Lin');
let firstName = ref('Sung-Che');

// 對比Method方法沒有緩存功能，每次都會重新執行
// Computed計算屬性(當偵測到firstName或lastName改變時，會重新計算fullName的值)
// fullName只可讀取，不可寫入
// let fullName = computed(() => {
//   return firstName.value.slice(0,1).toUpperCase() + firstName.value.slice(1)+ '-' + lastName.value.slice(0,1).toUpperCase() + lastName.value.slice(1);
// });


let fullName = computed({
    get: () => {
        return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value.slice(0, 1).toUpperCase() + lastName.value.slice(1);
    },
    set: (val) => {
        let names = val.split('-');
        firstName.value = names[0];
        lastName.value = names[1];
    }
});

// Method方法.value
let changeFullName = () => {
    fullName.value = 'SongZhe-Lin';
}
</script>

<style scoped>
.person {
    background-color: rgb(37, 81, 65);
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 10px;
    width: 50%;
    margin: auto;

    div {
        border: 3px solid #ccc;
        padding: 15px;
    }
}

.person>* {
    margin-bottom: 10px;
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