//src/views/PlacePage
<template>
    <div class="container">
        <div id="map"></div>
    </div>

    <!-- <el-card class="box-card" v-for="place in places" :key="place.place_id">
        <template #header>
            <div class="card-header">
                <span>{{ place.name }}</span>
            </div>
        </template>
<div class="place-info">
    <div>
        <el-icon>
            <location />
        </el-icon>
        {{ place.formattedAddress }}
    </div>
</div>
</el-card> -->
</template>

<script setup lang="ts">
/// <reference types="google.maps" /> 
//上面是引入google.maps的類型定義，避免編譯器報錯
import { ElCard, ElIcon } from 'element-plus';
import { Location } from '@element-plus/icons-vue';
import type { Place } from '@/types';
import { onMounted } from 'vue';
import { useUserInfoStore } from '@/stores/useUserInfoStore'; // 引入使用者資訊 store


const userStoreData = useUserInfoStore();
// const places: Place[] = userStoreData.userInfo.placesInfo.places

const placesInfo = JSON.parse(localStorage.getItem('placesInfo') || '[]')
console.log('未過濾places: ', placesInfo.places);
const filteredPlaces = placesInfo.places.filter((place: Place) => !place.types?.includes('airport'));
console.log('已過濾places: ', filteredPlaces);

let map: google.maps.Map; // 宣告地圖變數

// 初始化地圖，可透過參數傳入當天的地點資訊，包含日期與地點(也就是locationInfo.locations[某天])
async function initMap(par: Place[]): Promise<void> {

    // 引入地圖與標記庫，參考google.maps的官方文件
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    // 初始化地圖，包含多個參數
    map = new Map(document.getElementById("map") as HTMLElement, {
        zoom: 12, // 地圖縮放大小層級，12大約是一個東京市大小
        mapId: "f61cd53a46d9e5a3", // 地圖樣式ID，googleCloudPlatform申請的
        streetViewControl: false, // 不顯示街景控制按鈕
        mapTypeControl: false, // 不顯示地圖類型控制按鈕
        fullscreenControl: false, // 不顯示全螢幕控制按鈕
    });
    // 初始化交通圖層
    const transitLayer = new google.maps.TransitLayer();
    // 將交通圖層加入地圖
    transitLayer.setMap(map);
    const bounds = new google.maps.LatLngBounds();

    // 遍歷 places 陣列，並將標記添加到地圖中
    par.forEach(place => {
        console.log(place);
        const marker = new AdvancedMarkerElement({
            position: { lat: place.geometry.lat, lng: place.geometry.lng },
            map: map,
            title: place.name,
        });
        bounds.extend(marker.position as google.maps.LatLng);
    });

    // 調整地圖視圖以適應所有標記
    map.fitBounds(bounds);
}

// 組件掛載時，執行
onMounted(async (): Promise<void> => {
    // 初始化地圖，await表示以下程式碼會等待initMap執行完畢
    await initMap(filteredPlaces);
    // 確保地圖初始化完成
    console.log('Map is ready');
    // 確認地圖中心點，有google.maps.Map或是undefined兩種可能，所以要加上判斷
    const center = map.getCenter();
    if (center) {
        console.log(`Latitude: ${center.lat()}, Longitude: ${center.lng()}`);
    }
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

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 80%;
    margin: 0 auto;
    border: 3px solid #000;
    border-radius: 12px;

}

#map {
    height: 400px;
    width: 50%;
    border: 3px solid gray;
}
</style>