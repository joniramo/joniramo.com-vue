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
import { useHead } from "@unhead/vue";
import ProjectTimeline from "../components/ProjectTimeline.vue";

const siteUrl = import.meta.env.VITE_SITE_URL;

useHead({
  title: "CV – Joni Rämö",
  meta: [
    {
      name: "description",
      content:
        "CV of Joni Rämö — software professional with 10+ years of experience in cloud-native web and mobile development.",
    },
    { property: "og:title", content: "CV – Joni Rämö" },
    {
      property: "og:description",
      content:
        "CV of Joni Rämö — software professional with 10+ years of experience in cloud-native web and mobile development.",
    },
    { property: "og:url", content: `${siteUrl}/cv` },
    { property: "og:type", content: "website" },
  ],
  link: [{ rel: "canonical", href: `${siteUrl}/cv` }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Joni Rämö",
        url: siteUrl,
        jobTitle: "Software Developer",
        sameAs: [`${siteUrl}/cv`],
      }),
    },
  ],
});
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
