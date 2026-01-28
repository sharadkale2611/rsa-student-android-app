import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Config from 'react-native-config';

const axiosClient: AxiosInstance = axios.create({
    baseURL: Config.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Example: attach token if available
        // const token = await AsyncStorage.getItem('token');
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    error => {
        console.log('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
