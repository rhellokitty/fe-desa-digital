import { defineStore } from "pinia";
import axiosInstance from "../plugins/axios";
import { handleError } from "@/helpers/errorHelper";
import router from "@/router";

// useSocialAssistanceRecipientStores
export const useSocialAssistanceRecipientStores = defineStore("social-assistance-recipient", {
    state: () => ({
        SocialAssistanceRecipient: [],
        meta: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
        },
        loading: false,
        error: null,
        success: null,
    }),
    actions: {
        async fetchSocialAssistanceRecipientPaginated(params) {
            this.loading = true

            try {
                const response = await axiosInstance.get(`social-assistance-recipient`, { params })

                this.SocialAssistanceRecipient = response.data.data.data
                this.meta = response.data.data.meta
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        }
    }

})
