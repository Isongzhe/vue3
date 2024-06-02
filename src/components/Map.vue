<template>
    <div class="container">
        <div class="button-group" id="button-container">
            <button v-for="(info, index) in locationInfo" :key="info.date" @click="showDay(index + 1)">
                {{ info.date }}
            </button>
            <button @click="showDay()">全部</button>
        </div>
        <div id="map"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useLocationStore } from '@/stores/useLocationStore';

const map = ref(null);
const markers = ref([]);
const locationInfo = useLocationStore();

const initMap = () => {
    map.value = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        streetViewControl: false,
        mapTypeControl: false,
    });

    const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map.value);

    const bounds = new google.maps.LatLngBounds();

    locationInfo.locations.forEach((day, i) => {
        markers.value[i] = [];
        day.locations.forEach((location) => {
            const marker = new google.maps.Marker({
                position: location,
                map: map.value,
            });
            markers.value[i].push(marker);
            marker.addListener('click', () => {
                const infoWindow = new google.maps.InfoWindow({
                    content: `這是景點: ${location.name}`,
                });
                infoWindow.open(map.value, marker);
            });
            bounds.extend(marker.getPosition());
        });
    });

    map.value.fitBounds(bounds);
};

const showDay = (day) => {
    markers.value.forEach((dayMarkers, i) => {
        dayMarkers.forEach((marker) => {
            marker.setMap(day ? (i === day - 1 ? map.value : null) : map.value);
        });
    });

    const bounds = new google.maps.LatLngBounds();
    if (day) {
        markers.value[day - 1].forEach((marker) => {
            bounds.extend(marker.getPosition());
        });
    } else {
        markers.value.flat().forEach((marker) => {
            bounds.extend(marker.getPosition());
        });
    }
    map.value.fitBounds(bounds);
};

onMounted(() => {
    initMap();
});
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

.container {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    background-color: #d3daf2;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.button-group {
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 20px;
    border: 3px solid #000;
    padding: 10px;
}

button {
    margin-right: 10px;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

#map {
    height: 400px;
    width: 100%;
    border: 3px solid #000;
}
</style>