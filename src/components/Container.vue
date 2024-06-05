<template>
    <div class="container">
        <Home />
        <Form></Form>
        <Map></Map>
        <!-- <List></List> -->
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Container',
    // 其他選項...
});
</script>

<script lang="ts" setup>
import Home from '@/components/Home.vue';
import Form from '@/components/Form.vue';
// import List from '@/components/List.vue';
import Map from '@/components/Map.vue';

</script>

<style scoped>
.container>* {
    margin: 20px auto;
}
</style>