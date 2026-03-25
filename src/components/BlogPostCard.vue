<template>
  <router-link :to="`/blog/${post.slug.current}`">
    <div class="blog-post-card">
      <h2>
        {{ post.title }}
      </h2>
      <span class="date">
        {{ getDateString(post.publishedAt) }}
      </span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Post } from "../types";
import { getDateString } from "../utils/dates";

defineProps<{ post: Post }>();
</script>

<style scoped>
.blog-post-card {
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: 2rem;
  border-radius: 1rem;
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;
}

.blog-post-card:hover {
  transform: scale(1.02) translateY(0) translateZ(0);
}

body.light {
  .blog-post-card {
    background-color: var(--element-background-light);
    border: 1px solid var(--border-light);
  }

  .blog-post-card:hover {
    box-shadow: 0 0.5rem 0.75rem var(--shadow-light);
  }
}

body.dark {
  .blog-post-card {
    background-color: var(--element-background-dark);
    border: 1px solid var(--border-dark);
  }

  .blog-post-card:hover {
    box-shadow: 0 0.5rem 0.75rem var(--shadow-dark);
  }
}

.blog-post-card h2 {
  margin: 0.5rem 0;

  a {
    color: currentColor;
  }
}

.tags,
.date {
  gap: 0.5rem;
}

body.light {
  .tags,
  .date {
    color: var(--meta-light);
  }
}

body.dark {
  .tags,
  .date {
    color: var(--meta-dark);
  }
}
</style>
