// hooks/usePlaceNameList.ts
import { ref } from "vue";
import { mockGoogleMapList } from "@/api/mockGoogleMapList";
import axios from "axios";

export default function () {
  // 定義places_name變數
  const places_name = ref<string[]>([]);

  // 假造API端口
  const fetchPlacesName = async () => {
    try {
      const response = await new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(mockGoogleMapList().places_name);
        }, 3000);
      });
      places_name.value = response;
      // console.log(places_name);
    } catch (error) {
      console.error("error", error);
    }
  };
  // 真實API端口
  const fetchPlacesNameAPI = async (url: string): Promise<void> => {
    try {
      const response = await axios.get(
        "http://192.168.172.20:8000/api/crawl_google_map",
        {
          params: {
            url: url,
          },
        }
      );
      // 假設API返回的數據結構與mockGoogleMapList一致
      places_name.value = response.data.places_name;
      console.log(places_name);
    } catch (error) {
      console.error("error", error);
    }
  };

  // 返回places_name變數和fetchPlacesName方法
  return {
    places_name,
    fetchPlacesName,
    fetchPlacesNameAPI,
  };
}
