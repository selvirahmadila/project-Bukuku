import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // sesuaikan dengan backend-mu
});

export default api;
