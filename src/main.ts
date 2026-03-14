import { createApp } from "vue";
import { createHead } from "@unhead/vue/client";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
const head = createHead();

app.use(store).use(router).use(head).mount("#app");
