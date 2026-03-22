<template>
  <div class="timeline-wrapper">
    <LoadingIcon v-if="loading" />
    <p v-else-if="error" class="error">Failed to load experience.</p>
    <ul v-else class="timeline">
      <li v-for="job in experience" :key="job._id" class="timeline-item">
        <div class="node">
          <img
            v-if="job.logoUrl"
            :src="job.logoUrl"
            :alt="job.company"
            class="node-img"
          />
        </div>
        <div class="content">
          <h3>{{ job.title }}</h3>
          <span class="meta">
            <span class="company">{{ job.company }}</span> ·
            {{ formatRange(job.dateFrom, job.dateTo) }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import sanity from "../client";
import LoadingIcon from "./LoadingIcon.vue";

interface Experience {
  _id: string;
  title: string;
  company: string;
  dateFrom: string;
  dateTo: string | null;
  logoUrl: string | null;
}

const experience = ref<Experience[]>([]);
const loading = ref(true);
const error = ref(false);

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatRange(from: string, to: string | null): string {
  return `${formatDate(from)} – ${to ? formatDate(to) : "Present"}`;
}

onMounted(async () => {
  try {
    experience.value = await sanity.fetch(
      `*[_type == "experience"] | order(dateFrom desc) { _id, title, company, dateFrom, dateTo, "logoUrl": logo.asset->url }`
    );
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.timeline-wrapper {
  max-width: 45rem;
  margin: 0 auto;
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 1.25rem;
  top: 2.75rem;
  bottom: 0.2rem;
  width: 2px;
}

.timeline-item {
  position: relative;
  padding-left: 3.75rem;
  margin-bottom: 2rem;
}

.node {
  position: absolute;
  left: 0;
  top: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.node-img {
  width: 85%;
  height: 85%;
  object-fit: contain;
  border-radius: 0.25rem;
}

.content h3 {
  margin: 0 0 0.25rem;
}

body.light .timeline::before {
  background-color: var(--faded-light);
}

body.light .node {
  background-color: var(--highlight-light);
}

body.light .meta {
  color: var(--meta-light);
}

body.light .company {
  color: var(--highlight-light);
}

body.dark .timeline::before {
  background-color: var(--faded-dark);
}

body.dark .node {
  background-color: var(--highlight-dark);
}

body.dark .meta {
  color: var(--meta-dark);
}

body.dark .company {
  color: var(--highlight-dark);
}
</style>
