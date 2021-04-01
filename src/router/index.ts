import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Auth from "../views/Auth.vue";
import Login from "../views/Login.vue";
import Questions from "../views/Questions.vue";

import Statistic from "../views/Statistic.vue";
import StatisticItemView from "../views/StatisticItem.vue";

import MainApp from "../modules/MainApp.vue";
import StatisticModule from "../modules/StatisticModule.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    component: MainApp,
    children: [
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
    ],
  },
  {
    path: "/",
    component: StatisticModule,
    children: [
      {
        path: "statistic",
        name: "statistic",
        component: Statistic,
      },
      {
        path: "statistic/:id",
        name: "statistic.view",
        component: StatisticItemView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
