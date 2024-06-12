<template>
    <div class="HomePage">
        <div class="infoTextArea">
            <h3>這是一個輕量化的網站，專為用戶規劃日本旅行而設計</h3>
            <h3>導入您的Google地圖清單，快速生成每日行程規劃吧</h3>
        </div>
        <div class="userForm">
            <el-form-item label="用戶名稱: ">
                <el-input v-model="localFormData.name" />
            </el-form-item>
            <el-form-item label="旅行計畫名稱: ">
                <el-input v-model="localFormData.projectName" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">創建新專案</el-button>
            </el-form-item>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useUserInfoStore } from '@/stores/useUserInfoStore';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter(); //使用 router
const formStore = useUserInfoStore(); //使用 pinia store

// copy the form data from the store to the local form data 
// const localFormData = reactive({ ...formStore.userInfo }); //創建 formStore.formData 的淺拷貝。

// 只拷貝需要的屬性
const localFormData = reactive({
    name: formStore.userInfo.userData.name,
    projectName: formStore.userInfo.userData.projectName,
});
const isFormValid = () => {
    return localFormData.name && localFormData.projectName;
};

const onSubmit = (): void => {
    if (isFormValid()) {
        ElMessage({
            message: '用戶資料提交成功',
            type: 'success',
        })
        formStore.updateUserData(localFormData); //更新 pinia formData
        router.push('/form'); //導向到 form 頁面
    }
    else {
        ElMessage({
            message: '請填寫完整用戶資料',
            type: 'warning',
        })
    }
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
    margin: 20px auto;
}

.infoTextArea {
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translate(0, -50%);
    background-color: #05203c;
    opacity: 0.8;
    border-radius: 12px;
    padding: 20px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    /* border: 2px solid #ffffff; */
    box-shadow: 0 0 0 1px;
    border-radius: 12px;
    box-sizing: border-box;
    max-width: 600px;
}

.userForm {
    position: absolute;
    top: 50%;
    right: 8%;
    transform: translate(0, -50%);
    background-color: #05203c;
    opacity: 0.9;
    color: #ffffff;
    box-shadow: 0 0 0 1px;
    border-radius: 12px;
    max-width: 30%;
    height: 180px;
    padding: 20px;
    font-weight: 700;
    font-size: 16px;
    box-sizing: border-box;
    max-width: 300px;
}


.userForm:deep(.el-form-item__content) {
    display: flex;
    justify-content: center;
    width: 100%;
}

/* .inputForm>* {
    border: 3px solid #ffffff;
} */

.userForm:deep(.el-form-item__label) {
    color: #ffffff !important;
}

.userForm:deep(.el-button) {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 14px;
}
</style>