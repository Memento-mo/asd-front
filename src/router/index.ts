import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Auth from "../views/Auth.vue";
import Login from "../views/Login.vue";
import Questions from "../views/Questions.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    name: "auth",
    component: Auth,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/questions",
    name: "questions",
    component: Questions,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
