// store/usePlaceListInfo.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { mockPlaceInfoList } from "@/api/mockPlaceInfoList";
import type { Place } from "@/types";

export const usePlaceListInfoStore = defineStore("placeListInfo", () => {
  const places = ref<Place[]>([]);

  async function fetchPlaces(): Promise<void> {
    console.log(`加載開始`);
    await new Promise((resolve) => setTimeout(resolve, 5000)); // 模擬8秒的延遲
    // 3秒後拿到模擬的數據
    const mockData = mockPlaceInfoList();
    places.value = mockData;
    console.log(`加載完畢`);
  }
  return {
    places,
    fetchPlaces,
  };
});
