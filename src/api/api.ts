import axios from "axios";

export const Api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
});

if (typeof window !== "undefined") {
  Api.defaults.headers.common.Authorization = localStorage.token;
}

export const setAuthToken = (token: string) => {
  Api.defaults.headers.common.Authorization = token;
};
