<template>
<div class="person">

</div>
</template>

<script lang="ts">
// 暴露組件名稱"Person.vue"讓外部引用
export default {
name: 'Person',
}
</script>


<script lang="ts" setup>
// setup語法糖，會自動return屬性

</script>

<style scoped>
.person{
    background-color: rgb(0, 183, 255);
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    border-radius: 10px;
}
</style>