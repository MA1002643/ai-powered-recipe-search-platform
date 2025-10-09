import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/pages/Home.vue";
import Feed from "../views/pages/Feed.vue";
import Dashboard from "../views/pages/Dashboard.vue";
import Login from "../views/pages/Login.vue";
import Signup from "../views/pages/Signup.vue";
import Recipe from "../views/pages/Recipe.vue";
import NewRecipe from "../views/pages/RecipeCreate.vue"

const ifAuthenticated = (to,from,next) => {
  const loggedIn = localStorage.getItem("session_token");
  if (loggedIn) {
      next()
      return
  }
  next('/login')
  alert("Need to be logged in to access")
}

const routes = [
  { path: "/", component: Home },
  { path: "/feed", component: Feed },
  { path: "/recipes/:id", component: Recipe},
  { path: "/dashboard", component: Dashboard, beforeEnter: ifAuthenticated },
  { path: "/createRecipe", component: NewRecipe, beforeEnter: ifAuthenticated},
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
