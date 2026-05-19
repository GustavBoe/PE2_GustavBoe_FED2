import { useState } from "react";
import { Link} from "react-router-dom"
import {userName, accessToken, venueManager, userAvatar, placeholder} from "@/const/const"
import { Menu, X } from "lucide-react";


export default function Header(){
  const [isOpen, setIsOpen] = useState(false)
  /*const navigate = useNavigate();*/
  const isLoggedIn = ! !accessToken;
  /*const handleLogout = () => {
    localStorage.clear();
    navigate("/")
  }*/
  console.log(isLoggedIn)
  return(
   <nav className="flex flex-row items-center relative md:flex md:justify-between  h-15 border-b border-border text-primary">
    <div className="flex items-center justify-between px-7 w-full">
    <Link to={"/"} className="font-parkinsans text-3xl text-primary">
     Holidaze
    </Link>
    <div className="hidden md:flex items-center gap-6 ">
      {!isLoggedIn ? (
      <>
      <Link to={"/"} className="hover:underline hover:decoration-primary">Home</Link>
      <Link to={"/venues"} className="hover:underline hover:decoration-primary">Venues</Link> 
      <Link to={"/auth/register"} className="hover:underline hover:decoration-primary">Register</Link> 
      <Link to={"/auth/login"} className="hover:underline hover:decoration-primary">Login</Link>
      </>
      ) 
      : venueManager?
      (<>
      <Link to={"/"} className="hover:underline hover:decoration-primary">Home</Link>
        <Link to={"/venues"} className="hover:underline hover:decoration-primary"> All Venues</Link> 
         <Link to={"/venues"} className="hover:underline hover:decoration-primary"> My Venues</Link>
         <Link to={`/profile/${userName}/bookings`} className="hover:underline hover:decoration-primary"> My bookings</Link> 
         <div className="flex flex-row items-center md:gap-3">
         <Link to={`/profile/${userName}`} className="hover:underline hover:decoration-primary">{userName} </Link>
         <div className="rounded-full border border-primary overflow-clip">
          <img src={userAvatar || placeholder}  alt="profile image" className="w-12 h-12 object-cover"/>
         </div>
         
         </div>
         </> )
        :
         (<>
         <Link to={"/"} className="hover:underline hover:decoration-primary">Home</Link>
        <Link to={"/venues"} className="hover:underline hover:decoration-primary"> All Venues</Link> 
         <Link to={`/profile/${userName}/bookings`} className="hover:underline hover:decoration-primary"> My bookings</Link> 
         <div className="flex flex-row items-center gap-8">
         <Link to={`/profile/${userName}`} className="hover:underline hover:decoration-primary">{userName} </Link>
         <div className="rounded-full border border-primary overflow-clip">
          <img src={userAvatar || placeholder}  alt="profile image" className="w-12 h-12 object-cover"/>
         </div>
         
         </div>
         </> )
      }

    </div>
    <button className="md:hidden flex flex-col gap-2 pr-7" onClick={()=>setIsOpen(!isOpen)}>{!isOpen ? <Menu size={28}/> : <X size={28}/> }</button>
   </div>
   {isOpen && (
    <div className="md:hidden flex flex-col items-center absolute top-full gap-5 left-0 w-full z-50 bg-white border-t border-border">
      {!isLoggedIn ? ( 
      <div className="flex flex-col items-center text-center w-full">
        <Link to={"/"} className="w-full border-b border-border py-2" onClick={()=>setIsOpen(!isOpen)}>Home</Link> 
      <Link to={"/venues"} className="w-full border-b border-border py-2"onClick={()=>setIsOpen(!isOpen)}>Venues</Link> 
      <Link to={"/auth/register"} className="w-full border-b border-border py-2" onClick={()=>setIsOpen(!isOpen)}>Register</Link> 
      <Link to={"/auth/login"} className="w-full border-b border-border py-2" onClick={()=>setIsOpen(!isOpen)}>Login</Link>
      </div>
      )
      : 
      venueManager ? 
       (<div className="flex flex-col items-center text-center w-full">
        <Link to={"/"} className="w-full border-b border-border py-2" onClick={()=>setIsOpen(!isOpen)}>Home</Link> 
        <Link to={"/venues"} className="w-full border-b border-border py-2" onClick={()=>setIsOpen(!isOpen)}>All Venues</Link> 
        <Link to={`/profile/${userName}/venues`} className="w-full border-b border-border py-2" onClick={()=>setIsOpen(!isOpen)}> My Venues</Link>
        <Link to={`/profile/${userName}/bookings`} className="w-full border-b border-border py-2" onClick={()=>setIsOpen(!isOpen)}> My bookings</Link>
        <div className="flex flex-row items-center gap-4 py-2">
        <Link to={`/profile/${userName}`} onClick={()=>setIsOpen(!isOpen)}>{userName} </Link>
        <div className="rounded-full border-2 border-primary overflow-clip">
         <img src={userAvatar || placeholder}  alt="profile image" className="w-10 h-10 object-cover"/>
        </div>
        
        </div>
        </div> ) 
      : 
      (<>
      <Link to={"/"} className="w-full border-b border-border py-2" onClick={()=>setIsOpen(!isOpen)}>Home</Link> 
        <Link to={"/venues"} className="w-full border-b border-border py-2" onClick={()=>setIsOpen(!isOpen)}> All Venues</Link> 
         <Link to={`/profile/${userName}/bookings`} className="w-full border-b border-border py-2" onClick={()=>setIsOpen(!isOpen)}> My bookings</Link> 
         <div className="flex flex-row items-center gap-4 py-2">
         <Link to={`/profile/${userName}`} onClick={()=>setIsOpen(!isOpen)}>{userName} </Link>
         <div className="rounded-full border-2 border-primary overflow-clip">
          <img src={userAvatar || placeholder}  alt="profile image" className="w-10 h-10 object-cover"/>
         </div>
         
         </div>
         </> )}

    </div>
   )}
   </nav>
  )
}