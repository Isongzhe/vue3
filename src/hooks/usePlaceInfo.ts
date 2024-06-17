// hooks/userPlaceList.ts
import { ref } from "vue";
import { mockPlaceInfoList } from "@/api/mockPlaceInfoList";
import type { Place } from "@/types";
import axios from "axios";

export default function () {
  // 定義places變數
  let places = ref<Place[]>([]);

  // 假造API端口
  const fetchPlaces = async () => {
    try {
      const res = await new Promise<Place[]>((resolve) => {
        setTimeout(() => {
          resolve(mockPlaceInfoList());
        }, 3000);
      });
      places.value = res;
      console.log(places);
    } catch (error) {
      console.error("error", error);
    }
  };

  // 真實API端口
  const fetchPlacesAPI = async (placesName: string[]) => {
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
      console.log(places);
    } catch (error) {
      console.error("error", error);
    }
  };
  return {
    places,
    fetchPlaces,
    fetchPlacesAPI,
  };
}
