// hooks/usePlaceNameList.ts
import { ref } from "vue";
import { mockGoogleMapList } from "@/api/mockGoogleMapList";
import type { GoogleMapListNameResponse } from "@/types";
// import axios from "axios";

export default function () {
  const places_name = ref<string[]>([]);

  async function fetchPlacesName(): Promise<void> {
    try {
      console.log(`加載開始`);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 模擬5秒的延遲
      const mockData: GoogleMapListNameResponse = mockGoogleMapList();
      places_name.value = mockData.places_name;
      console.log(`加載完畢`);
    } catch (error) {
      console.log(error);
    }
  }
  return {
    places_name,
    fetchPlacesName,
  };
}
