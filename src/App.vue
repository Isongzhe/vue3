<template>
    <div class="app">
        <Nav></Nav>
        <Container></Container>
    </div>
</template>

<script lang="ts" setup name="App">
// js/ts code
import { ref, onMounted } from 'vue';
// import Form from './components/Form.vue';
// import Person from './components/Person.vue';
// import List from './components/List.vue';

import Nav from './components/Nav.vue';
import Container from './components/Container.vue';
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