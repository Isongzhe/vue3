// src/stores/useUserInfoStore.ts
import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { FormData, UserData, UserInfo, Place } from "@/types";
import { ElMessage } from "element-plus";

export const useUserInfoStore = defineStore("userInfo", () => {
  const defaultAirport: Place = {
    place_id: "",
    name: "",
    geometry: {
      lat: 0,
      lng: 0,
    },
    formattedAddress: "",
  };

  const userInfo = reactive<UserInfo>({
    userData: {
      name: "SUNG-CHE LIN",
      projectName: "日本行(測試)",
    },
    formData: {
      googleMapURL: "",
      airportList: {
        arrivalAirport: { ...defaultAirport },
        returnAirport: { ...defaultAirport },
      },
      dateTimeRange: { start: "", end: "" },
      dateList: [],
    },
    placesInfo: {
      places_name: [],
      places: [],
    },
  });
  // const allDatePlacesList = computed(() => {
  //   return userInfo.formData.dateList.map((date) => ({
  //     date,
  //     places: [] as Place[],
  //   }));
  // });
  // 初始化時包含機場的日期地點列表
  const allDatePlacesList = computed(() => {
    const airportsList = [
      userInfo.formData.airportList.arrivalAirport,
      userInfo.formData.airportList.returnAirport,
    ];

    // 建立空的日期地點列表
    const initialList: { date: string; places: Place[] }[] = [];

    // 根據 formData.dateList 的長度來初始化
    userInfo.formData.dateList.forEach((date, index) => {
      // 初始化地點為空的陣列
      const places: Place[] = [];

      // 如果是第一個日期，將 arrivalAirport 加到最前面
      if (index === 0) {
        places.unshift(airportsList[0]);
      }

      // 如果是最後一個日期，將 returnAirport 加到最後面
      if (index === userInfo.formData.dateList.length - 1) {
        places.push(airportsList[1]);
      }
      // 將日期地點加回到 initialList
      initialList.push({ date, places });
    });
    // 回傳初始化後的日期地點列表，也就是 allDatePlacesList
    return initialList;
  });

  const updateDatePlaces = (date: string, places: Place[]) => {
    const datePlace = allDatePlacesList.value.find(
      (item) => item.date === date
    );
    if (datePlace) {
      datePlace.places = places;
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    Object.assign(userInfo.userData, data);
    // localStorage.setItem("userData", JSON.stringify(userInfo.userData)); //存成本地端資料
    // ElMessage({
    //   message: "用戶資料存成本地端資料成功",
    //   type: "success",
    // });
  };

  const updateFormData = (data: Partial<FormData>) => {
    Object.assign(userInfo.formData, data);
    // localStorage.setItem("formData", JSON.stringify(userInfo.formData)); //存成本地端資料
    // ElMessage({
    //   message: "表單資訊存成本地端資料成功",
    //   type: "success",
    // });
  };
  const updatePlaceNameList = (data: string[]) => {
    userInfo.placesInfo.places_name = data;
  };

  //   userInfo.placesInfo.places = data;
  // };
  const updatePlaceList = (data: Place[]) => {
    userInfo.placesInfo.places = sortPlaces(data);
    // localStorage.setItem("placesInfo", JSON.stringify(userInfo.placesInfo)); //存成本地端資料
    // ElMessage({
    //   message: "地點資訊存成本地端資料成功",
    //   type: "success",
    // });
  };
  const sortPlaces = (places: Place[]): Place[] => {
    return places.sort((a, b) => {
      if (a.types?.includes("lodging") && !b.types?.includes("lodging")) {
        return -1;
      }
      if (!a.types?.includes("lodging") && b.types?.includes("lodging")) {
        return 1;
      }
      return 0;
    });
  };

  return {
    userInfo,
    allDatePlacesList,
    updateDatePlaces,
    updateUserData,
    updateFormData,
    updatePlaceNameList,
    updatePlaceList,
  };
});
