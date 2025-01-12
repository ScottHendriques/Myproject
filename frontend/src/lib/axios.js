import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://localhost:5001/api",
    withCredentials: true,      //for sending cookies with every request
})