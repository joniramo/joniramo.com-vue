<template>
  <header>
    <Logo />
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/cv">CV</router-link>
      <router-link to="/blog">Blog</router-link>
    </nav>
    <ThemeToggle />
  </header>
</template>

<script setup lang="ts">
import Logo from "./Logo.vue";
import ThemeToggle from "./ThemeToggle.vue";
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  z-index: 2;
}

.logo {
  height: 2rem;
  width: 2rem;
}

nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 45rem;
  margin: 0 auto;
}

nav a {
  font-size: 0.875rem;
}

nav a.router-link-active,
nav a.router-link-exact-active {
  text-decoration: underline;
  text-decoration-thickness: 2px;
}
</style>
