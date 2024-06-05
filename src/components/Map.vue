<template>
    <div class="datesMap">

        <div id="map"></div>
    </div>
</template>

<script lang="ts" setup>
/// <reference types="google.maps" /> 

import { onMounted } from 'vue';
import { useLocationStore } from '@/stores/useLocationStore';
// import { GoogleMap } from 'vue3-google-map'

// const markers = ref([]);
const locationInfo = useLocationStore();

let map: google.maps.Map;

async function initMap(locationDay: { date: string, locations: { name: string, lat: number, lng: number }[] }): Promise<void> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    map = new Map(document.getElementById("map") as HTMLElement, {
        zoom: 12,
        mapId: "f61cd53a46d9e5a3",
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
    });
    const transitLayer = new google.maps.TransitLayer();
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

onMounted(async () => {
    await initMap(locationInfo.locations[0]);
    console.log('Map is ready');
    console.log(`顯示${locationInfo.locations[0].date}的地圖`)
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