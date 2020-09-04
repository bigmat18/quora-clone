import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Question from "../views/Question.vue"
import QuestionEditor from "../views/QuestionEditor.vue"
import AnswerEditor from "../views/AnswerEditor.vue"
import NotFound from "../views/NotFound.vue";
// import Esempio from "../views/Esempio.vue";
// import About from "../views/About.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/question/:slug",
    name: "question",
    component: Question,
    props: true
  },
  {
    path: "/ask/:slug?",
    name: "question-editor",
    component: QuestionEditor,
    props: true
  },
  {
    path: "/answer/:id",
    name: "answer-editor",
    component: AnswerEditor,
    props: true
  },
  {
    path: "*",
    name: "page-not-found",
    component: NotFound
  }

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () =>
  //   //   import(/* webpackChunkName: "about" */ "../views/About.vue")
  //   component: About
  // }
  // {
  //   path: "/esempio",
  //   name: "Esempio",
  //   component: Esempio
  // }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
