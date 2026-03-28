import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
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
    
  }
});
