// src/stores/locationStore.ts
import { defineStore } from "pinia";

export const useLocationStore = defineStore("location", {
  state: () => ({
    locations: [
      {
        date: "6/23",
        locations: [
          { name: "成田機場", lat: 35.7768, lng: 140.3181 },
          { name: "東京塔", lat: 35.6586, lng: 139.7454 },
          { name: "淺草寺", lat: 35.7148, lng: 139.7967 },
          { name: "帝國飯店東京", lat: 35.6706, lng: 139.7528 },
        ],
      },
      {
        date: "6/24",
        locations: [
          { name: "帝國飯店東京", lat: 35.6706, lng: 139.7528 },
          { name: "東京國立博物館", lat: 35.7188, lng: 139.7766 },
          { name: "東京晴空塔", lat: 35.7101, lng: 139.8107 },
          { name: "上野公園", lat: 35.7155, lng: 139.774 },
          { name: "帝國飯店東京", lat: 35.6706, lng: 139.7528 },
        ],
      },
      {
        date: "6/25",
        locations: [
          { name: "帝國飯店東京", lat: 35.6706, lng: 139.7528 },
          { name: "東京迪士尼樂園", lat: 35.6329, lng: 139.8804 },
          { name: "帝國飯店東京", lat: 35.6706, lng: 139.7528 },
        ],
      },
      {
        date: "6/26",
        locations: [
          { name: "帝國飯店東京", lat: 35.6706, lng: 139.7528 },
          { name: "新宿御苑", lat: 35.6852, lng: 139.7101 },
          { name: "明治神宮", lat: 35.6764, lng: 139.6993 },
          { name: "代代木公園", lat: 35.6715, lng: 139.6941 },
          { name: "成田機場", lat: 35.7768, lng: 140.3181 },
        ],
      },
    ],
  }),
});
