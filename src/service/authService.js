import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { postData } from "../utils/fetchData";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const tokenKey = "token";

export function register() {
  return useMutation((newUser) =>
    axios.post(`${BASE_URL}/auth/users/`, newUser)
  );
}

export function userLogin() {
  return useMutation(
    (user) => axios.post(`${BASE_URL}/auth/jwt/create`, user),
    {
      onSuccess: (data) => {
        localStorage.setItem(tokenKey, data.data.access);
      },
    }
  );
}

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

export function getCurrentUserId() {
  try {
    const jwt = jwtDecode(localStorage.getItem(tokenKey));
    return jwt.user_id;
  } catch (ex) {
    return null;
  }
}
