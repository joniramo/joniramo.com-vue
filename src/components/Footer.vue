<template>
  <footer>
    <div class="footer-content">
      <SocialLinks />
      <p class="email">
        Send me an email to <span class="highlight">joni</span> dot
        <span class="highlight">ramo</span> at
        <span class="highlight">mailbox</span> dot
        <span class="highlight">org</span>.
      </p>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.email {
  margin: 0;
  font-size: 0.7rem;
}

body.light .highlight {
  color: var(--highlight-light);
}

body.dark .highlight {
  color: var(--highlight-dark);
}

@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
  }
}
</style>
