import { ref } from "vue";
import { mockPlaceInfoList } from "@/api/mockPlaceInfoList";
import type { Place } from "@/types";
import axios from "axios";
import { ElMessage } from "element-plus";

export default function () {
  // 定義places變數
  let places = ref<Place[]>([]);

  // 假造API端口
  const fetchPlaces = async () => {
    try {
      const res = await new Promise<Place[]>((resolve) => {
        setTimeout(() => {
          resolve(mockPlaceInfoList());
        }, 2000);
      });
      places.value = res;
      console.log(places);
    } catch (error) {
      console.error("error", error);
    }
  };

  // 真實API端口
  const fetchPlacesAPI = async (placesName: string[]): Promise<void> => {
    const rawData: object = {
      places_name: placesName,
    };
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/place_info",
        rawData,
        requestOptions
      );
      places.value = response.data;

      // 檢查 places 是否有值
      if (places.value && places.value.length > 0) {
        ElMessage({
          message: "Google地圖清單資訊已成功讀取並寫入",
          type: "success",
        });
      } else {
        throw new Error("places.value is empty");
      }
      // console.log(places);
    } catch (error) {
      console.error("error", error);
      ElMessage({
        message: "Google地圖清單資訊讀取失敗，請聯繫開發者",
        type: "error",
      });
    }
  };

  return {
    places,
    fetchPlaces,
    fetchPlacesAPI,
  };
}
