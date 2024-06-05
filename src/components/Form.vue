<template>
    <el-form class="inputForm">
        <el-form-item>
            <p>Google地圖清單連結:</p>
            <el-input v-model="localFormData.googleMapURL" placeholder="https://maps.app.goo.gl/..." />
        </el-form-item>

        <el-form-item label="抵達機場">
            <el-select v-model="selectedArrivalAirport.name" placeholder="請選擇抵達機場" @change="handleArrivalAirportChange">
                <el-option-group v-for="(group, index) in airportGroups" :key="index" :label="group.label">
                    <el-option v-for="(airport, idx) in group.options" :key="idx" :label="airport.name"
                        :value="airport.name" />
                </el-option-group>
            </el-select>
        </el-form-item>
        <el-form-item label="回程機場">
            <el-select v-model="selectedReturnAirport.name" placeholder="請選擇回程機場" @change="handleReturnAirportChange">
                <el-option-group v-for="(group, index) in airportGroups" :key="index" :label="group.label">
                    <el-option v-for="(airport, idx) in group.options" :key="idx" :label="airport.name"
                        :value="airport.name" />
                </el-option-group>
            </el-select>
        </el-form-item>

        <el-form-item label="請輸入旅遊抵達日期與離境日期">
            <flat-pickr v-model="dateRange" :config="config" />
        </el-form-item>

        <el-form-item label="請輸入開始旅行的時間">
            <el-time-select v-model="timeRange.start" placeholder="選擇時間" :start="timePickerOptions.start"
                :step="timePickerOptions.step" :end="timePickerOptions.end" />
        </el-form-item>
        <el-form-item label="請輸入結束旅行的時間">
            <el-time-select v-model="timeRange.end" placeholder="選擇時間" :start="timePickerOptions.start"
                :step="timePickerOptions.step" :end="timePickerOptions.end" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import type { BaseOptions } from 'flatpickr/dist/types/options';

import { reactive, ref, watchEffect, computed } from 'vue';

// 引入 Pinia store
import { useUserInfoStore } from '@/stores/useUserInfoStore'; // 引入使用者資訊 store
import { useGoogleMapStore } from '@/stores/useGoogleMapListStore'; // 引入 Google地圖api store
import type { TravelTime, Airport, FormData } from '@/types'; // 引入自定義類型

// 引入 Element Plus 組件
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElOptionGroup, ElButton, ElTimeSelect } from 'element-plus';
import 'element-plus/dist/index.css'; // 引入 Element Plus CSS

// 設置 flatpickr 的選項
const config: Partial<BaseOptions> = {
    minDate: "today",
    mode: 'range',
    dateFormat: 'Y-m-d',
};
// 設置時間選擇器的選項
const timePickerOptions = {
    start: '00:00',
    step: '00:15',
    end: '23:45',
};

const formStore = useUserInfoStore(); // 初始化 useUserInfoStore
const googleMapStore = useGoogleMapStore(); // 初始化 useGoogleMapStore

// 定義機場數據
const airportGroups = ref([
    {
        label: '東京',
        options: [
            { name: '成田機場(NRT)', coordinates: [35.7641817, 140.3847858] },
            { name: '羽田機場(HND)', coordinates: [35.5493932, 139.7798386] },
        ],
    },
    {
        label: '其他',
        options: [
            { name: '關西國際機場(KIX)', coordinates: [34.434722, 135.244167] },
            { name: '中部國際機場(NGO)', coordinates: [34.858333, 136.804722] },
            { name: '新千歲機場(CTS)', coordinates: [42.775278, 141.6925] },
            { name: '福岡機場(FUK)', coordinates: [33.585, 130.45] },
        ],
    },
]);

// 初始化頁面響應式數據，包括日期區間、時間區間、抵達機場、回程機場(為了表單)
const dateRange = ref<string>('');
const timeRange = reactive<TravelTime>({ start: '', end: '' });
const selectedArrivalAirport = ref<Airport>({ name: '', coordinates: [0, 0] });
const selectedReturnAirport = ref<Airport>({ name: '', coordinates: [0, 0] });

// 初始化本地表單響應式數據
const localFormData = reactive<FormData>({
    googleMapURL: '',
    arrivalAirport: { name: '', coordinates: [0, 0] },
    returnAirport: { name: '', coordinates: [0, 0] },
    dateTimeRange: { start: '', end: '' },
    dateList: [],
    places_name: [],
});

// 計算表單是否填寫完整
const isFormValid = computed(() => {
    return localFormData.googleMapURL &&
        localFormData.arrivalAirport.name &&
        localFormData.returnAirport.name &&
        localFormData.dateTimeRange.start &&
        localFormData.dateTimeRange.end &&
        localFormData.dateList.length;
});
// 提交表單，有空值時提示使用者，提交表單時更新 Pinia userInfoStore 的數據
function submitForm(): void {
    if (isFormValid.value) {
        console.log('表單提交成功');
        formStore.updateFormData(localFormData);
    }
    else {
        alert('請填寫完整表單資訊');
    }
}

