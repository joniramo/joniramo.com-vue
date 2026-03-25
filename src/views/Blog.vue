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

    <div v-if="categories.length" class="categories">
      Categories:
      <button
        v-for="category in categories"
        :class="{ category, active: category._id === selectedCategoryId }"
        @click="() => handleCategoryClick(category._id)"
      >
        {{ hashtagify(category.title) }}
      </button>
    </div>

    <div v-if="posts.length" class="posts">
      <div v-for="post in filteredPosts" class="post" :key="post._id">
        <div class="tags">
          <span v-for="category in post.categories">{{
            hashtagify(category.title)
          }}</span>
        </div>
        <h2>
          <router-link :to="`/blog/${post.slug.current}`">
            {{ post.title }}
          </router-link>
        </h2>
        <span class="tagline">
          {{ getDateString(post.publishedAt) }}
        </span>
        <hr />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { useHead } from "@unhead/vue";

const siteUrl = import.meta.env.VITE_SITE_URL;

import sanity from "../client";
import LoadingIcon from "../components/LoadingIcon.vue";
import type { Category, Post } from "../types";
import { fadeIn } from "../utils/animations";
import { getDateString, sortAscendingByPublishedAt } from "../utils/dates";
import { hashtagify } from "../utils/string";

const loading: Ref<boolean> = ref(false);
const error: Ref<string | null> = ref(null);
const selectedCategoryId: Ref<string | null> = ref(null);
const categories: Ref<Category[]> = ref([]);
const posts: Ref<Post[]> = ref([]);

const categoryQuery = `*[_type == "category"]{
  _id,
  title,
}[0...25]`;
const postQuery = `*[_type == "post"]{
  _id,
  title,
  slug,
  categories[]->{
    _id,
    title
  },
  publishedAt
}[0...25]`;

function fetchData() {
  loading.value = true;
  error.value = null;

  Promise.all([sanity.fetch(categoryQuery), sanity.fetch(postQuery)]).then(
    ([categoryData, postData]) => {
      categories.value = categoryData;
      posts.value = postData.sort(sortAscendingByPublishedAt);
      loading.value = false;
    },
    (err) => {
      error.value = JSON.stringify(err);
      loading.value = false;
    }
  );
}

const filteredPosts = computed(() => {
  if (!selectedCategoryId.value) {
    return posts.value;
  }

  return posts.value.filter((post) =>
    post.categories?.some((c: Category) => c._id === selectedCategoryId.value)
  );
});

const handleCategoryClick = (id: string) => {
  if (id === selectedCategoryId.value) {
    selectedCategoryId.value = null;
  } else {
    selectedCategoryId.value = id;
  }
};

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
fadeIn();
</script>

<style scoped>
.blog {
  display: flex;
  flex-direction: column;
  max-width: 45rem;
  margin: 0 auto;
  text-align: left;
}

body.light .highlight {
  color: var(--highlight-light);
}

body.dark .highlight {
  color: var(--highlight-dark);
}

.back {
  align-self: flex-start;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

button.category {
  border: 1px solid var(--meta-light);
  border-radius: 2rem;
  background: transparent;
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  transition:
    0.2s background-color,
    0.2s color,
    0.2s border-color;
}

button.category:hover {
  background: var(--meta-dark);
  border-color: var(--meta-dark);
}

.posts {
  margin: 0 auto;
  max-width: 45em;
  width: 100%;
}

.post {
  box-sizing: border-box;
  margin-top: 3rem;
}

.post h2 {
  margin: 0.5rem 0;

  a {
    color: currentColor;
  }
}

.tags,
.tagline {
  color: var(--meta-light);
  gap: 0.5rem;
}

@media only screen and (max-width: 768px) {
  .blog {
    width: unset;
  }
}
</style>
