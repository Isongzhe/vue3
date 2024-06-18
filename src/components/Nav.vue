<template>
    <nav>
        <div class="marker">
            <router-link to="/" class="router-link-block">
                <h2>Traveler 旅行者</h2>
            </router-link>
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
import { useRouter } from 'vue-router';
const router = useRouter(); //使用 router
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

/* 針對 <router-link> 元素設置 display: block */
.router-link-block {
    display: block;
    text-decoration: none;
    /* 移除默認下劃線 */
    color: inherit;
    /* 繼承父元素的文字顏色 */
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
</style>