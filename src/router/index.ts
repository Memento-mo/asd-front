import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Auth from "../views/Auth.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "auth",
    component: Auth,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
