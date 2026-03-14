<template>
  <div class="home">
    <h1>Welcome</h1>

    <p>
      You have discovered the website of <b>Joni Rämö</b>, a software
      professional with +{{ yearsOfExperience }} years of development and
      consulting experience.

      <br />
      <br />

      I specialize in developing cloud-native web and mobile applications,
      primarily leveraging JavaScript and TypeScript technologies. My approach
      to development combines technical precision with a strategic mindset,
      ensuring solutions are not only optimal but also scalable and sustainable
      in the long term. My goal in every project is to deliver robust, efficient
      and human-understandable systems. (Especially now when AI agents are in
      the mix!)

      <br />
      <br />

      I thrive in collaborative environments where I can work closely with my
      team and key stakeholders toward a shared goal. I am motivated by
      opportunities to learn and improve continuously, regardless of the
      technology or application domain.

      <br />
      <br />

      On this website you will find details of my developer career and my
      <router-link to="/blog">blog</router-link> where I discuss various
      technical and non-technical topics. Send me a message if you have an
      interesting project where I may help you or just to say hello!
    </p>

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

.banner {
  width: 100%;
  height: 300px;
  object-fit: cover;
  filter: grayscale(100%);
}
</style>
