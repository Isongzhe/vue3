// hooks/userPlaceList.ts
import { ref } from "vue";
import { mockPlaceInfoList } from "@/api/mockPlaceInfoList";
import type { Place } from "@/types";
import axios from "axios";

export default function () {
  let places = ref<Place[]>([]);

  const fetchPlaces = async () => {
    try {
      //   const res = await axios.get(
      //     "https://dog.ceo/api/breed/pembroke/images/random"
      //   );
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 模擬8秒的延遲
      // 3秒後拿到模擬的數據
      const res = mockPlaceInfoList();
      places.value = res;
      console.log(places);
    } catch (error) {
      alert(error);
    }
  };
  //   const rawData = {
  //     places_name: [
  //       "amiami Akihabara Figure Tower",
  //       "Café de Raak",
  //       "淺草花月堂 雷門店",
  //       "amiami 秋葉原無線電會館店",
  //       "澀谷SCRAMBLE SQUARE",
  //       "澀谷中心街",
  //       "Diver City東京廣場",
  //       "Torinoirukafe Yanaka Honten",
  //       "Sofmap",
  //       "Google日本六本木辦公室",
  //       "OpenAI Japan合同会社",
  //       "仲見世商店街",
  //       "Unatoto Unagi",
  //       "駿河屋 秋葉原車站前店",
  //       "澀谷PARCO",
  //       "鋼彈Base 東京",
  //       "東京大學",
  //       "阿美橫丁",
  //       "UNDER RAILWAY HOTEL AKIHABARA",
  //       "東京車站",
  //       "日本科學未來館",
  //       "東京鐵塔",
  //       "淺草寺 雷門",
  //       "Animate 秋葉原店",
  //       "大井賽馬場",
  //     ],
  //   };

  //   const requestOptions = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   axios
  //     .post("http://127.0.0.1:8000/api/place_info", rawData, requestOptions)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  return {
    places,
    fetchPlaces,
  };
}
