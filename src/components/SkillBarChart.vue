<template>
  <div class="skill-chart-wrapper">
    <LoadingIcon v-if="loading" />
    <p v-else-if="error" class="error">Failed to load skills.</p>
    <ul v-else class="skill-chart">
      <li
        v-for="skill in sortedSkills"
        :key="skill._id"
        class="skill-row"
        @mouseenter="activeTooltip = skill._id"
        @mouseleave="activeTooltip = null"
      >
        <span class="skill-label">{{ skill.title }}</span>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" :style="{ width: skill.level + '%' }" />
          <div v-if="activeTooltip === skill._id" class="skill-tooltip">
            Joni has used {{ skill.title }} for {{ skill.level }}% of his
            career. That is approximately {{ yearsFor(skill.level) }} years of
            experience!
          </div>
        </div>
        <span class="skill-pct">{{ skill.level }}%</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import sanity from "../client";
import LoadingIcon from "./LoadingIcon.vue";
import type { Skill } from "../types";

const skills = ref<Skill[]>([]);
const loading = ref(true);
const error = ref(false);
const activeTooltip = ref<string | null>(null);

const sortedSkills = computed(() =>
  [...skills.value].sort((a, b) => b.level - a.level)
);

function yearsFor(level: number): number {
  const careerYears = new Date().getFullYear() - 2016;
  return Math.round(((careerYears * level) / 100) * 10) / 10;
}

onMounted(async () => {
  try {
    skills.value = await sanity.fetch(
      `*[_type == "skill"] { _id, title, level }`
    );
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.skill-chart {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-row {
  display: grid;
  grid-template-columns: 8rem 1fr 3rem;
  align-items: center;
  gap: 0.75rem;
  position: relative;
}

.skill-label {
  font-family: "PT Mono", monospace;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skill-bar-track {
  position: relative;
  height: 1rem;
  border-radius: 0.25rem;
  overflow: visible;
}

.skill-bar-fill {
  height: 100%;
  border-radius: 0.25rem;
  transition: width 0.4s ease;
}

.skill-pct {
  font-family: "PT Mono", monospace;
  font-size: 0.8rem;
  text-align: right;
}

.skill-tooltip {
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-family: "PT Mono", monospace;
  font-size: 0.75rem;
  padding: 0.4rem 0.65rem;
  border-radius: 0.25rem;
  pointer-events: none;
  z-index: 10;
}

body.light .skill-bar-track {
  background-color: var(--faded-light);
}

body.light .skill-bar-fill {
  background-color: var(--highlight-light);
}

body.light .skill-pct,
body.light .skill-label {
  color: var(--text-light);
}

body.light .skill-tooltip {
  background-color: var(--text-light);
  color: var(--background-light);
}

body.dark .skill-bar-track {
  background-color: var(--faded-dark);
}

body.dark .skill-bar-fill {
  background-color: var(--highlight-dark);
}

body.dark .skill-pct,
body.dark .skill-label {
  color: var(--text-dark);
}

body.dark .skill-tooltip {
  background-color: var(--text-dark);
  color: var(--background-dark);
}
</style>
