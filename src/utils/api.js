import axios from "axios";
import { BASE_URL } from ".";

// Initialize accessToken from localStorage
let accessToken = localStorage.getItem('iq-token');

export const $api = axios.create({
    baseURL: `${BASE_URL}/api/v1`
});

// setting up token interceptor for all requests
$api.interceptors.request.use(config => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});
