import axios from "axios";
import { URLBase } from "../urlBase";

const Api = axios.create({
    baseURL: URLBase,
});

// Interceptor untuk menambahkan token ke header
Api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default Api;