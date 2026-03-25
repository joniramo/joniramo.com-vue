<template>
  <div class="timeline-wrapper">
    <LoadingIcon v-if="loading" />
    <p v-else-if="error" class="error">Failed to load experience.</p>
    <ul v-else class="timeline">
      <li v-for="job in experience" :key="job._id" class="timeline-item">
        <component
          :is="job.companyUrl ? 'a' : 'div'"
          :href="job.companyUrl || undefined"
          :target="job.companyUrl ? '_blank' : undefined"
          :rel="job.companyUrl ? 'noopener noreferrer' : undefined"
          class="node"
        >
          <img
            v-if="job.logoUrl"
            :src="job.logoUrl"
            :alt="job.company"
            class="node-img"
          />
        </component>
        <div class="content">
          <h3>
            <span class="highlight">{{ job.title }}</span> at {{ job.company }}
          </h3>
          <span class="meta">
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
  companyUrl: string | null;
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
      `*[_type == "experience"] | order(dateFrom desc) { _id, title, company, dateFrom, dateTo, "logoUrl": logo.asset->url, companyUrl }`
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
  left: 1.5rem;
  top: 0.25rem;
  bottom: 0.5rem;
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
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.1s;
}

body.light .node:hover {
  box-shadow: 0 0 0 3px var(--highlight-light);

  .node-img {
    box-shadow: none;
  }
}

body.dark .node:hover {
  box-shadow: 0 0 0 3px var(--highlight-dark);

  .node-img {
    box-shadow: none;
  }
}

.node-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 0.25rem;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  transition: filter 0.1s;
}

.content h3 {
  margin: 0 0 0.25rem;
}

.meta {
  font-size: 0.8rem;
}

body.light {
  .timeline::before {
    background-color: var(--border-light);
  }

  .node {
    background-color: var(--highlight-light);
  }

  .meta {
    color: var(--meta-light);
  }

  .highlight {
    color: var(--highlight-light);
  }
}

body.dark {
  .timeline::before {
    background-color: var(--border-dark);
  }

  .node {
    background-color: var(--highlight-dark);
  }

  .meta {
    color: var(--meta-dark);
  }

  .highlight {
    color: var(--highlight-dark);
  }
}
</style>
