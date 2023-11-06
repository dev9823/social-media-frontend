import axios from "axios";
import { getJwt } from "../service/authService";
import { BASE_URL } from "./config";

const token = getJwt();
export async function getData(url) {
  const response = await axios.get(`${BASE_URL}/api/${url}`, {
    headers: { Authorization: `JWT ${token}` },
  });
  return response.data;
}

export async function postData(url, data) {
  return await axios.post(`${BASE_URL}/${url}`, data, {
    headers: { Authorization: `JWT ${token}` },
  });
}

export async function putData(url, data) {
  return await axios.put(`${BASE_URL}/${url}`, data, {
    headers: { Authorization: `JWT ${token}` },
  });
}

export async function deleteData(url) {
  return await axios.delete(`${BASE_URL}/${url}`, {
    headers: { Authorization: `JWT ${token}` },
  });
}
