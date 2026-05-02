import { defineStore } from "pinia";
import axiosInstance from "../plugins/axios";
import { handleError } from "@/helpers/errorHelper";
import router from "@/router";

export const useProfileStore = defineStore("profile", {
    state: () => ({
        profile: null,
        meta: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
        },
        loading: false,
        error: null,
        success: null
    }),
    actions: {
        async fetchProfile(id = null) {
            this.loading = true

            try {
                const response = await axiosInstance.get(id ? `profile/${id}` : 'profile')

                this.profile = response.data.data
                return response.data.data
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },

        async createProfile(payload) {
            this.loading = true
            try {
                const response = await axiosInstance.post('profile', payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                this.success = response.data.message
                router.push({ name: 'profile' })
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },

        async updateProfile(payload) {
            this.loading = true
            this.error = null

            try {
                const response = await axiosInstance.post(`profile/${payload.id}`, {
                    ...payload,
                    _method: 'PUT'
                })

                this.profile = response.data.data ?? this.profile
                this.success = response.data.message

                router.push({ name: 'profile' })
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        }
    },



})
