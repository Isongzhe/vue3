//src/views/PlaceView
<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="400px">
                <el-text>
                    <el-icon>
                        <CollectionTag />
                    </el-icon>
                    地點列表
                </el-text>
                <el-divider></el-divider>
                <el-card class="box-card" v-for="place in userStoreData.userInfo.placesInfo.places"
                    :key="place.place_id">
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
                        <div>
                            {{ place.formattedAddress }}
                        </div>
                    </div>
                </el-card>
            </el-aside>
            <el-main>
                <div id="map"></div>
                <gmp-advanced-marker position="lat,lng" title="string"></gmp-advanced-marker>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
/// <reference types="google.maps" /> 
//上面是引入google.maps的類型定義，避免編譯器報錯
import { ElCard, ElIcon } from 'element-plus';
import { CollectionTag, } from '@element-plus/icons-vue';
import type { Place } from '@/types';
import { onMounted, watchEffect } from 'vue';
import { useUserInfoStore } from '@/stores/useUserInfoStore'; // 引入使用者資訊 store
import { ElMessage } from 'element-plus';

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

const userStoreData = useUserInfoStore();
let map: google.maps.Map; // 宣告地圖變數


// 初始化地圖，可透過參數傳入當天的地點資訊，包含日期與地點(也就是locationInfo.locations[某天])
async function initMap(): Promise<void> {
    // 引入地圖與標記庫，參考google.maps的官方文件
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    await google.maps.importLibrary("marker");

    // 初始化地圖，包含多個參數
    map = new Map(document.getElementById("map") as HTMLElement, {
        // zoom: 12, // 地圖縮放大小層級，12大約是一個東京市大小
        mapId: "f61cd53a46d9e5a3", // 地圖樣式ID，googleCloudPlatform申請的
        streetViewControl: true, // 不顯示街景控制按鈕
        mapTypeControl: false, // 不顯示地圖類型控制按鈕
        fullscreenControl: true, // 不顯示全螢幕控制按鈕
    });
    // 初始化交通圖層
    const transitLayer = new google.maps.TransitLayer();
    // 將交通圖層加入地圖
    transitLayer.setMap(map);
    const bounds = new google.maps.LatLngBounds(); // 宣告一個地理座標的邊界
}

// 繪製標記函數
function drawMarkers(par: Place[]): void {
    // 取得邊界
    const bounds = new google.maps.LatLngBounds();
    // 遍歷地點資訊，並繪製標記
    par.forEach(place => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: { lat: place.geometry.lat, lng: place.geometry.lng },
            map: map,
            title: place.name,
            gmpDraggable: false,
        });
        // 將標記加入邊界
        bounds.extend(marker.position as google.maps.LatLng);
    });
    // 調整地圖視窗大小
    map.fitBounds(bounds);
}

// 組件掛載時，執行
onMounted(async (): Promise<void> => {
    // 初始化地圖，await表示以下程式碼會等待initMap執行完畢
    await initMap();
    // 確保地圖初始化完成
    console.log('Map is ready');

    // 監視 userStoreData.userInfo.placesInfo.places 的變化
    watchEffect(() => {
        // 取得使用者地點資訊
        const places = userStoreData.userInfo.placesInfo.places;
        if (places.length > 0) { // 如果地點資訊不為空
            drawMarkers(places); // 繪製標記
        } else {
            ElMessage({
                message: '請等待資料載入中',
                type: 'warning',
            });
        }
    });
});
</script>

<style scoped>
.place-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    /* 調整項目間的間距 */
}

.place-info>div {
    display: flex;
    align-items: center;
    /*  讓圖示和文字垂直居中 */
    gap: 4px;
    /* 調整圖示和文字間的間距 */
}

.el-container {
    border: 2px solid #000;
    margin: 20px auto;
    justify-content: center;
    max-width: 95%;
    height: 500px;
    border-radius: 12px;
    box-sizing: border-box;
    overflow: hidden;
    /* 裁剪超出邊界的内容 */
}

.el-aside {
    overflow-y: auto;
    border-radius: 12px;
    padding: 5px;
}

.el-aside .el-text {
    display: block;
    font-size: 16px;
    font-weight: 700;
    color: #000;
    text-align: center;
    margin: 10px auto;
}

.el-divider--horizontal {
    margin: 10px 0;
}

.el-container .el-main {
    background: #05203c;
    padding: 15px;
}

.box-card {
    margin: 5px auto;
}

#map {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    border: 2px solid #ffffff;
}
</style>