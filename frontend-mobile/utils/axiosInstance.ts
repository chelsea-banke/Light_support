import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://10.0.2.2:8080/api', // Use the appropriate base URL for your backend
});

export default axiosInstance;