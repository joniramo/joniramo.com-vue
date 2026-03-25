<template>
  <label class="toggle">
    <input
      type="checkbox"
      :checked="isDarkTheme"
      @change="isDarkTheme = ($event.target as HTMLInputElement).checked"
    />
    <span class="slider round">
      <ToggleIconLight v-if="!isDarkTheme" />
      <ToggleIconDark v-if="isDarkTheme" />
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import ToggleIconLight from "./ToggleIconLight.vue";
import ToggleIconDark from "./ToggleIconDark.vue";

const DARK_THEME_KEY = "darkTheme";

// Get dark theme from localStorage
const getDarkTheme = (): boolean =>
  localStorage.getItem(DARK_THEME_KEY) === "true";
const isDarkTheme = ref(getDarkTheme());

// Apply theme to body
const applyTheme = (isDark: boolean) => {
  document.body.className = isDark ? "dark" : "light";
};

onMounted(() => {
  applyTheme(isDarkTheme.value);
  localStorage.setItem(DARK_THEME_KEY, String(isDarkTheme.value));
});

// If theme is toggled, apply and save to localStorage
watch(isDarkTheme, (newValue) => {
  applyTheme(newValue);
  localStorage.setItem(DARK_THEME_KEY, String(newValue));
});
</script>

<style>
.toggle {
  position: relative;
  width: 52px;
  height: 28px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border-light);
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

body.light .slider:before {
  background-color: var(--background-light);
}

body.dark .slider:before {
  background-color: var(--background-dark);
}

input:checked + .slider {
  background-color: var(--border-dark);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--border-dark);
}

input:checked + .slider:before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
