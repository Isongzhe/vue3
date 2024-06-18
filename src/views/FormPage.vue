//src/views/FormPage.vue
<template>
    <el-form class="inputForm">
        <div class="card">
            <img src="/image/googleMap連結說明.png" alt="googleMap連結說明" />
            <div class="card-item">
                <el-form-item>
                    <h3>
                        <el-icon>
                            <MapLocation />
                        </el-icon>Google地圖清單連結:
                    </h3>
                    <a href="https://www.google.com.tw/maps" target="_blank">
                        <el-button size="small" type="primary" :link="true">
                            打開 Google 地圖
                        </el-button>
                    </a>
                    <el-input v-model="localFormData.googleMapURL" placeholder="https://maps.app.goo.gl/..." />
                    <el-text class="mx-1" type="warning">※請移除機場以及新增所有飯店到清單內</el-text>
                </el-form-item>
            </div>
        </div>
        <div class="card">
            <img src="/image/googleMap連結說明.png" alt="googleMap連結說明" />
            <div class="card-item">
                <el-form-item label="抵達機場: ">
                    <el-select v-model="selectedArrivalAirport.name" placeholder="請選擇抵達機場"
                        @change="handleArrivalAirportChange">
                        <el-option-group v-for="(group, index) in airportGroups" :key="index" :label="group.label">
                            <el-option v-for="(airport, idx) in group.options" :key="idx" :label="airport.name"
                                :value="airport.name" />
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <el-form-item label="回程機場: ">
                    <el-select v-model="selectedReturnAirport.name" placeholder="請選擇回程機場"
                        @change="handleReturnAirportChange">
                        <el-option-group v-for="(group, index) in airportGroups" :key="index" :label="group.label">
                            <el-option v-for="(airport, idx) in group.options" :key="idx" :label="airport.name"
                                :value="airport.name" />
                        </el-option-group>
                    </el-select>
                </el-form-item>
            </div>
        </div>
        <div class="card">
            <img src="/image/googleMap連結說明.png" alt="googleMap連結說明" />
            <div class="card-item">
                <el-form-item label="請輸入旅遊抵達日期與離境日期: ">
                    <flat-pickr v-model="dateRange" :config="config" />
                </el-form-item>
                <el-form-item label="請輸入開始旅行的時間: ">
                    <el-time-select v-model="timeRange.start" placeholder="選擇時間" :start="timePickerOptions.start"
                        :step="timePickerOptions.step" :end="timePickerOptions.end" />
                    <el-text class="mx-1" type="warning">※離開機場時間為準</el-text>
                </el-form-item>
                <el-form-item label="請輸入結束旅行的時間: ">
                    <el-time-select v-model="timeRange.end" placeholder="選擇時間" :start="timePickerOptions.start"
                        :step="timePickerOptions.step" :end="timePickerOptions.end" />
                    <el-text class="mx-1" type="warning">※抵達機場時間為準</el-text>
                    <el-text class="mx-1" type="danger">『建議提早三小時』</el-text>
                </el-form-item>
            </div>
        </div>
        <el-form-item class="button">
            <el-button type="primary" @click="submitForm" size="large">提交</el-button>
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
// import { useGoogleMapStore } from '@/stores/useGoogleMapListStore'; // 引入 mock Google地圖api store
import type { TravelTime, FormData, Place, AirportOptionGroup } from '@/types'; // 引入自定義類型

// 引入 Element Plus 組件
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElOptionGroup, ElButton, ElTimeSelect } from 'element-plus';
import { ElMessage } from 'element-plus';
import 'element-plus/dist/index.css'; // 引入 Element Plus CSS
import { MapLocation } from '@element-plus/icons-vue'; //引入icon

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

