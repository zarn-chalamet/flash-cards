import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateCard from "@/views/CreateCard.vue";
import SingleView from "@/views/SingleView.vue";
import CreateQuiz from "@/views/CreateQuiz.vue";
import SingleQuizView from "@/views/SingleQuizView.vue";
import WelcomView from "@/views/WelcomView.vue";
import { getAuth } from "firebase/auth";
import AIGenerate from "@/views/AIGenerate.vue";
import EditView from "@/views/EditView.vue";
import SingleQuizEdit from "@/views/SingleQuizEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: WelcomView,
      beforeEnter(to, from, next) {
        const auth = getAuth();
        let user = auth.currentUser;
        if (!user) {
          next();
        } else {
          next({ name: "home", params: { bol: true } });
        }
      },
    },
    {
      path: "/home/:bol",
      name: "home",
      component: HomeView,
      props: true,
      beforeEnter(to, from, next) {
        const auth = getAuth();
        let user = auth.currentUser;
        if (user) {
          next();
        } else {
          next({ name: "Welcome" });
        }
      },
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
    {
      path: "/generate",
      name: "Ai-Generate",
      component: AIGenerate,
    },
    {
      path: "/edit-view",
      name: "Edit-View",
      component: EditView,
    },
    {
      path: "/edit-quizzes/:id",
      name: "Quiz-Edit",
      component: SingleQuizEdit,
      props: true,
    },
  ],
});

export default router;
