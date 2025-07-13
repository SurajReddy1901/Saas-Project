import axios from 'axios';
import { getToken } from './auth';

const API = axios.create({ baseURL: 'https://inventory-backend-o680.onrender.com/api' });

API.interceptors.request.use((req) => {
    const token = getToken();
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;
