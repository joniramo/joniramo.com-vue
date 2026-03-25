<template>
  <div class="social-links">
    <ul>
      <li v-for="link in socialLinks" :key="link.alt">
        <a :href="link.url" :aria-label="link.alt" v-html="link.icon" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import githubIcon from "../assets/github.svg?raw";
import linkedinIcon from "../assets/linkedin.svg?raw";
import blueskyIcon from "../assets/bluesky.svg?raw";

const socialLinks = [
  { alt: "Github", icon: githubIcon, url: "https://github.com/joniramo" },
  {
    alt: "LinkedIn",
    icon: linkedinIcon,
    url: "https://www.linkedin.com/in/joniramo/",
  },
  {
    alt: "Bluesky",
    icon: blueskyIcon,
    url: "https://bsky.app/profile/joniramo.dev",
  },
];
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}

li {
  margin-right: 2rem;
}

a :deep(svg) {
  width: 1.5rem;
  height: 1.5rem;
  transition: fill 0.1s;
}

body.light {
  a :deep(svg) {
    fill: var(--text-light);
  }

  a:hover :deep(svg) {
    fill: var(--highlight-light);
  }
}

body.dark {
  a :deep(svg) {
    fill: var(--text-dark);
  }

  a:hover :deep(svg) {
    fill: var(--highlight-dark);
  }
}
</style>
