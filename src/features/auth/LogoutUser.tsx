import { useNavigate } from "react-router-dom"

export default function LogoutUser(){
  const navigate = useNavigate();
  localStorage.clear()
  navigate("/");

}