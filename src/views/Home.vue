<template>
  <div class="home">
    <img
      class="profile-picture"
      alt="Picture of Joni Rämö"
      src="../assets/joni-ramo-circle.png"
      loading="eager"
    />

    <h1>Welcome</h1>

    <p>
      This is the webpage of Joni Rämö, a software engineer with more than 10
      years of development and consulting experience.

      <br />
      <br />

      If you have a project I can help you with or you wish to hire me, feel
      free to <a href="mailto:joni.ramo@mailbox.org">send me an email</a> or
      <a href="https://www.linkedin.com/in/joniramo/">a message on LinkedIn</a>.

      <br />
      <br />

      Peace. ✌️
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
        "Software engineer with 10+ years of development and consulting experience in cloud-native web and mobile applications.",
    },
    { property: "og:title", content: "Joni Rämö" },
    {
      property: "og:description",
      content:
        "Software engineer with 10+ years of development and consulting experience in cloud-native web and mobile applications.",
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

.profile-picture {
  width: 7rem;
  height: 7rem;
}
</style>
