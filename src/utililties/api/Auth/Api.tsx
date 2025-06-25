import axios from 'axios'
import { URLBase } from '../urlBase'
import Cookies from 'js-cookie'

const Api = axios.create({
    baseURL: URLBase,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    },
})

// Interceptor untuk menambahkan token ke header
Api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token')
    const xsrfToken = Cookies.get('XSRF-TOKEN')

    if (xsrfToken) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken)
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default Api
