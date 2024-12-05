import axios from "axios";
export const IMGURL = "http://localhost:8001/uploads/";

// http://localhost:9090/

const axiosInstance = axios.create({
  baseURL: "http://localhost:8001/api/v1/",
  // baseURL: "http://192.168.0.104:9090/api/v1",
  // timeout: 5000 // Set a timeout for requests (in milliseconds)
});


// Add an interceptor to include the Bearer token in the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token: any = localStorage.getItem("token");

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Set Content-Type to application/json

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
