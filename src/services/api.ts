import axios from 'axios';
import store from '../redux/store';

// Set up the base URL for the API
//const baseURL = 'http://43.248.241.252:8095'; // Replace with your actual base URL
//const baseURL = 'http://127.0.0.1:8000/'
//const baseURL ='http://103.217.247.201'

const baseURL = 'https://roboguru.in/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add Bearer token before sending the request
api.interceptors.request.use(
  (config) => {
    // Retrieve the access token from Redux store first, then fall back to localStorage
   // const token = store.getState().auth.token || localStorage.getItem('mobile_access_token') || localStorage.getItem('social_access_token');
    const token = localStorage.getItem('access_token') ;
     
    
    // Log the token to ensure it's being retrieved correctly
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

export default api;
