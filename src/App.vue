<template>
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import "./global.css";
</script>

<style>
main {
  padding: 6rem 2rem;
  min-height: calc(100vh - 10rem);
  box-sizing: border-box;
}

@media (max-width: 600px) {
  main {
    padding: 3rem 1.5rem;
  }
}
</style>
