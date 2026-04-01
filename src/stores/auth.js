import router from "@/router";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { handleError } from "@/helpers/errorHelper";
import axiosInstance from "../plugins/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    success: null,
  }),
  getters: {
    token: (state) => Cookies.get("token"),
  },
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axiosInstance.post("/login", credentials);
        const token = response.data.token;
        Cookies.set("token", token, { expires: 7 });
        console.log("Token tersimpan:", Cookies.get("token"));
        this.success = "Login successful";
        await router.push({ name: "Dashboard" });
      } catch (error) {
        this.error = handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        await axiosInstance.post("/logout");

        Cookies.remove("token");

        router.push({ name: "Login" });
        this.user = null;
        this.error = null;

        this.success = "Logout successful";
      } catch (error) {
        this.error = handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async checkAuth() {
      if (!Cookies.get("token")) {
        this.user = null;
        return null;
      }
      this.loading = true;
      try {
        const response = await axiosInstance.get("/me");
        this.user = response.data.data;
        return this.user;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Cookies.remove("token");
          this.user = null;
          router.push({ name: "Login" });
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
