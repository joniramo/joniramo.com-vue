<template>
  <div class="cv">
    <h1>This is my <span class="highlight">Curriculum Vitae</span>.</h1>

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

    <div class="work-experience">
      <AnchorButton anchor="work-experience">
        <h2 id="work-experience">Work experience</h2>
      </AnchorButton>

      <br />

      <ExperienceTimeline />
      <a
        href="https://www.linkedin.com/in/joniramo/"
        class="router-link-active back"
        >view more >></a
      >
    </div>

    <div class="skills">
      <AnchorButton anchor="featured-skills">
        <h2 id="featured-skills">Featured skills</h2>
      </AnchorButton>

      <br />

      <SkillBarChart />
    </div>

    <div class="projects">
      <AnchorButton anchor="featured-projects">
        <h2 id="featured-projects">Featured projects</h2>
      </AnchorButton>
      <p>Some of the projects I've worked on.</p>

      <br />

      <ProjectTimeline />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue";
import ExperienceTimeline from "../components/ExperienceTimeline.vue";
import ProjectTimeline from "../components/ProjectTimeline.vue";
import SkillBarChart from "../components/SkillBarChart.vue";
import AnchorButton from "../components/AnchorButton.vue";

const siteUrl = import.meta.env.VITE_SITE_URL;

useHead({
  title: "CV – Joni Rämö",
  meta: [
    {
      name: "description",
      content:
        "Joni Rämö's CV — software professional with 10+ years of experience in cloud-native web and mobile development.",
    },
    { property: "og:title", content: "CV – Joni Rämö" },
    {
      property: "og:description",
      content:
        "Joni Rämö's CV — software professional with 10+ years of experience in cloud-native web and mobile development.",
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

body.light .highlight {
  color: var(--highlight-light);
}

body.dark .highlight {
  color: var(--highlight-dark);
}

.intro,
.work-experience,
.skills {
  margin-bottom: 4rem;
}

.banner {
  width: 100%;
  height: 300px;
  object-fit: cover;
  filter: grayscale(100%);
}
</style>
