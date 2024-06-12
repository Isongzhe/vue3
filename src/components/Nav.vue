<template>
    <nav>
        <div class="marker">
            <h2>Traveler 旅行者</h2>
            <p>簡單且快速的安排行程吧 !</p>
        </div>
    </nav>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Nav',
    // 其他選項...
});
</script>

<script setup lang="ts">
import { House } from '@element-plus/icons-vue';
</script>

<style scoped>
nav {
    border: 2px solid #000;
    color: #ffffff;
    background-color: #05203c;
    /* display: flex;
    justify-content: flex-start;
    align-items: center; */
    padding-left: 48px;
    font-weight: 700;
}

.marker {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    height: 40px;
    margin: 24px 0 24px 0;
}

.marker h2 {
    font-size: 32px;
    line-height: 1.25;
    text-align: start;
    letter-spacing: normal;
    margin-right: 16px;

}

.marker p {
    font-size: 24px;
    line-height: 1.25;
    text-align: start;
    letter-spacing: normal;

}

.director a {
    font-size: 24px;
    text-decoration: none;
    /* 移除下劃線 */
    color: inherit;
    /* 讓文字顏色繼承父元素的顏色 */
}
</style>