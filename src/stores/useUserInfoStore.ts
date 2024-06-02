// src/stores/useUserInfoStore.ts
import { defineStore } from "pinia";
import { reactive } from "vue";

interface TravelTime {
  start: string;
  end: string;
}

interface Airport {
  name: string;
  coordinates: [number, number];
}

interface FormData {
  googleMapURL: string;
  arrivalAirport: Airport;
  returnAirport: Airport;
  dateTimeRange: TravelTime;
  dateList: string[];
}

interface UserInfo {
  name: string;
  projectName: string;
  formData: FormData;
}

export const useUserInfoStore = defineStore("userInfo", () => {
  const userInfo = reactive<UserInfo>({
    name: "",
    projectName: "",
    formData: {
      googleMapURL: "",
      arrivalAirport: { name: "", coordinates: [0, 0] },
      returnAirport: { name: "", coordinates: [0, 0] },
      dateTimeRange: { start: "", end: "" },
      dateList: [],
    },
  });

  const updateUserInfo = (data: Partial<UserInfo>) => {
    Object.assign(userInfo, data);
  };

  const updateFormData = (data: Partial<FormData>) => {
    Object.assign(userInfo.formData, data);
  };

  const resetUserInfo = () => {
    userInfo.name = "";
    userInfo.projectName = "";
    userInfo.formData = {
      googleMapURL: "",
      arrivalAirport: { name: "", coordinates: [0, 0] },
      returnAirport: { name: "", coordinates: [0, 0] },
      dateTimeRange: { start: "", end: "" },
      dateList: [],
    };
  };

  return {
    userInfo,
    updateUserInfo,
    updateFormData,
    resetUserInfo,
  };
});
