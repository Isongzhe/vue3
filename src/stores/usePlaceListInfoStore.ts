// store/usePlaceListInfo.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { mockPlaceInfoList } from "@/api/mockPlaceInfoList";
import type { Place } from "@/types";

export const useGoogleMapStore = defineStore("googleMap", () => {
  const places = ref<Place[]>([]);

  function fetchPlaces() {
    // 使用模擬的數據
    const mockData = mockPlaceInfoList();
    places.value = mockData;
  }

  return {
    places,
    fetchPlaces,
  };
});
