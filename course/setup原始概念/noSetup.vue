<template>
    <div class="person">
        <h1>{{ name }}</h1>
        <p>Age: {{ age }}</p>
        <p>Tel: {{ tel }}</p>
        <button @click="changeName">Change Name</button>
        <button @click="changeAge">Change Age</button>
        <button @click="showTel">Show Tel</button>
    </div>
</template>

<script lang="ts">
// 暴露組件名稱"Person.vue"讓外部引用
// 不使用setup語法糖
export default {
name: 'Person',
    setup(){
        // Data數據
        let name = 'Max'
        let age = 27
        let tel = '123456789'

        // Methods方法
        const changeName = () => {
            name = 'Anna' // 此時非響應式數據
            console.log(name)
        }        
        const changeAge = () => {
            age += 1
            console.log(age)
        }
        const showTel = () => {
            alert(tel)
        }
        // 返回Data數據和Methods方法
        return {
            name,
            age,
            tel,
            changeName,
            changeAge,
            showTel
        }
    }
}

</script>

<style scoped>
.person{
    background-color: rgb(0, 183, 255);
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    border-radius: 10px;
}
</style>