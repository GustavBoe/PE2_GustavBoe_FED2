import { useNavigate } from "react-router-dom"
import {userName, accessToken} from "@/const/const"


export default function Header(){
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/")
  }
  return(
    <div className="flex flex-row h-20 items-center">
      <h1 className="text-primary text-4xl font-parkinsans">Holidaze</h1>
      {!userName || !accessToken ? null : <button onClick={handleLogout}>Log out</button>}

    </div>
  )
}