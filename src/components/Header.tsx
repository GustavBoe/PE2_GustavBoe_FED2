import { useRef, useState, useEffect } from "react";
import { Link} from "react-router-dom"
import {userName, accessToken, venueManager, userAvatar, placeholder} from "@/const/const"
import { Menu, X } from "lucide-react";



export default function Header(){
  const [isOpen, setIsOpen] = useState(false)
  const isLoggedIn = ! !accessToken;
  /*Hiding menu when clicking outside, gotten from google AI in google search and converted to typescript using ChatGPT */
  const wrapperRef = useRef<HTMLElement | null>(null);;
  useEffect(() => {
  function handleClickOutside() {
    setIsOpen(false);
  }

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);
  const headerStateVenues = "venues";
  const headerStateMyBookings = "bookings";
  const headerStateUpcoming = "upcoming";
 
  return(
   <nav ref={wrapperRef} className="flex flex-row items-center relative md:flex md:justify-between  h-15 border-b border-border text-primary">
    <div  className="flex items-center justify-between px-7 w-full text-xs">
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
      :venueManager ?
      (<>
      <Link to={"/"} className="hover:underline hover:decoration-primary">Home</Link>
        <Link to={"/venues"} className="hover:underline hover:decoration-primary"> All Venues</Link> 
         <Link to={`/profile/${userName}`} state={headerStateVenues} className="hover:underline hover:decoration-primary"> My Venues</Link>
         <Link to={`/profile/${userName}`} state={headerStateUpcoming} className="hover:underline hover:decoration-primary"> Upcoming bookings</Link>
         <Link to={`/profile/${userName}`} state={ headerStateMyBookings} className="hover:underline hover:decoration-primary"> My bookings</Link> 
         <div className="flex flex-row items-center md:gap-3">
         <Link to={`/profile/${userName}`} state={headerStateVenues} className="hover:underline hover:decoration-primary">{userName} </Link>
         <div className="rounded-full border border-primary overflow-clip">
          <img src={userAvatar || placeholder}  alt="profile image" className="w-12 h-12 object-cover"/>
         </div>
         
         </div>
         </> )
         
      : (
         <>
         <Link to={"/"} className="hover:underline hover:decoration-primary">Home</Link>
        <Link to={"/venues"} className="hover:underline hover:decoration-primary"> All Venues</Link> 
         <Link to={`/profile/${userName}`} className="hover:underline hover:decoration-primary"> My bookings</Link> 
         <div className="flex flex-row items-center gap-8">
         <Link to={`/profile/${userName}`} className="hover:underline hover:decoration-primary">{userName} </Link>
         <div className="rounded-full border border-primary overflow-clip">
          <img src={userAvatar || placeholder}  alt="profile image" className="w-12 h-12 object-cover"/>
         </div>
         
         </div>
         </>
        )
}

    </div>
    
    <button className="md:hidden flex flex-col hover:cursor-pointer" onClick={(e) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }}>{!isOpen ? <Menu size={28}/> : <X size={28}/> }</button>
   
   {isOpen && (
    <div onClick={(e) => e.stopPropagation()}
  className="md:hidden flex flex-col items-center absolute top-full text-lg left-0 w-full z-50 shadow-lg  bg-white border-t border-b-5  border-border hover:cursor-pointer">
      {!isLoggedIn ? ( 
      <div className="flex flex-col items-center text-center w-full">
        <Link to={"/"} className="w-full border-b border-border py-2" onClick={() => setIsOpen(prev => !prev)}>Home</Link> 
      <Link to={"/venues"} className="w-full border-b border-border py-2"onClick={() => setIsOpen(prev => !prev)}>Venues</Link> 
      <Link to={"/auth/register"} className="w-full border-b border-border py-2" onClick={() => setIsOpen(prev => !prev)}>Register</Link> 
      <Link to={"/auth/login"} className="w-full border-b border-border py-2" onClick={() => setIsOpen(prev => !prev)}>Login</Link>
      </div>
      )
      : 
      venueManager ? 
       (<div className="flex flex-col items-center text-center w-full">
        <Link to={"/"} className="w-full border-b border-border py-2" onClick={() => setIsOpen(prev => !prev)}>Home</Link> 
        <Link to={"/venues"} className="w-full border-b border-border py-2" onClick={() => setIsOpen(prev => !prev)}>All Venues</Link> 
        <Link to={`/profile/${userName}`} state={headerStateVenues} className="w-full border-b border-border py-2" onClick={() => setIsOpen(prev => !prev)}> My Venues</Link>
        <Link to={`/profile/${userName}`} state={headerStateUpcoming} className="w-full border-b border-border py-2" onClick={() => setIsOpen(prev => !prev)}> Upcoming bookings</Link>
        <Link to={`/profile/${userName}`} state={headerStateMyBookings} className="w-full border-b border-border py-2" onClick={() => setIsOpen(prev => !prev)}> My bookings</Link>
        <div className="flex flex-row items-center gap-4 py-2">
        <Link to={`/profile/${userName}`} onClick={() => setIsOpen(prev => !prev)}>{userName} </Link>
        <div className="rounded-full border-2 border-primary overflow-clip">
         <img src={userAvatar || placeholder}  alt="profile image" className="w-10 h-10 object-cover"/>
         
        </div>
        
        </div>
        </div> ) 
      : 
      (
        <div className="flex flex-col items-center text-center w-full">
      <Link to={"/"} className="w-full border-b border-border py-2" onClick={() => setIsOpen(prev => !prev)}>Home</Link> 
        <Link to={"/venues"} className="w-full border-b border-border py-2" onClick={() => setIsOpen(prev => !prev)}> All Venues</Link> 
         <Link to={`/profile/${userName}`} className="w-full border-b border-border py-2" onClick={() => setIsOpen(prev => !prev)}> My bookings</Link> 
         <div className="flex flex-row items-center gap-4 py-2">
         <Link to={`/profile/${userName}`} onClick={() => setIsOpen(prev => !prev)}>{userName} </Link>
         <div className="rounded-full border-2 border-primary overflow-clip">
          <img src={userAvatar || placeholder}  alt="profile image" className="w-10 h-10 object-cover"/>
         </div>
         
         </div>
         </div> )}

    </div>
   )}
   </div>
   
   </nav>
   
  )
}