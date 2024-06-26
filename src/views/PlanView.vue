//src/views/PlanView.vue
<template>
    <div class="flex flex-wrap gap-4 items-center">
        <el-select v-model="selectedDate" placeholder="Select" size="large" style="width: 240px">
            <el-option v-for="date in dateOptions" :key="date" :label="date" :value="date" />
        </el-select>
    </div>
    <Map :selectedDay="selectedDay"></Map>
    <div class="flex">
        <el-scrollbar max-height="600px" class="el-scrollbar">
            <el-text>
                <el-icon>
                    <CollectionTag />
                </el-icon>
                地點列表
            </el-text>
            <el-divider></el-divider>
            <VueDraggable v-model="allPlacesList" :animation="150"
                :group="{ name: 'places', pull: 'clone', put: false }" :sort="false"
                class="flex flex-col gap-2 p-4 w-48 rounded" @clone="onClone">
                <el-card class="box-card" v-for="place in allPlacesList" :key="place.place_id">
                    <template #header>
                        <div class="card-header">
                            <span>
                                <el-icon :component="getIconComponent(place)">
                                    <component :is="getIconComponent(place)" />
                                </el-icon>
                                {{ place.name }}
                            </span>
                        </div>
                    </template>
                    <div class="place-info">
                        <el-link :underline="false"
                            :href="`https://www.google.com/maps/place/?q=place_id:${place.place_id}`" target="_blank">
                            {{ place.formattedAddress }}
                        </el-link>
                    </div>
                </el-card>
            </VueDraggable>
        </el-scrollbar>
        <el-scrollbar max-height="600px" class="el-scrollbar">
            <el-text>
                <el-icon>
                    <CollectionTag />
                </el-icon>
                {{ selectedDate }} 行程列表
            </el-text>
            <el-divider></el-divider>
            <VueDraggable v-model="selectedList" :animation="150" :group="{ name: 'places', pull: true, put: true }"
                class="flex flex-col gap-2 p-4 w-48 rounded overflow-auto">
                <el-card class="box-card rounded cursor-move" v-for="(place, index) in selectedList"
                    :key="place.place_id">
                    <template #header>
                        <div class="card-header">
                            <span>
                                <el-icon :component="getIconComponent(place)">
                                    <component :is="getIconComponent(place)" />
                                </el-icon>
                                <el-link :underline="false"
                                    :href="`https://www.google.com/maps/place/?q=place_id:${place.place_id}`"
                                    target="_blank">
                                    {{ index + 1 }}. {{ place.name }}
                                </el-link>
                            </span>
                            <el-link :underline="false">
                                <el-icon>
                                    <Delete class="cursor-pointer" @click="remove(selectedList, index)">></Delete>
                                </el-icon>
                            </el-link>
                        </div>
                    </template>
                    <div class="place-info">
                        <div v-if="place.departureTime || index === 0">
                            <el-time-select v-model="place.departureTime" placeholder="出發時間"
                                :start="timePickerOptions.start" :step="timePickerOptions.step"
                                :end="timePickerOptions.end" />
                        </div>
                        <div v-else>
                            <el-time-select v-model="place.arrivalTime" placeholder="抵達時間"
                                :start="timePickerOptions.start" :step="timePickerOptions.step"
                                :end="timePickerOptions.end" />
                        </div>
                        <!-- <div>
                            {{ place.formattedAddress }}
                        </div> -->
                        <!-- <div>
                            <el-link :underline="false"
                                :href="`https://www.google.com/maps/place/?q=place_id:${place.place_id}`"
                                target="_blank">
                                {{ place.formattedAddress }}
                            </el-link>
                        </div> -->
                    </div>
                </el-card>
            </VueDraggable>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, watch, onMounted, watchEffect } from 'vue'
import { ElCard, ElIcon, ElLink } from 'element-plus';
import { CollectionTag, } from '@element-plus/icons-vue';
import { VueDraggable } from 'vue-draggable-plus'
import { useUserInfoStore } from '@/stores/useUserInfoStore'; // 引入使用者資訊 store
import { ElMessage, ElSelect } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';
import type { Place } from "@/types";
import { storeToRefs } from "pinia";
import Map from "@/components/Map.vue";

const emits = defineEmits(['vnode-unmounted']);
// 設置時間選擇器的選項
const timePickerOptions = {
    start: '00:00',
    step: '00:15',
    end: '23:45',
};
const userInfoStore = useUserInfoStore();
const { allDatePlacesList } = storeToRefs(userInfoStore);
const allPlacesList = ref<Place[]>([]);


