<template>
  <div class="home">
    <h1>Welcome</h1>
    <p>
      You have discovered the website of Joni Rämö, a software developer with
      +{{ yearsOfExperience }} years of development and consulting experience.

      <br />
      <br />

      On this website you will find details of my developer career and my
      <router-link to="/blog">blog</router-link> where I discuss various
      technical and non-technical topics. Send me a message if you have an
      interesting project where I may help you or just to say hello!
    </p>

    <br />
    <br />

    <h2>Featured projects</h2>
    <p>These are the most impactful projects from my career.</p>

    <br />

    <ProjectTimeline />

    <br />

    <img
      alt="Picture of Joni Rämö"
      src="../assets/joni-ramo-circle.png"
      loading="eager"
    />
  </div>
</template>

<script setup lang="ts">
import ProjectTimeline from "../components/ProjectTimeline.vue";
const yearsOfExperience = new Date().getUTCFullYear() - 2016;
</script>

<style scoped>
.home {
  max-width: 45rem;
  margin: 0 auto;
}

img {
  width: 7rem;
  height: 7rem;
}
</style>
