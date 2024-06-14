import axios from "axios";

const baseUrl = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

const headers = { "Content-Type": "application/json" };
const options = { headers: headers, withCredentials: true };

const ApiGetCall = (path) => {
  return axios
    .get(baseUrl + path, options)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

const ApiPostCall = (path, data) => {
  return axios
    .post(baseUrl + path, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

export { ApiGetCall, ApiPostCall, baseUrl };
