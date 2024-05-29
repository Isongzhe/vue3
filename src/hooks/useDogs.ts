import { ref, reactive } from "vue";
import axios from "axios";
import { onMounted } from "vue";

// 把所有的內容封裝到一個函數中，並使用export default導出
export default function () {
  // 數據
  let dogList = reactive([
    "https://images.dog.ceo/breeds/pembroke/n02113023_4373.jpg",
  ]);

  // 方法
  // 獲取狗狗圖片，去第三方api獲取
  const getDog = async () => {
    try {
      const res = await axios.get(
        "https://dog.ceo/api/breed/pembroke/images/random"
      );
      dogList.push(res.data.message);
    } catch (error) {
      alert(error);
    }
  };

  // 載入時獲取狗狗圖片，呼叫第三方api
  onMounted(() => {
    getDog();
  });

  // 向外部暴露數據和方法
  return {
    dogList, // 數據
    getDog, // 方法
  };
}
