<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <div class="navbar bg-base-300">
        <div class="navbar-start"></div>
        <div class="navbar-center">
          <RouterLink to="/" class="btn btn-ghost normal-case text-xl"
            >Anasayfa</RouterLink
          >
          <RouterLink to="/istatistikler" class="btn btn-ghost normal-case text-xl"
            >İstatistikler</RouterLink
          >
        </div>
        <div class="navbar-end"></div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style>

</style>
