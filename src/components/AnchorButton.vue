<template>
  <div
    class="section-heading"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <slot />
    <button
      class="anchor-btn"
      :class="{ visible: hovered || copied, copied, fading }"
      @click="copy"
      title="Copy link to this section"
    >
      {{ copied ? "✓" : "#" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ anchor: string }>();

const hovered = ref(false);
const copied = ref(false);
const fading = ref(false);

function copy() {
  const url = `${window.location.origin}${window.location.pathname}#${props.anchor}`;
  navigator.clipboard.writeText(url);
  copied.value = true;
  fading.value = false;
  setTimeout(() => {
    fading.value = true;
    setTimeout(() => {
      copied.value = false;
      fading.value = false;
    }, 200);
  }, 1800);
}
</script>

<style scoped>
.section-heading {
  position: relative;
}

.anchor-btn {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-family: "PT Mono", monospace;
  font-size: 1.4rem;
  padding: 0 0.5rem;
  opacity: 0;
  transition:
    opacity 0.15s ease,
    color 0.15s ease;
}

.anchor-btn.visible {
  opacity: 1;
}

.anchor-btn.fading {
  opacity: 0;
}

body.light .anchor-btn {
  color: var(--highlight-light);
}

body.dark .anchor-btn {
  color: var(--highlight-dark);
}

@media (max-width: 768px) {
  .anchor-btn {
    display: none;
  }
}
</style>
