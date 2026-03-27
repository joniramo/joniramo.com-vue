<template>
  <div class="timeline-wrapper">
    <LoadingIcon v-if="loading" />
    <p v-else-if="error" class="error">Failed to load projects.</p>
    <ul v-else class="timeline">
      <li v-for="project in projects" :key="project._id" class="timeline-item">
        <div class="content">
          <h3>
            <span class="symbol">{{ project.symbol }}</span>
            {{ project.title }}
          </h3>
          <div class="meta">
            <span class="date">{{
              formatRange(project.dateFrom, project.dateTo)
            }}</span>
            · {{ formatDuration(project.dateFrom, project.dateTo) }}
          </div>
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
import { formatRange, formatDuration } from "../utils/dates";

const projects = ref<Project[]>([]);
const loading = ref(true);
const error = ref(false);

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
  margin-bottom: 2rem;
}

.symbol {
  padding-right: 0.5rem;
}

.content h3 {
  margin: 0 0 0.25rem;
}

.content p {
  margin: 0.25rem 0 0;
}

.meta {
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

body.light .meta {
  color: var(--meta-lighter);

  .date {
    color: var(--meta-light);
  }
}

body.dark .meta {
  color: var(--meta-darker);

  .date {
    color: var(--meta-dark);
  }
}
</style>
