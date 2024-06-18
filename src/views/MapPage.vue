<template>
    <div>
        <!-- <el-tabs v-model="activeTab" class="nav-tabs"> -->
        <el-tabs v-model="activeTab" type="border-card" class="nav-tabs">
            <el-tab-pane name="Place" add-icon="calendar">
                <template #label>
                    <span class="custom-tabs-label">
                        <el-icon>
                            <Location />
                        </el-icon>
                        <span>清單景點地點</span>
                    </span>
                </template>
            </el-tab-pane>
            <el-tab-pane name="Plan" label="每日行程排程">
                <template #label>
                    <span class="custom-tabs-label">
                        <el-icon>
                            <Calendar />
                        </el-icon>
                        <span>每日行程排程</span>
                    </span>
                </template>
            </el-tab-pane>
            <router-view />
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Calendar, Location } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const activeTab = ref(route.name || 'plan')

// Watch for route changes to update the active tab
watch(
    () => route.name,
    (newName) => {
        activeTab.value = newName || 'plan'
    }
)

// Watch for activeTab changes to navigate to the corresponding route
watch(
    activeTab,
    (newTab) => {
        if (newTab) {
            router.push({ name: newTab })
        }
    }
)
</script>

<style scoped>
.nav-tabs {
    margin: 20px auto;
    max-width: 90%;
    justify-content: center;
    border-radius: 12px;
    overflow: hidden;
}

.custom-tabs-label {
    font-size: 16px;
}

.el-icon {
    margin-right: 5px;
}
</style>