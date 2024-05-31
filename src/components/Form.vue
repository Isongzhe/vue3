<template>
    <ul class="inputForm">
        <li>
            <p>Google地圖清單連結:</p>
            <input type="text" v-model="formData.googleMapURL" placeholder="https://maps.app.goo.gl/..." />
        </li>
        <li>是否來回相同機場:
            <select v-model="sameAirport">
                <option value="true">是</option>
                <option value="false">否</option>
            </select>
        </li>
        <li>
            抵達機場:<select v-model="formData.arrivalAirport">
                <option v-for="(airport, index) in airports" :key="index" :value="airport">
                    {{ airport.name }}
                </option>
            </select><br>
            回程機場:<select v-model="formData.returnAirport">
                <option v-for="(airport, index) in airports" :key="index" :value="airport">
                    {{ airport.name }}
                </option>
            </select>
        </li>
        <li class="dateTimeRange">請輸入旅遊抵達日期與離境日期:
            <flat-pickr v-model="dateRange" :config="config" /><br>
            請輸入開始旅行的時間: <input type="time" v-model="timeRange.start" /><br>
            請輸入結束旅行的時間:<input type="time" v-model="timeRange.end" /><br>
        </li>
        <li>
            <button type="submit" @click="submitForm()">提交</button>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import type { BaseOptions } from 'flatpickr/dist/types/options';
import { ref, watchEffect, computed } from 'vue'
import type { TravelTime, Airport, FormData } from '@/types';

const config: Partial<BaseOptions> = {
    minDate: "today",
    mode: 'range',
    dateFormat: 'Y-m-d',
};

let sameAirport = ref(false)
let dateRange = ref('')
let timeRange = ref<TravelTime>({ start: '', end: '' })

let airports = ref<Airport[]>([
    { name: '成田機場(NRT)', coordinates: [35.7641817, 140.3847858] },
    { name: '羽田機場(HND)', coordinates: [35.5493932, 139.7798386] },
])

let formData = ref<FormData>({
    googleMapURL: '',
    arrivalAirport: { name: '', coordinates: [0, 0] },
    returnAirport: { name: '', coordinates: [0, 0] },
    dateTimeRange: { start: '', end: '' },
    dateList: [],
})

let isFormValid = computed(() => {
    return formData.value.googleMapURL &&
        formData.value.arrivalAirport.name &&
        formData.value.returnAirport.name &&
        formData.value.dateTimeRange.start &&
        formData.value.dateTimeRange.end &&
        formData.value.dateList.length;
});

// 繳交表單
function submitForm() {
    if (isFormValid.value) {
        // 表單提交成功，這裡可以添加你的代碼
        console.log('表單提交成功');
    }
}

// 監聽是否來回相同機場，如果是則回程機場自動填入抵達機場
watchEffect(() => {
    if (sameAirport.value) {
        formData.value.returnAirport = formData.value.arrivalAirport
    }
})

// 監聽Google地圖清單連結，如果符合格式則發出請求
watchEffect(() => {
    if (formData.value.googleMapURL === '') {
        // 如果 googleMapURL 為空，則直接返回
        return;
    }
    let urlPattern = /^https:\/\/maps\.app\.goo\.gl\/.+$/
    if (urlPattern.test(formData.value.googleMapURL)) {
        // 發出請求
        // 你需要替換這裡的代碼來發出實際的請求
        console.log('發出請求: ' + formData.value.googleMapURL);
    } else {
        console.log('Google地圖清單連結格式錯誤');
    }
})

// 監聽日期區間，將日期與時間合併成一個物件
watchEffect(() => {
    let start = dateRange.value.split(' to ')[0]
    let end = dateRange.value.split(' to ')[1]
    formData.value.dateTimeRange = {
        start: `${start}T${timeRange.value.start}`,
        end: `${end}T${timeRange.value.end}`
    }
})

// 生成日期列表，計算出旅遊日期的每一天，存成列表
let dateList = computed(() => {
    let dates = []
    let start = new Date(dateRange.value.split(' to ')[0])
    let end = new Date(dateRange.value.split(' to ')[1])
    while (start <= end) {
        dates.push(new Date(start).toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' }))
        start.setDate(start.getDate() + 1)
    }
    formData.value.dateList = dates
    return dates
})
</script>

<style scoped>
@import 'flatpickr/dist/flatpickr.min.css';

nav {
    border: 2px solid #000;
    color: #ffffff;
    background-color: #05203c;
    /* display: flex;
    justify-content: flex-start;
    align-items: center; */
    padding-left: 48px;
}

* {
    border: 5px solid black;
}

ul {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 10px;
    margin: 0 auto;
    max-width: 100%;
    box-sizing: border-box;

    display: block;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

li {
    background-color: rgb(22, 198, 210);
    display: block;
    text-align: start;
    padding: 10px 10px;
    margin: 20px 0;
    width: 30%;
}

li input {
    width: 100px;
    margin-top: 10px;
}

/* .full-width {
    width: 50%;
} */
</style>