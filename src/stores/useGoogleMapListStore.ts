// stores/useGoogleMapStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { mockGoogleMapList } from "@/api/mockGoogleMapList";

export const useGoogleMapStore = defineStore("googleMap", () => {
  const places_name = ref<string[]>([]);

  async function fetchPlacesName() {
    console.log(`加載開始`);
    await new Promise((resolve) => setTimeout(resolve, 10000)); // 模擬10秒的延遲
    // 3秒後拿到模擬的數據
    const mockData = mockGoogleMapList();
    places_name.value = mockData.places_name;
    console.log(`加載完畢`);
  }

  return {
    places_name,
    fetchPlacesName,
  };
});
