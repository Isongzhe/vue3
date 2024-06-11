// src/stores/useUserInfoStore.ts
import { defineStore } from "pinia";
import { reactive } from "vue";
import type { FormData, UserData, UserInfo, Place } from "@/types";
import { mockPlaceInfoList } from "@/api/mockPlaceInfoList";

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
  };

  const updateFormData = (data: Partial<FormData>) => {
    Object.assign(userInfo.formData, data);
  };
  const updatePlaceNameList = (data: string[]) => {
    userInfo.placesInfo.places_name = data;
  };
  const updatePlaceList = () => {
    userInfo.placesInfo.places = mockPlaceInfoList();
  };

  return {
    userInfo,
    updateUserData,
    updateFormData,
    updatePlaceNameList,
    updatePlaceList,
  };
});
