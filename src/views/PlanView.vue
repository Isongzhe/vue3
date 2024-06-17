<template>
    <div class="flex flex-wrap gap-4 items-center">
        <el-select v-model="selectedDate" placeholder="Select" size="large" style="width: 240px">
            <el-option v-for="date in dateOptions" :key="date" :label="date" :value="date" />
        </el-select>
    </div>
    <h2>{{ selectedDate }}</h2>
    <div class="flex">
        <el-scrollbar max-height="400px">
            <VueDraggable v-model="allPlacesList" :animation="150"
                :group="{ name: 'places', pull: 'clone', put: false }" :sort="false"
                class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded" @clone="onClone">
                <div v-for="(item, index) in allPlacesList" :key="item.place_id"
                    class="cursor-move h-50px bg-gray-500/5 rounded p-3">
                    {{ item.name }}
                </div>
            </VueDraggable>
        </el-scrollbar>
        <el-scrollbar max-height="400px">
            <VueDraggable v-model="selectedList" :animation="150" :group="{ name: 'places', pull: true, put: true }"
                class="flex flex-col gap-2 p-4 w-300px  m-auto bg-gray-500/5 rounded overflow-auto">
                <div v-for="(item, index) in selectedList" :key="item.place_id"
                    class="cursor-move h-50px bg-gray-500/5 rounded p-3">
                    {{ item.name }}
                    <el-icon>
                        <Delete class="cursor-pointer" @click="remove(selectedList, index)">></Delete>
                    </el-icon>
                </div>
            </VueDraggable>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, watch, toRefs } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useUserInfoStore } from '@/stores/useUserInfoStore'; // 引入使用者資訊 store
import { ElMessage } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';
import type { Place } from "@/types";

const userInfoStore = useUserInfoStore();
const { userInfo } = userInfoStore;

const allPlacesList = computed(() => userInfo.placesInfo.places);
const dateOptions = computed(() => userInfo.formData.dateList);
const allDatePlacesList = reactive(userInfoStore.allDatePlacesList);
const selectedDate = ref<string>()


const selectedList = computed<Place[]>(() => {
    return allDatePlacesList.find(item => item.date === selectedDate.value)?.places || [];
});

watch(selectedList, (newList) => {
    const datePlaces = allDatePlacesList.find(item => item.date === selectedDate.value);
    if (datePlaces) {
        datePlaces.places = newList;
    }
}, { deep: true });

function onClone() {
    console.log('clone')
    console.log(`${selectedDate.value} selectedList`, selectedList.value)
    console.log(`${selectedDate.value} allDatePlacesList`, allDatePlacesList)
}

function remove(list: Place[], index: number) {
    list.splice(index, 1)
}

watch(selectedDate, (newDate) => {
    console.log(`Selected date changed to ${newDate}`);
});
</script>

<style scoped>
* {
    border: 2px solid black;
    color: black;
}

.flex {
    display: flex;
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

.w-300px {
    width: 300px;
}

.bg-gray-500\/5 {
    background-color: rgba(75, 85, 99, 0.05);
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

.m-auto {
    margin: auto;
}

.justify-between {
    justify-content: space-between;
}

.cursor-pointer {
    cursor: pointer;
    width: 20px;
    height: 20px;
}
</style>