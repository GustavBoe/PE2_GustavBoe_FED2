import { getFromLocalStorage } from "@/storage/localStorage";

//Endpoints
export const BASE_URL = "https://v2.api.noroff.dev";
export const HOLIDAZE_URL = `${BASE_URL}/holidaze`;

//Storage
export const accessToken = getFromLocalStorage("accessToken");
export const userName = getFromLocalStorage("userName");
export const API_KEY = import.meta.env.VITE_API_KEY;