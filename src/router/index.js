import Auth from "@/layouts/Auth.vue";
import Main from "@/layouts/Main.vue";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Main,
      children: [
        {
          path: "/",
          name: "Dashboard",
          component: Dashboard,
          meta: {
            requiresAuth: true,
            permission: "dashboard-menu",
          },
        },
      ],
    },
    {
      path: "/login",
      component: Auth,
      children: [
        {
          path: "",
          name: "Login",
          component: Login,
          meta: {
            requiresUnauth: true,
          },
        },
      ],
    },
  ],
});

export default router;
