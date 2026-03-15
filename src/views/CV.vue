<template>
  <div class="cv">
    <h1>Curriculum Vitae</h1>

    <p class="intro">
      Software engineer with over 10 years of development and consulting
      experience.

      <br />
      <br />

      Specialized in developing cloud-native web and mobile applications using a
      combined approach of technical precision with a strategic mindset:
      solutions are not only effective but also scalable and sustainable in the
      long term. Delivering robust, efficient and human-understandable systems —
      especially now when AI agents are in the mix!

      <br />
      <br />

      Thrives in collaborative environments where work toward a shared goal
      happens closely with the team and key stakeholders. Actively builds
      high-performing teams where psychological safety and trust create impact.
      Motivated by opportunities to learn and improve continuously, and to pay
      it forward by mentoring others.
    </p>

    <div class="skills">
      <h2>Skills</h2>
      <p>
        A breakdown of the most important technologies and tools I've worked
        with.
      </p>

      <br />

      <SkillBarChart />
    </div>

    <div class="projects">
      <h2>Featured projects</h2>
      <p>
        A list of the most impactful projects of my career. This list is not
        exhaustive.
      </p>

      <br />

      <ProjectTimeline />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue";
import ProjectTimeline from "../components/ProjectTimeline.vue";
import SkillBarChart from "../components/SkillBarChart.vue";

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

.skills {
  margin-top: 4rem;
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
