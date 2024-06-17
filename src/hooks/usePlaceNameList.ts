// hooks/usePlaceNameList.ts
import { ref } from "vue";
import { mockGoogleMapList } from "@/api/mockGoogleMapList";
import type { GoogleMapListNameResponse } from "@/types";
// import axios from "axios";

export default function () {
  // 定義places_name變數
  const places_name = ref<string[]>([]);

  // 假造API端口
  const fetchPlacesName = async () => {
    try {
      const res = await new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(mockGoogleMapList().places_name);
        }, 3000);
      });
      places_name.value = res;
      console.log(places_name);
    } catch (error) {
      console.error("error", error);
    }
  };

  // 返回places_name變數和fetchPlacesName方法
  return {
    places_name,
    fetchPlacesName,
  };
}
