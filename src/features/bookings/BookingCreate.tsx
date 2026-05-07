import { useState } from "react";
import { accessToken } from "@/const/const";

export default function BookingCreate(){
const [isLoggedIn, setIsLoggedIn] = useState(false)
if(accessToken){
  setIsLoggedIn(true)
}
if(isLoggedIn)return
}