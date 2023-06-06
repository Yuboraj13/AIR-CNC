import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

export const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    // 1. intercept request (client to server)
    axiosSecure.interceptors.request.use((config) => {
      const token = `Bearer ${localStorage.getItem("access-token")}`;
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    });

    // 2. intercept response (server to client)
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          (error.response && error.response.status === 401) ||
          error.response.status === 401
        ) {
          await logout();
          navigate("/login");
        }
        return Promise.reject(error)
      }
    );
  }, [logout, navigate, axiosSecure]);

  return [axiosSecure];
};
