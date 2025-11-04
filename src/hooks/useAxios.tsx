import axios from "axios";
import Constants from "expo-constants";

// import uuid from "react-native-uuid";

const useAxios = () => {
  const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl;

  const { logout } = useAuth();

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL ?? "https://api.grip-academy.ir",
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      "x-source": "client-native",
      "x-lang": "fa",
    },
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      let token = undefined;

        token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      console.log(error);

      return Promise.reject(error);
    }
  );

  axiosInstance?.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log("error", error.response.status);
      if (error.response.status === 401) {
        // handle invalid token
        console.log("Invalid token - logout user!");
        logout();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
