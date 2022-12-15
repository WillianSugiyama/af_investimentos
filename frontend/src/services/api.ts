import Axios from "axios";

let urls = {
  development: "http://localhost:8090/",
  production: "https://afinvestimentos-production.up.railway.app/",
};

const api = Axios.create({
  baseURL: urls.production,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
