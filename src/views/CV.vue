<template>
  <div class="cv">
    <img
      class="profile-picture"
      alt="Picture of Joni Rämö"
      src="../assets/joni-ramo-circle.png"
      loading="eager"
    />
    <p class="intro">
      Hello! My name is Joni Rämö, a software professional with over 10 years of
      development and consulting experience.

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
    </p>

    <div class="projects">
      <h2>Featured projects</h2>
      <p>These are the most impactful projects from my career.</p>

      <br />

      <ProjectTimeline />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectTimeline from "../components/ProjectTimeline.vue";
</script>

<style scoped>
.cv {
  max-width: 45rem;
  margin: 0 auto;
}

.profile-picture {
  width: 7rem;
  height: 7rem;
}

.projects {
  margin-top: 4rem;
}

.banner {
  width: 100%;
  height: 300px;
  object-fit: cover;
  filter: grayscale(100%);
}
</style>
