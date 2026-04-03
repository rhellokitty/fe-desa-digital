import Auth from "@/layouts/Auth.vue";
import Main from "@/layouts/Main.vue";
import { useAuthStore } from "@/stores/auth";
import Dashboard from "@/views/Dashboard.vue";
import HeadOfFamilies from "@/views/head-of-family/HeadOfFamilies.vue";
import HeadOfFamily from "@/views/head-of-family/HeadOfFamily.vue";
import HeadOfFamilyCreate from "@/views/head-of-family/HeadOfFamilyCreate.vue";
import Login from "@/views/Login.vue";
import SocialAssistance from "@/views/social-assistance/SocialAssistance.vue";
import SocialAssistanceEdit from "@/views/social-assistance/socialAssistanceEdit.vue";
import SocialAssistances from "@/views/social-assistance/SocialAssistances.vue";
import Cookies from "js-cookie";
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
        {
          path: "head-of-family",
          name: "head-of-family",
          component: HeadOfFamilies,
          meta: {
            requiresAuth: true,
            permission: "head-of-family-list",
          },
        },
        {
          path: "head-of-family/:id",
          name: "manage-head-of-family",
          component: HeadOfFamily,
          meta: {
            requiresAuth: true,
            permission: "head-of-family-list"
          }
        },
        {
          path: "head-of-family/create",
          name: "create-head-of-family",
          component: HeadOfFamilyCreate,
          meta: {
            requiresAuth: true,
            permission: "head-of-family-create"
          }
        },
        {
          path: "social-assistance",
          name: "social-assistance",
          component: SocialAssistances,
          meta: {
            requiresAuth: true,
            permission: "social-assistance-list"
          }
        },
        {
          path: "social-assistance/:id",
          name: "manage-social-assistance",
          component: SocialAssistance,
          meta: {
            requiresAuth: true,
            permission: "social-assistance-list"
          }
        },
        {
          path: "social-assistance/edit/:id",
          name: "edit-social-assistance",
          component: SocialAssistanceEdit,
          meta: {
            requiresAuth: true,
            permission: "social-assistance-edit"
          }
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

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const token = Cookies.get("token");

  if (to.meta.requiresAuth) {
    if (authStore.token) {
      try {
        if (!authStore.user) {
          await authStore.checkAuth();
        }

        if (!authStore.user) {
          return { name: "Login" };
        }

        const userPermissions = authStore.user?.permissions || [];
        if (
          to.meta.permission &&
          !userPermissions.includes(to.meta.permission)
        ) {
          return { name: "Error 403" };
        }
        return true;
      } catch (error) {
        return { name: "Login" };
      }
    } else {
      return { name: "Login" };
    }
  } else if (to.meta.requiresUnauth && token) {
    return { name: "Dashboard" };
  }

  return true;
});

export default router;
