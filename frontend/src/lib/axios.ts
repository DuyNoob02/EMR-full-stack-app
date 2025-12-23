import axios from "axios";
import { useAuthStore } from "../features/auth/store/auth.store";


export const apiClient = axios.create({
    baseURL: '/api'
})

apiClient.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});