import { getFromLocalStorage } from "@/storage/localStorage";

//Endpoints
export const BASE_URL = "https://v2.api.noroff.dev";
export const HOLIDAZE_URL = `${BASE_URL}/holidaze`;

//Storage
export const accessToken = getFromLocalStorage("accessToken");
export const userName = getFromLocalStorage("userName");
export const API_KEY = import.meta.env.VITE_API_KEY;

//Failsafe urls
export const avatarFailsafe = "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400";
export const bannerFailsafe = "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500";