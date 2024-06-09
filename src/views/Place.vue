<template>
    <div>
        <el-card class="box-card" v-for="place in places" :key="place.place_id">
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
                <div>
                    <el-icon>
                        <star />
                    </el-icon>
                    <span v-for="type in place.types" :key="type">
                        {{ type }} {{ type !== place.types[place.types.length - 1] ? ', ' : '' }}
                    </span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ElCard, ElIcon } from 'element-plus';
import { Location, Star } from '@element-plus/icons-vue';



interface Place {
    place_id: string;
    name: string;
    geometry: {
        lat: number;
        lng: number;
    };
    formattedAddress: string;
    types: string[];
}

const places: Place[] = [
    {
        "place_id": "ChIJscDhJ4SLGGARbx0GlzPi9ng",
        "name": "澀谷SCRAMBLE SQUARE",
        "geometry": {
            "lat": 35.6584638,
            "lng": 139.7022621
        },
        "formattedAddress": "2 Chome-24-12 Shibuya, Shibuya City, Tokyo 150-0002日本",
        "types": [
            "shopping_mall",
            "point_of_interest",
            "establishment"
        ]
    },
    {
        "place_id": "ChIJU6FXN6iMGGAR0fe6KiMxQm8",
        "name": "澀谷中心街",
        "geometry": {
            "lat": 35.6600456,
            "lng": 139.6997833
        },
        "formattedAddress": "12-3 Udagawacho, Shibuya City, Tokyo 150-0042日本",
        "types": [
            "tourist_attraction",
            "point_of_interest",
            "establishment"
        ]
    },
    {
        "place_id": "ChIJcyH-4qiMGGARGzk4lZCx2xo",
        "name": "澀谷PARCO",
        "geometry": {
            "lat": 35.6620484,
            "lng": 139.6987767
        },
        "formattedAddress": "15-1 Udagawacho, Shibuya City, Tokyo 150-8377日本",
        "types": [
            "shopping_mall",
            "point_of_interest",
            "establishment"
        ]
    },
    {
        "place_id": "ChIJIy1S0_mJGGAR2d0UgvPKUPg",
        "name": "鋼彈Base 東京",
        "geometry": {
            "lat": 35.6254768,
            "lng": 139.7761383
        },
        "formattedAddress": "日本〒135-0064 Tokyo, Koto City, Aomi, 1 Chome−1−10 ダイバーシティ東京 プラザ７F",
        "types": [
            "tourist_attraction",
            "museum",
            "store",
            "point_of_interest",
            "establishment"
        ]
    }
];
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
</style>