<template>
    <!-- 按鈕更新地圖 -->
    <el-button size="large" type="primary" @click="initMap(props.selectedDay)" :icon="Loading" round>更新地圖</el-button>
    <!-- 表示行程地圖的容器 -->
    <div class="datesMap">
        <!-- 地圖容器，如果有選擇的地點，顯示地圖 -->
        <div id="map" class="map-container" v-show="selectedDay.places.length > 0"></div>
        <!-- 如果沒有選擇的地點，顯示空白提示 -->
        <el-empty v-show="selectedDay.places.length === 0" class="empty-container" description="無地點資料" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import type { Place } from '@/types';
import { ElButton } from 'element-plus';
import { Loading } from '@element-plus/icons-vue'

// 定義組件的 props，包含選定的行程日期和地點列表
const props = defineProps<{
    selectedDay: { date: string; places: Place[] };
}>();

let map: google.maps.Map; // Google 地圖物件
let markers: google.maps.Marker[] = []; // 地圖標記陣列

// 異步初始化 Google 地圖
async function initMap(locationDay: { date: string; places: Place[] }): Promise<void> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary; // 載入地圖庫
    const { Marker } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary; // 載入標記庫

    const mapElement = document.getElementById("map"); // 取得地圖容器元素
    if (!mapElement) return; // 如果找不到地圖容器，結束函式

    clearMarkers(); // 清除所有標記
    map = new Map(mapElement, {
        mapId: "f61cd53a46d9e5a3", // 設置地圖 ID
        streetViewControl: false, // 不顯示街景控制
        mapTypeControl: false, // 不顯示地圖類型控制
        fullscreenControl: false, // 不顯示全屏控制
    });

    const transitLayer = new google.maps.TransitLayer(); // 新增交通線圖層
    transitLayer.setMap(map); // 將交通線圖層加到地圖上

    // 繪製地圖標記
    if (locationDay) {
        drawMarkers(locationDay);
    }
}

// 清除地圖上的標記
function clearMarkers(): void {
    markers.forEach(marker => {
        marker.setMap(null); // 從地圖上移除標記
    });
    markers = []; // 清空標記陣列
}

// 繪製地圖上的標記
function drawMarkers(locationDay: { date: string; places: Place[] }): void {
    if (!map) return; // 如果地圖未初始化，結束函式
    const bounds = new google.maps.LatLngBounds(); // 創建 LatLngBounds 物件來盛放所有標記

    locationDay.places.forEach(place => {
        const position = new google.maps.LatLng(place.geometry.lat, place.geometry.lng); // 獲取地點的經緯度
        bounds.extend(position); // 將地點的經緯度加入到 LatLngBounds 中
        const marker = new google.maps.Marker({
            position, // 設置標記的位置
            map, // 將標記加到地圖上
            title: place.name, // 設置標記的標題
        });
        markers.push(marker); // 將標記加入到標記陣列中
    });

    map.fitBounds(bounds); // 自動調整地圖視窗，顯示所有標記
}

// 組件初次加載時初始化地圖
onMounted(async () => {
    try {
        await initMap(props.selectedDay); // 初始化地圖
    } catch (error) {
        console.error('Failed to initialize map:', error); // 輸出初始化地圖失敗的錯誤訊息
    }
});

// 監聽 selectedDay 的變化，重新初始化地圖
watch(() => props.selectedDay, (newDay) => {
    console.log('Selected day changed:', newDay); // 輸出新的行程日期和地點列表
    if (map) {
        clearMarkers(); // 清除地圖上的標記
    }
    initMap(newDay); // 根據新的行程日期和地點列表初始化地圖
});
</script>


<style scoped>
.el-button {
    margin: 15px auto;
    /* 上下自動外邊距 */
    display: flex;
    align-items: center;
    /* 垂直居中對齊 */
    justify-content: center;
    /* 水平居中對齊 */
    width: 100px;
    height: 50px;
    background-color: #05203c;
}

/* 表示行程地圖的容器樣式 */
.datesMap {
    position: relative;
    /* 相對定位 */
    display: flex;
    /* 使用彈性盒子模型進行排版 */
    align-items: center;
    /* 垂直居中對齊 */
    justify-content: center;
    /* 水平居中對齊 */
    max-width: 95%;
    /* 最大寬度為父容器的 95% */
    margin: 5px auto;
    /* 左右自動外邊距 */
    height: 400px;
    /* 高度為 400px */
    border: 2px solid #05203c;
    /* #05203c色邊框，寬度為 2px */
    border-radius: 12px;
    /* 圓角半徑為 12px */
    overflow: hidden;
    /* 超出部分隱藏 */
    /* 確保子元素不會超出邊界 */
}

.map-container {
    position: absolute;
    /* 絕對定位 */
    top: 0;
    /* 與父容器頂部對齊 */
    left: 0;
    /* 與父容器左側對齊 */
    right: 0;
    /* 與父容器右側對齊 */
    bottom: 0;
    /* 與父容器底部對齊 */
    width: 100%;
    /* 寬度為 100% */
    z-index: 1;
    /* 疊放順序設為最上層 */
    /* 確保地圖在最上層 */
}

.empty-container {
    position: absolute;
    /* 絕對定位 */
    top: 0;
    /* 與父容器頂部對齊 */
    left: 0;
    /* 與父容器左側對齊 */
    right: 0;
    /* 與父容器右側對齊 */
    bottom: 0;
    /* 與父容器底部對齊 */
    display: flex;
    /* 使用彈性盒子模型進行排版 */
    align-items: center;
    /* 垂直居中對齊 */
    justify-content: center;
    /* 水平居中對齊 */
    z-index: 2;
    /* 疊放順序設為次上層 */
    /* 確保空白提示在最上層 */
    background: white;
    /* 白色背景 */
    /* 加上背景色以遮擋地圖 */
}
</style>
