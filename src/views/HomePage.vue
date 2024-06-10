<template>
    <div class="HomePage">
        <div class="inputForm">
            <el-form-item label="用戶名稱">
                <el-input v-model="localFormData.name" />
            </el-form-item>
            <el-form-item label="旅行計畫名稱">
                <el-input v-model="localFormData.projectName" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">創建新專案</el-button>
                <!-- <el-button @click="clearSubmit">清空專案</el-button> -->
            </el-form-item>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useUserInfoStore } from '@/stores/useUserInfoStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const formStore = useUserInfoStore();

// copy the form data from the store to the local form data 
// const localFormData = reactive({ ...formStore.userInfo }); //創建 formStore.formData 的淺拷貝。

// 只拷貝需要的屬性
const localFormData = reactive({
    name: formStore.userInfo.userData.name,
    projectName: formStore.userInfo.userData.projectName,
});

const onSubmit = () => {
    console.log('submit');
    console.log(localFormData);
    formStore.updateUserData(localFormData);
    router.push('/form');
};
</script>

<style scoped>
.HomePage {
    position: relative;
    background-image: url('https://www.hdwallpaper.nu/wp-content/uploads/2015/04/541326.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 300px;
    width: 98%;
    border-radius: 12px;
    margin: 0 auto;
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

:deep(.el-form-item__label) {
    color: #ffffff !important;
}

:deep(.el-button) {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
}
</style>