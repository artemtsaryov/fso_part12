import axios from "axios";
const baseUrl = "/api/users";

const buildTokenHeader = (token) => {
  return `bearer ${token}`;
};

const getAll = (token) => {
  const request = axios.get(baseUrl, {
    headers: { Authorization: buildTokenHeader(token) },
  });
  return request.then((response) => response.data);
};

const exportedApi = { getAll };

export default exportedApi;