// 定義機場數據(顯示在下拉選單中)
const airportGroups = ref<AirportOptionGroup[]>([
    {
        label: '東京',
        options: [
            {
                "place_id": "ChIJVze90XnzImARoRp3YqEpbtU",
                "name": "成田國際機場 [NRT]",
                "geometry": {
                    "lat": 35.770178,
                    "lng": 140.3843215
                },
                "formattedAddress": "1-1 Furugome, Narita, Chiba 282-0004日本",
            },
            {
                "place_id": "ChIJ45IxpAtkGGAR3_hG0anDMg0",
                "name": "羽田機場 (東京國際機場) [HND]",
                "geometry": {
                    "lat": 35.5493932,
                    "lng": 139.7798386
                },
                "formattedAddress": "Hanedakuko, Ota City, Tokyo 144-0041日本",
            },
        ],
    },
    {
        label: '其他',
        options: [
            {
                "place_id": "ChIJ9_rNIxO5AGARiI-QjZ-ncfE",
                "name": "關西國際機場 [KIX]",
                "geometry": {
                    "lat": 34.4320333,
                    "lng": 135.2366945
                },
                "formattedAddress": "1 Senshukukokita, Izumisano, Osaka 549-0001日本",
            },
            {
                "place_id": "ChIJzynM7ZN9BGARJQAsbih9mEI",
                "name": "中部國際機場 [NGO]",
                "geometry": {
                    "lat": 34.85884,
                    "lng": 136.8115355
                },
                "formattedAddress": "1 Chome-1 Centrair, Tokoname, Aichi 479-0881日本",
            },
            {
                "place_id": "ChIJ3RpcnUUgdV8R9oH25Xxguho",
                "name": "新千歲機場 [CTS]",
                "geometry": {
                    "lat": 42.7791292,
                    "lng": 141.6866374
                },
                "formattedAddress": "Bibi, Chitose, Hokkaido 066-0012日本",
            },
            {
                "place_id": "ChIJrQFpQhaQQTURtx9OWEZ_5hY",
                "name": "福岡國際機場 [FUK]",
                "geometry": {
                    "lat": 33.5845874,
                    "lng": 130.4438542
                },
                "formattedAddress": "778-1 Shimousui, Hakata Ward, Fukuoka, 812-0003日本",
            }
        ],
    },
]);

const formStore = useUserInfoStore(); // 初始化 useUserInfoStore
// const googleMapStore = useGoogleMapStore(); // 初始化 useGoogleMapStore

import usePlaceName from "@/hooks/usePlaceNameList"
const { places_name, fetchPlacesName, fetchPlacesNameAPI } = usePlaceName();

import usePlaceList from "@/hooks/usePlaceInfo"
const { places, fetchPlaces, fetchPlacesAPI } = usePlaceList(); // 確保正確導入和使用


// 初始化頁面響應式數據，包括日期區間、時間區間、抵達機場、回程機場(為了表單)
const dateRange = ref<string>('');
const timeRange = reactive<TravelTime>({ start: '', end: '' });
const defaultAirport: Place = {
    place_id: '',
    name: '',
    geometry: {
        lat: 0,
        lng: 0
    },
    formattedAddress: '',
};

const selectedArrivalAirport = ref<Place>({ ...defaultAirport });
const selectedReturnAirport = ref<Place>({ ...defaultAirport });

// 初始化本地表單響應式數據
const localFormData = reactive<FormData>({
    googleMapURL: '',
    airportList: {
        arrivalAirport: { ...defaultAirport },
        returnAirport: { ...defaultAirport },
    },
    dateTimeRange: { start: '', end: '' },
    dateList: [],
});

/* 提交表單區函式區域 */
// 計算表單是否填寫完整
const isFormValid = computed(() => {
    return localFormData.googleMapURL &&
        localFormData.airportList.arrivalAirport.name &&
        localFormData.airportList.returnAirport.name &&
        localFormData.dateTimeRange.start &&
        localFormData.dateTimeRange.end &&
        localFormData.dateList.length;
});

import { useRouter } from 'vue-router';
const router = useRouter(); //使用 router
// 提交表單，有空值時提示使用者，提交表單時更新 Pinia userInfoStore 的數據
const submitForm = async () => {
    if (isFormValid.value) {
        console.log('表單提交成功');
        formStore.updateFormData(localFormData);
        console.log('更新後的所有表單數據:', formStore.userInfo);
        ElMessage({
            message: '表單提交成功',
            type: 'success',
        });
        router.push('/map/place'); //導向到 map 頁面
    }
    else {
        ElMessage({
            message: '表單內容請填寫完全',
            type: 'warning',
        })
    }
}
/* GoogleMap發請求拿資料函式區域 */
// 判斷Google地圖清單連結是否正確，若正確則先發出請求去拿 places_name[]，先用模擬數據
const validateAndFetchPlaces = async () => {
    if (localFormData.googleMapURL === '') {
        return;
    }
    const urlPattern = /^https:\/\/maps\.app\.goo\.gl\/.+$/;
    if (urlPattern.test(localFormData.googleMapURL)) {
        // 顯示發出請求的連結
        console.log('發出請求: ' + localFormData.googleMapURL);
        try {
            await fetchPlacesName(); //假造的API接口:內部更新places_name[]

            //真實的API接口:給定Google地圖清單連結，內部更新places_name[]
            // await fetchPlacesNameAPI(localFormData.googleMapURL); 

            // 顯示模擬數據
            console.log('模擬API返回的數據(place_name):', places_name.value);
            // 將模擬數據賦值給相應的變量
            formStore.updatePlaceNameList(places_name.value);
            console.log('更新後的Pinia數據(places_name):', formStore.userInfo.placesInfo.places_name);

            await fetchPlaces(); //假造的API接口:內部更新places[]

            //真實的API接口:給定places_name[]，內部更新places[]
            // await fetchPlacesAPI(formStore.userInfo.placesInfo.places_name); 

            console.log('模擬API返回的數據(places):', places.value);
            formStore.updatePlaceList(places.value);
            console.log('更新後的Pinia數據(places):', formStore.userInfo.placesInfo.places);

            ElMessage({
                message: 'Google地圖清單資訊已成功讀取並寫入',
                type: 'success',
            })
        }
        catch {
            ElMessage({
                message: 'Google地圖清單讀取失敗，請再貼一次Google地圖清單連結',
                type: 'error',
            })
        }
    } else {
        ElMessage({
            message: 'Google地圖清單連結格式錯誤',
            type: 'warning',
        })
        console.log('Google地圖清單連結格式錯誤');
    }
};

