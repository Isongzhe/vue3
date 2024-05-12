<template>
    <div class="person">
        <h1>HTML標籤的【ref】屬性</h1>
        <h2 ref="h2_title1">台灣</h2>
        <h2 ref="h2_title2">新竹縣</h2>
        <h3>竹北市</h3>
        <button @click="showLog">點我輸出h2內部元素</button>
    </div>
</template>

<script lang="ts">
// 暴露組件名稱"Person.vue"讓外部引用
export default {
    name: 'Person',
}
</script>

<script lang="ts" setup>
/*
想取出HTML標籤的DOM元素，原本想法是用id後，用document.getElementById('h2_id')取出元素
但開發上不建議使用id，因為有可能不同組件間id重複
 
function showLog(){
  console.log(document.getElementById('h2_id'))
}
*/

// 實務上建議使用ref，取得HTML標籤的DOM元素
// 但注意不能加在子組件標籤上(有保護機制，無法取得子組件，除非導出)，只能加在HTML標籤上
import { ref } from 'vue'

let h2_title2 = ref()

function showLog() {
    console.log(h2_title2)
}

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