onMounted(() => {
    // 將所有地點列表初始化為 userInfoStore 中的數據
    allPlacesList.value = userInfoStore.userInfo.placesInfo.places;

    // 監聽 selectedDate 的變化，更新 selectedList
    watchEffect(() => {
        const datePlaces = allDatePlacesList.value.find(item => item.date === selectedDate.value);
        selectedList.value = datePlaces ? datePlaces.places : [];
    });
});

const dateOptions = userInfoStore.userInfo.formData.dateList;
const selectedDate = ref<string>("");
const selectedList = ref<Place[]>([]);

// 監視 selectedList 的變化，並將變化同步到 allDatePlacesList，以便於後續的操作
watch(selectedList, (newList) => {
    const datePlaces = allDatePlacesList.value.find(item => item.date === selectedDate.value);
    if (datePlaces) {
        datePlaces.places = newList;
    }
}, { deep: true });

const selectedDay = ref<{ date: string; places: Place[] }>({ date: "", places: [] });

watch(selectedDate, (newDate) => {
    const foundDay = allDatePlacesList.value.find(day => day.date === newDate);
    selectedDay.value = foundDay || { date: "", places: [] };
});

function onClone() {
    console.log('clone');
    console.log(selectedList.value);
}

function remove(list: Place[], index: number) {
    console.log(`Remove ${list[index].name}`);
    ElMessage({
        message: `移除${list[index].name}`,
        type: 'success',
    });
    list.splice(index, 1)
}

watch(selectedDate, (newDate) => {
    const datePlaces = allDatePlacesList.value.find(item => item.date === newDate);
    selectedList.value = datePlaces ? datePlaces.places : [];
    console.log(`Selected date changed to ${newDate}`);
    ElMessage({
        message: `切換至${newDate} 行程列表`,
        type: 'success',
    });
});

import { Location, ForkSpoon, HomeFilled, CoffeeCup, Goods } from '@element-plus/icons-vue';
function getIconComponent(place: Place) {
    switch (true) {
        case place.types?.includes('lodging'):
            return HomeFilled;
        case place.types?.includes('cafe'):
            return CoffeeCup;
        case place.types?.includes('food'):
            return ForkSpoon;
        case place.types?.includes('store'):
            return Goods;
        default:
            return Location;
    }
}
</script>

<style scoped>
* {
    font-size: 16px;
}

.flex {
    display: flex;
}

/* flex下層 */
.flex>.el-scrollbar {
    width: 45%;
    border: 2px solid #05203c;
    color: black;
    border-radius: 12px;
    overflow: hidden;
    /* box-sizing: content-box; */
    margin: 16px auto;
}

.flex-col {
    flex-direction: column;
}

.gap-2 {
    gap: 0.5rem;
}

.p-4 {
    padding: 1rem;
}

.w-48 {
    width: 95%;
    margin: 0 auto;
}

.rounded {
    border-radius: 0.25rem;
}

.overflow-auto {
    overflow: auto;
}

.cursor-move {
    cursor: move;
}

.h-50px {
    height: 50px;
}

.justify-between {
    justify-content: space-between;
}

.cursor-pointer {
    cursor: pointer;
    width: 20px;
    height: 20px;
}

.flex-wrap {
    flex-wrap: wrap;
}

.items-center {
    align-items: center;
}

.el-select--large {
    margin-left: 30px;
}

.box-card {
    width: 100%;
}

.el-text {
    display: block;
    font-size: 16px;
    font-weight: 700;
    color: #000;
    text-align: center;
    margin: 10px auto;
}

.el-divider--horizontal {
    margin: 0 auto;
}

.card-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /* 確保標題寬度佔滿卡片 */
    box-sizing: border-box;
    /* 包含內邊距和邊框在內的寬度計算 */
}

.box-card,
.card-header {
    padding: 0;
    margin: 0;
    border: none;
}

.card-title {
    flex-grow: 1;
    /* 這行確保標題部分佔據剩餘空間 */
}

.delete-icon {
    margin-left: auto;
    /* 這行確保刪除圖標在右側 */
}

.el-icon {
    margin-right: 5px;
}

.el-scrollbar__view {
    justify-content: center;
    margin: 0 auto;
    align-content: center;
}
</style>