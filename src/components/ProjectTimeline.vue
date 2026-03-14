<template>
  <div class="timeline-wrapper">
    <LoadingIcon v-if="loading" />
    <p v-else-if="error" class="error">Failed to load projects.</p>
    <ul v-else class="timeline">
      <li v-for="project in projects" :key="project._id" class="timeline-item">
        <div class="dot" />
        <div class="content">
          <h3>{{ project.title }}</h3>
          <span class="meta">{{
            [formatRange(project.dateFrom, project.dateTo), project.company]
              .filter(Boolean)
              .join(" · ")
          }}</span>
          <p>{{ project.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import sanity from "../client";
import LoadingIcon from "./LoadingIcon.vue";
import type { Project } from "../types";

const projects = ref<Project[]>([]);
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
    projects.value = await sanity.fetch(
      `*[_type == "project"] | order(dateFrom desc) { _id, title, dateFrom, dateTo, company, description }`
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
  left: 0.45rem;
  top: 0.45rem;
  bottom: 0.2rem;
  width: 2px;
}

.timeline-item {
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 2rem;
}

.dot {
  position: absolute;
  left: 0;
  top: 0.3rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}

.content h3 {
  margin: 0 0 0.25rem;
}

.content p {
  margin: 0.25rem 0 0;
}

body.light .timeline::before {
  background-color: var(--faded-light);
}

body.light .dot {
  background-color: var(--highlight-light);
}

body.light .meta {
  color: var(--meta-light);
}

body.dark .timeline::before {
  background-color: var(--faded-dark);
}

body.dark .dot {
  background-color: var(--highlight-dark);
}

body.dark .meta {
  color: var(--meta-dark);
}
</style>
