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
const userInfoStore = useUserInfoStore();
const allDatePlacesList = userInfoStore.allDatePlacesList;

function generateMarkdown(allDatePlacesList: { date: string; places: Place[] }[]) {
    let markdown = '';
    allDatePlacesList.forEach((day, dayIndex) => {
        markdown += `## ${day.date}\n\n`;
        day.places.forEach((place, placeIndex) => {

            markdown += `### ${place.name}\n\n`;
            markdown += `- **地址:** ${place.formattedAddress}\n`;
            if (place.departureTime) {
                markdown += `- **出發時間:** ${place.departureTime}\n\n`;
            }
            else if (place.arrivalTime) {
                markdown += `- **抵達時間:** ${place.arrivalTime}\n\n`;
            }
            else {
                markdown += '\n';
            }

            // 提前查看下一個地點的資料
            if (placeIndex < day.places.length - 1) {
                const nextPlace = day.places[placeIndex + 1];
                const navigationUrl = `https://www.google.com/maps/dir/?api=1&origin_place_id=${place.place_id}&destination_place_id=${nextPlace.place_id}&travelmode=transit&origin=${encodeURIComponent(place.name)}&arrival_time=${Math.floor(new Date(day.date + ' ' + nextPlace.arrivalTime).getTime() / 1000)}&destination=${encodeURIComponent(nextPlace.name)}`;
                markdown += `[導航至下一個地點](${navigationUrl})\n\n`;
            }
        });
        markdown += '\n';
    });

    return markdown;
}
// // 生成 Markdown 內容
// function generateMarkdown(allDatePlacesList: { date: string; places: Place[] }[]) {
//     let markdown = '';

//     allDatePlacesList.forEach(day => {
//         markdown += `## ${day.date}\n\n`;
//         day.places.forEach(place => {
//             markdown += `### ${place.name}\n\n`;
//             markdown += `- **地址:** ${place.formattedAddress}\n`;
//             // if (place.types) {
//             //     markdown += `- **類型:** ${place.types.join(', ')}\n\n`;
//             // }
//             if (place.departureTime) {
//                 markdown += `- **出發時間:** ${place.departureTime}\n\n`;
//             }
//             if (place.arrivalTime) {
//                 markdown += `- **抵達時間:** ${place.arrivalTime}\n\n`;
//             }
//         });
//         markdown += '\n';
//     });

//     return markdown;
// }

const markdownContent = ref(''); // 初始化 markdownContent

onMounted(() => {
    // 生成 Markdown 內容並賦值給 markdownContent
    markdownContent.value = generateMarkdown(allDatePlacesList);
});

</script>