<template>
  <div class="blog">
    <h1>Read my <span class="highlight">blog</span>, why don't you?</h1>

    <p v-if="loading" class="loading">
      <LoadingIcon />
    </p>
    <p v-if="error" class="error">
      <!-- {{ error }} -->
      Something went wrong 😰
    </p>

    <div v-if="posts.length" class="blog-posts">
      <BlogPostCard
        v-for="(post, index) in posts"
        :key="post._id"
        :post="post"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useHead } from "@unhead/vue";

const siteUrl = import.meta.env.VITE_SITE_URL;

import sanity from "../client";
import LoadingIcon from "../components/LoadingIcon.vue";
import BlogPostCard from "../components/BlogPostCard.vue";
import type { Post } from "../types";
import { sortAscendingByPublishedAt } from "../utils/dates";

const loading: Ref<boolean> = ref(false);
const error: Ref<string | null> = ref(null);
const posts: Ref<Post[]> = ref([]);

const postQuery = `*[_type == "post"]{
  _id,
  title,
  slug,
  publishedAt
}[0...25]`;

function fetchData() {
  loading.value = true;
  error.value = null;

  sanity.fetch(postQuery).then(
    (data) => {
      posts.value = data.sort(sortAscendingByPublishedAt);
      loading.value = false;
    },
    (err) => {
      error.value = JSON.stringify(err);
      loading.value = false;
    }
  );
}

useHead({
  title: "Blog – Joni Rämö",
  meta: [
    {
      name: "description",
      content:
        "Joni Rämö's blog — articles on software development, technology, and more.",
    },
    { property: "og:title", content: "Blog – Joni Rämö" },
    {
      property: "og:description",
      content:
        "Joni Rämö's blog — articles on software development, technology, and more.",
    },
    { property: "og:url", content: `${siteUrl}/blog` },
    { property: "og:type", content: "website" },
  ],
  link: [{ rel: "canonical", href: `${siteUrl}/blog` }],
});

fetchData();
</script>

<style scoped>
.blog {
  display: flex;
  flex-direction: column;
  max-width: var(--content-max-width);
  margin: 0 auto;
  text-align: left;
}

body.light .highlight {
  color: var(--highlight-light);
}

body.dark .highlight {
  color: var(--highlight-dark);
}

.blog-posts {
  width: 100%;
}

.blog-posts a {
  background-image: none; /* Removes underline animation. */
}

@media only screen and (max-width: 768px) {
  .blog {
    width: unset;
  }
}
</style>
