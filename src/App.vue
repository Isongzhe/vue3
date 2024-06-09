<template>
    <div class="app">
        <Nav></Nav>
        <!-- <Container></Container> -->
        <router-view />
    </div>
</template>

<script lang="ts" setup name="App">
// js/ts code
import { ref, onMounted } from 'vue';
import Nav from './components/Nav.vue';
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    color: #ffffff;
}
</style>