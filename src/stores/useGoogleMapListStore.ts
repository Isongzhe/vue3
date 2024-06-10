// stores/useGoogleMapStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { mockGoogleMapList } from "@/api/mockGoogleMapList";

export const useGoogleMapStore = defineStore("googleMap", () => {
  const places = ref<string[]>([]);

  async function fetchPlaces() {
    console.log(`加載開始`);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 模擬3秒的延遲
    // 3秒後拿到模擬的數據
    const mockData = mockGoogleMapList();
    places.value = mockData.places_name;
    console.log(`加載完畢`);
  }

  return {
    places,
    fetchPlaces,
  };
});
