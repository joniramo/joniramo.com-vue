<template>
  <footer>
    <div class="footer-content">
      <SocialLinks />
    </div>
  </footer>
</template>

<script setup lang="ts">
import SocialLinks from "../components/SocialLinks.vue";
</script>

<style scoped>
footer {
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 1rem 2rem;
  text-align: left;
  box-sizing: border-box;
}

.footer-content {
  max-width: 50rem;
  margin: 0 auto;
}

p {
  margin: 0;
  font-size: 0.875rem;
}
</style>
