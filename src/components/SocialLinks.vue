<template>
  <div class="social-links">
    <ul>
      <li v-for="link in socialLinks">
        <a :href="link.url">{{ link.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const socialLinks = [
  {
    label: "Github",
    url: "https://github.com/joniramo",
  },
  {
    label: "Stack Overflow",
    url: "https://stackoverflow.com/users/3451985/joniramo-dev",
  },
  {
    label: "Bluesky",
    url: "https://bsky.app/profile/joniramo.dev",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/joniramo/",
  },
  {
    label: "Email me!",
    url: "mailto:joni.ramo@mailbox.org",
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
</style>
