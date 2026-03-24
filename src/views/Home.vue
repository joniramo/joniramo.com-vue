<template>
  <div class="home">
    <div class="intro">
      <h1>Joni Rämö</h1>

      <div class="intro-paragraph">
        <p>
          I'm Joni, a full-stack software engineer. I'm interested in
          contributing to projects where I can expand my knowledge and express
          my creativity. Where the team and stakeholders share a common goal in
          making a great product that brings real value to its users.

          <br />
          <br />

          In my free time, you may find me working on my personal software
          projects, punishing iron at the gym, out on a jog or enjoying the
          world of video games.
        </p>
      </div>
    </div>

    <img
      class="profile-picture"
      alt="Picture of Joni Rämö"
      src="../assets/joni-ramo-circle.png"
      loading="eager"
    />
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
h1 {
  font-family: "Gerion", sans-serif;
  font-size: 3.25rem;
  letter-spacing: normal;
  text-transform: none;
  margin-top: 0;
  position: relative;
  overflow: hidden;
}

body.light {
  h1 {
    color: var(--highlight-dark);
    text-shadow: 5px 5px 0px var(--highlight-light);
  }
}

body.dark {
  h1 {
    color: var(--highlight-light);
    text-shadow: 5px 5px 0px var(--highlight-dark);
  }
}

.home {
  max-width: 50rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 3rem;
}

.profile-picture {
  width: 15rem;
  height: 15rem;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  h1 {
    font-size: 4rem;
  }

  .home {
    flex-direction: column;
    align-items: center;
  }

  .profile-picture {
    width: 90%;
    max-width: 22rem;
    height: auto;
  }
}
</style>
