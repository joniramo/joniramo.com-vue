<template>
  <div class="timeline-wrapper">
    <LoadingIcon v-if="loading" />
    <p v-else-if="error" class="error">Failed to load projects.</p>
    <ul v-else class="timeline">
      <li v-for="project in projects" :key="project._id" class="timeline-item">
        <span class="symbol">{{ project.symbol }}</span>
        <div class="content">
          <h3>{{ project.title }}</h3>
          <span class="meta">{{
            formatRange(project.dateFrom, project.dateTo)
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
      `*[_type == "project"] | order(dateFrom desc) { _id, title, dateFrom, dateTo, company, description, symbol }`
    );
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.timeline-item {
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 2rem;
}

.symbol {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 1.4rem;
  line-height: 1;
}

.content h3 {
  margin: 0 0 0.25rem;
}

.content p {
  margin: 0.25rem 0 0;
}

.meta {
  font-size: 0.8rem;
}

body.light .meta {
  color: var(--meta-light);
}

body.dark .meta {
  color: var(--meta-dark);
}
</style>
