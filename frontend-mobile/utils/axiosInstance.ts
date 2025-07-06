import axios from 'axios'
import { store } from '../redux/store'
import { logoutUser } from '../redux/middleware/auth'
import { secureStore } from './secure-store'
import auth from '../services/auth'

// baseURL: 'http://192.168.219.29:8080/api',
// 'http://10.0.2.2:8080/api'
const axiosInstance = axios.create({
    baseURL: 'http://10.109.47.29:8080/api',
})

// Request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
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