<template>
    <div>
        <h2>{{ date }}</h2>
        <el-scrollbar max-height="400px">
            <VueDraggable v-model="list" :animation="150" :group="{ name: 'places', pull: true, put: true }"
                class="flex flex-col gap-2 p-4 w-300px m-auto bg-gray-500/5 rounded overflow-auto">
                <div v-for="(item, index) in list" :key="item.place_id"
                    class="cursor-move h-50px bg-gray-500/5 rounded p-3">
                    {{ item.name }}
                    <el-icon>
                        <Delete class="cursor-pointer" @click="remove(index)" />
                    </el-icon>
                </div>
            </VueDraggable>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ListForDate',
});
</script>
<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { Delete } from '@element-plus/icons-vue';
import type { Place } from "@/types";

const props = defineProps<{
    date: string;
}>();

const list = ref<Place[]>([]);

// 模拟获取数据，可以替换为实际的API调用
const allData = [
    { date: '6/21', places: [] as Place[] },
    { date: '6/22', places: [] as Place[] },
    { date: '6/23', places: [] as Place[] },
];

watch(
    () => props.date,
    (newDate) => {
        const selected = allData.find((item) => item.date === newDate);
        list.value = selected ? selected.places : [];
    },
    { immediate: true }
);

function remove(index: number) {
    list.value.splice(index, 1);
}
</script>

<style scoped>
.cursor-move {
    cursor: move;
}

.h-50px {
    height: 50px;
}

.m-auto {
    margin: auto;
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
</style>