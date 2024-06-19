<template>
    <div class="container">
        <el-scrollbar max-height="600px" class="el-scrollbar">
            <pre>{{ markdownContent }}</pre>
        </el-scrollbar>
        <el-text class="mx-1" type="warning">※請將複製的內容貼到 HackMD 編輯區塊</el-text>
        <el-button-group>
            <el-button type="primary" :icon="CopyDocument" @click="copyMarkdownContent">複製</el-button>
            <el-button type="primary" :icon="Document" @click="directToHackMD">
                前往 HackMD 新增檔案
            </el-button>
        </el-button-group>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useUserInfoStore } from '@/stores/useUserInfoStore';
import type { Place } from '@/types';
import { ElButton, ElMessage, ElScrollbar, ElButtonGroup, ElText } from 'element-plus';
import { Document, CopyDocument } from '@element-plus/icons-vue';

const userInfoStore = useUserInfoStore();
const allDatePlacesList = userInfoStore.allDatePlacesList;

function generateMarkdown(allDatePlacesList: { date: string; places: Place[] }[]) {
    let markdown = '';
    markdown += `# ${userInfoStore.userInfo.userData.projectName} \n\n`;
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
                // const navigationUrl = `https://www.google.com/maps/dir/?api=1&origin_place_id=${place.place_id}&destination_place_id=${nextPlace.place_id}&travelmode=transit&origin=${encodeURIComponent(place.name)}&arrival_time=${Math.floor(new Date(day.date + ' ' + nextPlace.arrivalTime).getTime() / 1000)}&destination=${encodeURIComponent(nextPlace.name)}`;
                const navigationUrl = `https://www.google.com/maps/dir/?api=1&origin_place_id=${place.place_id}&destination_place_id=${nextPlace.place_id}&travelmode=transit&origin=${encodeURIComponent(place.name)}&destination=${encodeURIComponent(nextPlace.name)}`;
                markdown += `[導航至下一個地點](${navigationUrl})\n\n`;
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
const copyMarkdownContent = () => {
    navigator.clipboard.writeText(markdownContent.value);
    ElMessage.success('已複製 Markdown 內容');
}
const directToHackMD = () => {
    window.open('https://hackmd.io/new');
}
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px auto;
}

.el-scrollbar {
    max-width: 80%;
    border-radius: 8px;
    margin-top: 10px;
    border: 2px solid #05203c;
    padding: 28px 0px 0px 28px;
    /* 統一設定上下右左的 padding */

}

.el-scrollbar pre {
    color: #05203c;
    margin: 0 auto;
    overflow: auto;
    box-sizing: border-box;
    /* 新增這裡 */
}

.el-text {
    margin: 10px auto;
    font-size: 20px;
    font-weight: bold;
}

.el-button {
    margin: 10px auto !important;
    color: white;
}
</style>
