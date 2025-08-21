import axios from 'axios'
import { store } from '../redux/store'
import { logoutUser } from '../redux/middleware/auth'
import { secureStore } from './secure-store'
import auth from '../services/auth'

export let baseURL = 'http://10.222.4.45:8080/api'; // mutable outside Redux

export const setBaseUrl = (url: string) => {
  baseURL = `http://${url}:8080/api`; // or use HTTPS if needed
};

const axiosInstance = axios.create({})

// Request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        config.baseURL = baseURL;
        const isAuthRoute = config.url?.startsWith('/auth')
        if (!isAuthRoute) {
            const token = await secureStore.getAccessToken()
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor
axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response?.status === 403 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/refresh')
        ) {
            originalRequest._retry = true

            try {
                const newAccessToken = await auth.refreshAccessToken()
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                logoutUser()
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance