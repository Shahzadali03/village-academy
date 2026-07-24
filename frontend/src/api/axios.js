import axios from "axios";
import { BASE_URL } from "../Config";
import { useNavigate } from "react-router-dom";


const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status == 401) {
      console.log('Unauthorized! Redirecting...');
      window.location.href ='/login'
    }
    return Promise.reject(error);
  }
);

export default api;