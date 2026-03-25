import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import BlogPost from "../views/BlogPost.vue";
import Blog from "../views/Blog.vue";
import CV from "../views/CV.vue";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cv",
    name: "CV",
    component: CV,
  },
  {
    path: "/blog",
    children: [
      {
        path: "",
        name: "Blog",
        component: Blog,
      },
      {
        path: "/blog/:slug",
        name: "BlogPost",
        component: BlogPost,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
