<template>
    <div class="app">
        <Person></Person>
    </div>
</template>

<script lang="ts">
// js/ts code
import Person from './components/Person.vue'
export default {
    name: 'App',
    components: {Person}
}
</script>

<style>
.app{
    background-color: #ddd;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    border-radius: 10px;
}
</style>