import Axios from "axios";

let urls = {
  development: "http://localhost:8090/",
  production: "http://ec2-54-233-160-22.sa-east-1.compute.amazonaws.com:8090/",
};

const api = Axios.create({
  baseURL: urls.production,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
