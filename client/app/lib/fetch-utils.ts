import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api-v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new Event("force-logout"));
    }
    return Promise.reject(error);
  }
);

const postData = async <T>(endpoint: string, data: unknown): Promise<T> => {
  const response = await api.post(endpoint, data);
  return response.data;
};

const getData = async <T>(endpoint: string): Promise<T> => {
  const response = await api.get(endpoint);
  return response.data;
};

const updateData = async <T>(endpoint: string, data: unknown): Promise<T> => {
  const response = await api.put(endpoint, data);
  return response.data;
};

const deleteData = async <T>(endpoint: string): Promise<T> => {
  const response = await api.delete(endpoint);
  return response.data;
};

export { postData, getData, updateData, deleteData };
