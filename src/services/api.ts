import axios from 'axios';
import store from '../redux/store';

// Set up the base URL for the API
//const baseURL = 'http://43.248.241.252:8095'; // Replace with your actual base URL
//const baseURL = 'http://127.0.0.1:8000'
//const baseURL ='http://103.217.247.201/'

const baseURL = 'https://api.smartgrader.live';

const axiosApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add Bearer token before sending the request
axiosApi.interceptors.request.use(
  (config) => {
    // Retrieve the access token from Redux store or localStorage
    const state = store.getState();
 
    const token =
      state?.auth?.token ||
      localStorage.getItem('access_token'); 

    console.log("Token from Redux store or localStorage:", token);

    // If the token exists, add it to the request headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.log("No token found.");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosApi;
