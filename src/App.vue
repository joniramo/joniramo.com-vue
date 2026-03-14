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
  padding: 6rem 1rem;
  min-height: calc(100vh - 13rem);
  box-sizing: border-box;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
