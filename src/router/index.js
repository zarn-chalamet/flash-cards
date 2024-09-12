import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateCard from "@/views/CreateCard.vue";
import SingleView from "@/views/SingleView.vue";
import CreateQuiz from "@/views/CreateQuiz.vue";
import SingleQuizView from "@/views/SingleQuizView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/create",
      name: "create",
      component: CreateCard,
    },
    {
      path: "/cards/:id",
      name: "single-view",
      component: SingleView,
      props: true,
    },
    {
      path: "/create-quiz",
      name: "create-quiz",
      component: CreateQuiz,
    },
    {
      path: "/quizs/:id",
      name: "single-quiz-view",
      component: SingleQuizView,
      props: true,
    },
  ],
});

export default router;
