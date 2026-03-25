<template>
  <div class="blog-post">
    <router-link class="back" to="/blog">
      {{ "<< go back" }}
    </router-link>

    <p v-if="loading" class="loading">
      <LoadingIcon />
    </p>
    <p v-if="error" class="error">
      <!-- {{ error }} -->
      There doesn't seem to be anything here 🤔
    </p>

    <div v-if="post" class="content">
      <h1>{{ post.title }}</h1>
      <img
        alt="Irrelevant header image for blog post"
        v-if="post.image"
        :src="getImageUrl(post.image).width(1080).url()"
      />

      <p class="date">Published on {{ getDateString(post.publishedAt) }}</p>
      <PortableText :value="blocks" :components="components" />
    </div>
  </div>
</template>

<script setup lang="ts">
import imageUrlBuilder from "@sanity/image-url";
import { PortableText, PortableTextComponents } from "@portabletext/vue";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import { computed, h, ref } from "vue";
import type { Ref } from "vue";
import { useHead } from "@unhead/vue";

const siteUrl = import.meta.env.VITE_SITE_URL;
import { useRoute } from "vue-router";

import sanity from "../client";
import LoadingIcon from "../components/LoadingIcon.vue";
import { fadeIn } from "../utils/animations";
import { getDateString } from "../utils/dates";
import type { Post } from "../types";

const loading = ref(false);
const error: Ref<string | null> = ref(null);
const post: Ref<Post | null> = ref(null);
const blocks = ref([]);

const query = `*[slug.current == $slug] {
  _id,
  title,
  slug,
  publishedAt,
  body,
 "image": mainImage{
    asset->{
      _id,
      url
    }
  }
}[0]
`;

function getImageUrl(source: any) {
  return imageUrlBuilder(sanity).image(source);
}

interface CodeNode {
  code: string;
  language?: string;
}

interface ImageNode {
  asset: { _ref: string; _type: string };
  alt?: string;
}

const components: PortableTextComponents = {
  types: {
    code: ({ value }: { value: CodeNode }) => {
      const highlightedCode = hljs.highlightAuto(value.code).value;

      return h("pre", { class: "hljs", style: "padding: 1rem;" }, [
        h("code", { innerHTML: DOMPurify.sanitize(highlightedCode) }),
      ]);
    },
    image: ({ value }: { value: ImageNode }) =>
      h("img", {
        src: value.asset ? getImageUrl(value.asset).width(1080).url() : "",
        alt: value.alt || "Somewhat relevant blog post image",
        style: "width: 100%;",
      }),
  },
};

function fetchData() {
  const route = useRoute();
  loading.value = true;
  sanity.fetch(query, { slug: route.params.slug }).then(
    (data) => {
      loading.value = false;
      post.value = data;
      blocks.value = data.body;
    },
    (err) => {
      console.log(err);
      error.value = `${err.name}: ${err.message}`;
      loading.value = false;
    }
  );
}

const pageTitle = computed(() =>
  post.value ? `${post.value.title} – Joni Rämö` : "Joni Rämö"
);
const pageDescription = computed(() => {
  if (!post.value) return "";
  const text = post.value.body
    ?.flatMap((b: any) => b.children?.map((c: any) => c.text) ?? [])
    .join(" ");
  return text ? text.slice(0, 155) : "";
});
const pageUrl = computed(
  () => `${siteUrl}/blog/${post.value?.slug?.current ?? ""}`
);
const pageImage = computed(() =>
  post.value?.image ? getImageUrl(post.value.image).width(1200).url() : ""
);

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: pageDescription },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: pageDescription },
    { property: "og:url", content: pageUrl },
    { property: "og:type", content: "article" },
    { property: "og:image", content: pageImage },
  ],
  link: [{ rel: "canonical", href: pageUrl }],
  script: computed(() =>
    post.value
      ? [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.value.title,
              datePublished: post.value.publishedAt,
              author: { "@type": "Person", name: "Joni Rämö" },
              url: pageUrl.value,
              ...(pageImage.value ? { image: pageImage.value } : {}),
            }),
          },
        ]
      : []
  ),
});

fetchData();
fadeIn();
</script>

<style scoped>
.loading {
  margin-top: 2rem;
}

.blog-post {
  text-align: left;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 45em;
  word-break: break-word;
}

.back {
  align-self: flex-start;
}

.content {
  margin-top: 2rem;
}

.date {
  font-size: 0.8rem;
  margin: 0 0 1.5rem;
}

body.light {
  .date {
    color: var(--meta-light);
  }
}

body.dark {
  .date {
    color: var(--meta-dark);
  }
}
</style>
