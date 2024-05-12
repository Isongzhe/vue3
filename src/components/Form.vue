<template>
    <div class="container">
        <label>Google地圖清單連結:
            <input type="text" name="name" v-model="userData.googleMapURL">
        </label>
        <label>是否來回相同機場:
            <select v-model="sameAirport">
                <option value="true">是</option>
                <option value="false">否</option>
            </select>
        </label>
        <label>抵達機場:
            <select v-model="userData.arrivalAirport">
                <option v-for="(airport, index) in airports" :key="index" :value="airport">
                    {{ airport.name }}
                </option>
            </select>
            <span>抵達機場: {{ userData.arrivalAirport }}</span>
        </label>
        <label>回程機場:
            <select v-model="userData.returnAirport">
                <option v-for="(airport, index) in airports" :key="index" :value="airport">
                    {{ airport.name }}
                </option>
            </select>
            <span>回程機場: {{ userData.returnAirport }}</span>
        </label>
        <button type="submit" @click="handleSubmit()">提交</button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Form',
}
</script>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

interface Airport {
    name: string;
    coordinates: [number, number];
}
interface UserData {
    googleMapURL: string;
    arrivalAirport: Airport;
    returnAirport: Airport;
}
let sameAirport = ref(false)

let airports = ref<Airport[]>([
    { name: '羽田機場(HND)', coordinates: [110, 200] },
    { name: '成田機場(NRT)', coordinates: [130, 220] },
])

let userData = ref<UserData>({
    googleMapURL: '',
    arrivalAirport: { name: '', coordinates: [0, 0] },
    returnAirport: { name: '', coordinates: [0, 0] },
})


const handleSubmit = () => {
    console.log(userData.value.googleMapURL)
    console.log(userData.value.arrivalAirport)
    console.log(userData.value.returnAirport)
}

watchEffect(() => {
    if (sameAirport.value) {
        userData.value.returnAirport = userData.value.arrivalAirport
    }
})

</script>


<!-- scoped局部樣式，css樣式只在當前組件內生效 -->
<!-- 很重要，避免開發時樣式互相干擾 -->
<style scoped>
.container {
    background-color: rgb(0, 183, 255);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 10px;
    margin: 0 auto;
    width: 800px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /* 新增這行來使 form 中的元素垂直置中 */
    justify-content: center;
    /* 新增這行來使 form 中的元素水平置中 */
}

label {
    background-color: aquamarine;
    display: block;
    text-align: start;
    margin: 10px 10px;
    width: 100%;

}

span {
    margin-left: 10px;
}
</style>