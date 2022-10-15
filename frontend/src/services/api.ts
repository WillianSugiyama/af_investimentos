import Axios from "axios";

let urls = {
  development: "http://localhost:8090/",
  production: "https://api.example.com/",
};

const api = Axios.create({
  baseURL: urls.development,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
