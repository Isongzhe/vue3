// src/stores/useUserInfoStore.ts
import { defineStore } from "pinia";
import { reactive } from "vue";

// 定義表單接口
interface FormData {
  name: string;
  projectName: string;
}

export const useFormStore = defineStore("form", () => {
  const formData = reactive<FormData>({
    name: "",
    projectName: "",
  });

  const updateForm = (data: FormData) => {
    formData.name = data.name;
    formData.projectName = data.projectName;
  };

  const resetForm = () => {
    formData.name = "";
    formData.projectName = "";
  };

  return {
    formData,
    updateForm,
    resetForm,
  };
});
