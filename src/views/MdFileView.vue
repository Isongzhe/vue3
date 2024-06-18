<template>
    <div>
        <textarea rows="20" cols="80">{{ allDatePlacesList }}</textarea>
        <textarea v-model="markdownContent" rows="20" cols="80"></textarea>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useUserInfoStore } from '@/stores/useUserInfoStore';
import type { Place } from '@/types';
import marked from 'marked'; // 引入 marked
const userInfoStore = useUserInfoStore();
const allDatePlacesList = userInfoStore.allDatePlacesList;

// 生成 Markdown 內容
function generateMarkdown(allDatePlacesList: { date: string; places: Place[] }[]) {
    let markdown = '';

    allDatePlacesList.forEach(day => {
        markdown += `## ${day.date}\n\n`;
        day.places.forEach(place => {
            markdown += `### ${place.name}\n\n`;
            markdown += `- **地址:** ${place.formattedAddress}\n`;
            // if (place.types) {
            //     markdown += `- **類型:** ${place.types.join(', ')}\n\n`;
            // }
            if (place.departureTime) {
                markdown += `- **出發時間:** ${place.departureTime}\n\n`;
            }
            if (place.arrivalTime) {
                markdown += `- **抵達時間:** ${place.arrivalTime}\n\n`;
            }
        });
        markdown += '\n';
    });

    return markdown;
}

const markdownContent = ref(''); // 初始化 markdownContent

onMounted(() => {
    // 生成 Markdown 內容並賦值給 markdownContent
    markdownContent.value = generateMarkdown(allDatePlacesList);
});

</script>