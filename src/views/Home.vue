<template>
  <div class="home">
    <h1>Welcome</h1>

    <p>
      You have discovered the website of <b>Joni Rämö</b>, a software
      professional with more than 10 years of development and consulting
      experience.

      <br />
      <br />

      You may be interested in my <router-link to="/cv">CV</router-link> or my
      <router-link to="/blog">blog</router-link> where I discuss various
      technical and non-technical topics. Let me know if there is something I
      can help you with. Or feel free just to say hello! 👋🏻
    </p>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue";

const siteUrl = import.meta.env.VITE_SITE_URL;

useHead({
  title: "Joni Rämö",
  meta: [
    {
      name: "description",
      content:
        "Software professional with 10+ years of development and consulting experience in cloud-native web and mobile applications.",
    },
    { property: "og:title", content: "Joni Rämö" },
    {
      property: "og:description",
      content:
        "Software professional with 10+ years of development and consulting experience in cloud-native web and mobile applications.",
    },
    { property: "og:url", content: `${siteUrl}/` },
    { property: "og:type", content: "website" },
  ],
  link: [{ rel: "canonical", href: `${siteUrl}/` }],
});
</script>

<style scoped>
.home {
  max-width: 45rem;
  margin: 0 auto;
}
</style>
