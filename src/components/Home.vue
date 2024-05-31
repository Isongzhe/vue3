<template>
    <div class="HomePage">
        <div class="inputForm">
            <p>請輸入您的旅遊計畫</p>
            <input type="text" value="">
            <button @click="">提交</button>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Home',
    // 其他選項...
});
</script>

<style scoped>
.HomePage {
    position: relative;
    background-image: url('https://www.hdwallpaper.nu/wp-content/uploads/2015/04/541326.jpg');
    background-size: cover;
    /* 將背景圖片置於元素的中心 */
    background-position: center;
    /* 防止背景圖片重複 */
    background-repeat: no-repeat;
    height: 300px;
    width: 98%;
    border-radius: 12px;
}

.inputForm {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translate(0, -50%);

    background-color: #05203c;
    opacity: 0.95;
    color: #ffffff;
    border: 2px solid #000;
    border-radius: 12px;
    width: 30%;
    padding: 20px;
    font-weight: 700;
}
</style>