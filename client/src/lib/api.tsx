import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // your Express backend URL
    withCredentials: true,                // for sending cookies (auth, session)
});

export default api;
