import Axios from "axios";

let urls = {
  development: "http://localhost:8090/",
  production: "https://afbe.rehl-city.net/",
};

const api = Axios.create({
  baseURL: urls.production,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
