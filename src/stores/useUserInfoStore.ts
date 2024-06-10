// src/stores/useUserInfoStore.ts
import { defineStore } from "pinia";
import { reactive } from "vue";
import type { FormData, UserData, UserInfo } from "@/types";

export const useUserInfoStore = defineStore("userInfo", () => {
  const userInfo = reactive<UserInfo>({
    userData: {
      name: "",
      projectName: "",
    },
    formData: {
      googleMapURL: "",
      airportList: {
        arrivalAirport: { name: "", coordinates: [0, 0] },
        returnAirport: { name: "", coordinates: [0, 0] },
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

  return {
    userInfo,
    updateUserData,
    updateFormData,
    updatePlaceNameList,
  };
});
