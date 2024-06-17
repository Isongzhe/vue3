// src/stores/useUserInfoStore.ts
import { defineStore } from "pinia";
import { reactive } from "vue";
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
      name: "",
      projectName: "",
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

  const updateUserData = (data: Partial<UserData>) => {
    Object.assign(userInfo.userData, data);
    // localStorage.setItem("userData", JSON.stringify(userInfo.userData)); //存成本地端資料
    // ElMessage({
    //   message: "userData存成本地端資料成功",
    //   type: "success",
    // });
  };

  const updateFormData = (data: Partial<FormData>) => {
    Object.assign(userInfo.formData, data);
    // localStorage.setItem("formData", JSON.stringify(userInfo.formData)); //存成本地端資料
    // ElMessage({
    //   message: "formData存成本地端資料成功",
    //   type: "success",
    // });
  };
  const updatePlaceNameList = (data: string[]) => {
    userInfo.placesInfo.places_name = data;
  };
  // const updatePlaceList = (data: Place[]) => {
  //   userInfo.placesInfo.places = data;
  // };
  const updatePlaceList = (data: Place[]) => {
    userInfo.placesInfo.places = data;
    // localStorage.setItem("placesInfo", JSON.stringify(userInfo.placesInfo)); //存成本地端資料
    // ElMessage({
    //   message: "placesInfo存成本地端資料成功",
    //   type: "success",
    // });
  };

  return {
    userInfo,
    updateUserData,
    updateFormData,
    updatePlaceNameList,
    updatePlaceList,
  };
});
