import { createRouter, createWebHistory } from "vue-router";
import WebTab from "../components/WebTab.vue";

const routes = [
  {
    path: "/web",
    component: WebTab,
  },
  // Add other routes here for other tabs
  {
    path: "/:catchAll(.*)",
    redirect: "/web",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
