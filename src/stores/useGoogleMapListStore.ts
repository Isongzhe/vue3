// stores/useGoogleMapListStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { mockGoogleMapList } from "@/api/mockGoogleMapList";

export const useGoogleMapStore = defineStore("googleMap", () => {
  const places = ref<string[]>([]);

  function fetchPlaces() {
    // 使用模擬的數據
    const mockData = mockGoogleMapList();
    places.value = mockData.places_name;
  }

  return {
    places,
    fetchPlaces,
  };
});
