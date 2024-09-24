import axios from "axios";

export const BASE_URL = 'http://158.220.111.34:8086';

export const $axios = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
});



