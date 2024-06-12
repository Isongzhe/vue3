import { ref, reactive } from "vue";

export default function () {
  // 數據
  let sum = ref(0);

  // 方法
  const add = () => {
    sum.value += 1;
  };

  // 向外部暴露數據和方法
  return {
    sum, // 數據
    add, // 方法
  };
}
