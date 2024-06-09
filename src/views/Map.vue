<template>
    <div class="datesMap">
        <div id="map"></div>
    </div>
</template>

<script lang="ts" setup>
/// <reference types="google.maps" /> 
//上面是引入google.maps的類型定義，避免編譯器報錯

import { onMounted } from 'vue';
import { useLocationStore } from '@/stores/useLocationStore'; // 引入地點 store
const locationInfo = useLocationStore(); // 定義地點物件 store(from Pinia store)

let map: google.maps.Map; // 宣告地圖變數

// 初始化地圖，可透過參數傳入當天的地點資訊，包含日期與地點(也就是locationInfo.locations[某天])
async function initMap(locationDay: { date: string, locations: { name: string, lat: number, lng: number }[] }): Promise<void> {

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
    for (const location of locationDay.locations) {
        const position = new google.maps.LatLng(location.lat, location.lng);
        bounds.extend(position);
        new AdvancedMarkerElement({
            position,
            map,
            title: location.name
        });
    }
    map.fitBounds(bounds);
}

// 組件掛載時，執行
onMounted(async () => {
    // 初始化地圖，await表示以下程式碼會等待initMap執行完畢
    await initMap(locationInfo.locations[0]);
    // 確保地圖初始化完成
    console.log('Map is ready');
    // 確認地圖顯示的是當天的地點
    console.log(`顯示${locationInfo.locations[0].date}的地圖`)
    // 確認地圖中心點，有google.maps.Map或是undefined兩種可能，所以要加上判斷
    const center = map.getCenter();
    if (center) {
        console.log(`Latitude: ${center.lat()}, Longitude: ${center.lng()}`);
    }
});
</script>

<style scoped>
.datesMap {
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