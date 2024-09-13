<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainNav from './components/MainNav.vue';
import getUser from './composables/GetUser';


let {user} = getUser();
</script>

<template>
  <div v-if="user">
    <MainNav></MainNav>
  </div>
  <RouterView />
</template>

<style>

</style>
