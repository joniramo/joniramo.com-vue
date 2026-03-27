<template>
  <div class="home">
    <div class="intro">
      <h1>Hi, my name is <span class="highlight">Joni</span>.</h1>

      <div class="intro-paragraph">
        <p>
          I'm a full-stack software engineer. I'm interested in contributing to
          projects where I can expand my knowledge and express my creativity.
          Where the team and stakeholders share a common goal in making a great
          product that brings real value to its users.

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
      @error="$el.style.color = 'inherit'"
    />
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue";

const siteUrl = import.meta.env.VITE_SITE_URL;

useHead({
  title: "Joni Rämö's Portfolio",
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
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 3rem;
}

body.light .highlight {
  color: var(--highlight-light);
}

body.dark .highlight {
  color: var(--highlight-dark);
}

.profile-picture {
  width: 15rem;
  height: 15rem;
  flex-shrink: 0;
  color: transparent;
}

@media (max-width: 768px) {
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