// 監聽Google地圖清單連結是否正確，若正確則先發出請求
watchEffect(() => {
    if (localFormData.googleMapURL === '') {
        return;
    }
    const urlPattern = /^https:\/\/maps\.app\.goo\.gl\/.+$/;
    if (urlPattern.test(localFormData.googleMapURL)) {
        console.log('發出請求: ' + localFormData.googleMapURL);

        // 使用 Pinia store 來獲取模擬數據
        googleMapStore.fetchPlaces();
        console.log('模擬 API 返回的數據:', googleMapStore.places);

        // 將模擬數據賦值給相應的變量
        localFormData.places_name = googleMapStore.places;
    } else {
        console.log('Google地圖清單連結格式錯誤');
    }
});
// 監聽日期區間與時間區間變化，拆解成開始與結束時間
watchEffect(() => {
    const [start, end] = dateRange.value.split(' to ');
    if (start && end && timeRange.start && timeRange.end) {
        localFormData.dateTimeRange = {
            start: `${start}T${timeRange.start}:00`,
            end: `${end}T${timeRange.end}:00`,
        };
        console.log('選擇的日期區間:', localFormData.dateTimeRange);
    }
});
// 生成日期列表
const dateList = computed<string[]>(() => {
    const dates: string[] = [];
    let start = new Date(dateRange.value.split(' to ')[0]);
    let end = new Date(dateRange.value.split(' to ')[1]);
    while (start <= end) {
        dates.push(new Date(start).toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' }));
        start.setDate(start.getDate() + 1);
    }
    localFormData.dateList = dates;
    return dates;
});
// 監聽日期列表變化，更新表單資料
watchEffect(() => {
    localFormData.dateList = dateList.value;
});

// 監聽抵達機場與回程機場變化，更新表單資料
function handleArrivalAirportChange(value: string): void {
    const selectedAirport = airportGroups.value.flatMap(group => group.options).find(airport => airport.name === value);
    if (selectedAirport) {
        const { name, coordinates } = selectedAirport;
        console.log('選擇的抵達機場:', selectedAirport);
        selectedArrivalAirport.value = { name, coordinates: coordinates as [number, number] };
        localFormData.arrivalAirport = { name, coordinates: coordinates as [number, number] };
    }
}
function handleReturnAirportChange(value: string): void {
    const selectedAirport = airportGroups.value.flatMap(group => group.options).find(airport => airport.name === value);
    if (selectedAirport) {
        const { name, coordinates } = selectedAirport;
        console.log('選擇的回程機場:', selectedAirport);
        selectedReturnAirport.value = { name, coordinates: coordinates as [number, number] };
        localFormData.returnAirport = { name, coordinates: coordinates as [number, number] };
    }
}
</script>

<style scoped>
/* 導入 flatpickr跟Element Plus CSS (從script import) */
@import 'flatpickr/dist/flatpickr.min.css';
@import 'element-plus/dist/index.css';

.inputForm {
    background-color: #05203c;
    opacity: 0.95;
    color: #ffffff;
    border-radius: 12px;
    padding: 10px;
    font-weight: 700;
    width: 98%;
}

.inputForm>* {
    border: 2px solid white;
}

.el-form-item {
    background-color: #05203c;
    display: block;
    text-align: start;
    padding: 10px 10px;
    margin: 20px 0;
    width: 100%;
}

/* 表單標籤的樣式 */
:deep(.el-form-item__label) {
    color: #ffffff !important;
}

/* 時間輸入框的樣式 */
:deep(.el-input__inner) {
    color: black !important;
}

/* 下拉選單的樣式 */
:deep(.el-select__caret) {
    color: #ffffff !important;
}

:deep(.el-select-dropdown__item, .el-select-dropdown__item:hover) {
    color: black !important;
    background-color: #ffffff !important;
}

/* ratio選項按鈕的樣式 */
:deep(.el-radio__label) {
    color: #ffffff !important;
}

/* 按鈕的樣式 */
:deep(.el-button) {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
}
</style>

<!-- /* 
.inputForm {
    border: 2px solid #000;
    color: #ffffff;
    background-color: #05203c;
    padding-left: 48px;
    width: 98%;
}

.inputForm {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 10px;
    margin: 0 auto;
    max-width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.el-form-item {
    background-color: #05203c;
    display: block;
    text-align: start;
    padding: 10px 10px;
    margin: 20px 0;
    width: 100%;
}

:deep(.el-form-item__label, .el-radio) {
    color: #ffffff !important;
}

:deep(.el-button) {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
} */ -->