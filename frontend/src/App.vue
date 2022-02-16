<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Logo de Groupomania" class="logo" src="@/assets/images/logo-black.png" width="125" height="125" />
    <div class="nav-bar_wrapper">
      <nav>
        <RouterLink to="/"><fa class="home" icon="house" /></RouterLink>
        <RouterLink to="/Publication"><fa class="add-post" icon="circle-plus" /></RouterLink>
        <RouterLink to="/profile"><div class="user-profile"></div></RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style lang='scss'>
@import '@/assets/sass/style.scss';
</style>
