import Axios from "axios";

let urls = {
  development: "http://localhost:8090/",
  production: "http://localhost:8090/",
};

const api = Axios.create({
  baseURL: urls.production,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
