import { createRouter, createWebHistory } from "vue-router";
import WebTab from "../components/WebTab.vue";
import CountryTab from "../components/CountryTab.vue";
import FacebookTab from "../components/FacebookTab.vue";

const routes = [
  {
    path: "/web",
    component: WebTab,
  },
  {
    path: "/flag",
    component: CountryTab,
  },
  {
    path: "/fb",
    component: FacebookTab,
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