// 監聽Google地圖清單連結是否正確，若正確則先發出請求
watchEffect(() => {
    validateAndFetchPlaces();
});

/* 更新日期列表與時間函式區域 */
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

/* 更新機場函式區域 */
// 監聽抵達機場與回程機場變化，更新表單資料
function handleAirportChange(value: string, isArrival: boolean): void {
    const selectedAirport = airportGroups.value
        .flatMap(group => group.options) // 將二維數組轉為一維數組
        .find(airport => airport.name === value); // 找到選擇的機場

    if (selectedAirport) {
        console.log(`選擇的${isArrival ? '抵達' : '回程'}機場:`, selectedAirport);

        if (isArrival) {
            selectedArrivalAirport.value = selectedAirport;
            localFormData.airportList.arrivalAirport = selectedAirport;
        } else {
            selectedReturnAirport.value = selectedAirport;
            localFormData.airportList.returnAirport = selectedAirport;
        }
    }
}
// 抵達機場變化
function handleArrivalAirportChange(value: string): void {
    handleAirportChange(value, true);
}
// 回程機場變化
function handleReturnAirportChange(value: string): void {
    handleAirportChange(value, false);
}
</script>

<style scoped>
/* 導入 flatpickr跟Element Plus CSS (從script import) */
@import 'flatpickr/dist/flatpickr.min.css';
@import 'element-plus/dist/index.css';

/* 自定義樣式 */
/* * {
    border: 2px solid white;
} */

.inputForm {
    background-color: #05203c;
    opacity: 0.95;
    color: #ffffff;
    border-radius: 12px;
    padding: 10px 10px;
    font-weight: 700;
    width: 85%;
    margin: 20px auto;
    box-sizing: border-box;
    /* 讓元素的寬度包含 padding 和 border */
}


.inputForm>* {
    border: 1px solid 24445fc3;
    margin-bottom: 20px;
}

.el-form-item {
    /* background-color: var(--form-item-bg-color, #05203c); */
    display: block;
    text-align: start;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px auto;
    width: 100%;
}

.card {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    background-color: #24445fc3;
    border-radius: 12px;
}

.card>* {
    flex: 1;
    max-width: 49%;
    box-sizing: border-box;
    margin: 10px 10px;
    border-radius: 12px;
    /* border: 2px solid white; */
    background-color: #05203c;
}

.googleMapTag {
    display: block;
}

/* 按鍵元素置中 */
.button>* {
    justify-content: center;
}

/* 覆蓋掉 Element Plus 的樣式 */
/* 表單標籤的樣式 */
.inputForm:deep(.el-form-item__label) {
    color: #ffffff !important;
}

/* 時間輸入框的樣式 */
.inputForm:deep(.el-input__inner) {
    color: black !important;
}

/* 下拉選單的樣式 */
.inputForm:deep(.el-select__caret) {
    color: #ffffff !important;
}

.inputForm:deep(.el-select-dropdown__item, .el-select-dropdown__item:hover) {
    color: black !important;
    background-color: #ffffff !important;
}

/* ratio選項按鈕的樣式 */
.inputForm:deep(.el-radio__label) {
    color: #ffffff !important;
}

/* 按鈕的樣式 */
.inputForm:deep(.el-button) {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
}

.inputForm:deep(.flatpickr-input) {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: #606266;
    font-size: 14px;
    line-height: 24px;
    min-height: 32px;
    display: block;
    width: 100%;
    align-items: center;
    text-align: left;
    border-radius: 4px;
    padding: 4px 12px;
    box-shadow: 0 0 0 1px;
}

.inputForm:deep(.el-icon) {
    margin-right: 5px;
}

.inputForm:deep(.el-text) {
    margin-top: 5px;
}
</style>
