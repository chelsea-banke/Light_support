import axios from 'axios'
import { localStore } from './localStore'
import { logoutUser } from '../redux/middleware/auth';
import {store} from '../redux/store'

export let baseURL = 'http://localhost:8080/api'; // mutable outside Redux

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
            const token = localStore.getAccessToken()
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
            error.response?.status === 403
        ) {
            console.log("logging out...");
            store.dispatch(logoutUser())
        }

        return Promise.reject(error)
    }
)

export default axiosInstance