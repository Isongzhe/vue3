<template>
    <div class="app">
        <!-- <Person></Person> -->
        <!-- <Form></Form> -->
        <List></List>
    </div>
</template>

<script lang="ts" setup name="App">
// js/ts code
import { ref, onMounted } from 'vue';
import Form from './components/Form.vue';
import Person from './components/Person.vue';
import List from './components/List.vue';
</script>

<style>
/* .app{
    background-color: #ddd;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    border-radius: 10px;
} */
</style>