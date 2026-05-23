import {useState, useEffect} from "react";
import { useNavigate, useParams,useLocation, Link } from "react-router-dom";
import getProfile from "@/api/profile/getProfile";
import getProfileBookings from "@/api/bookings/getProfileBookings";
import type {UserProfileData, VenuesWithBookings, BookingGET} from "@/interfacesAndTypes/types";
import { accessToken, venueManager, userName, placeholder } from "@/const/const";
import { ProfileVenueCard} from "@/components/ProfileVenueCard"
import {PersonalBookingCard} from "@/components/PersonalBookingCard"
import {UpcomingBookingCard} from "@/components/UpcomingBookingCard"


function ProfileView(){
  
  const {name} = useParams<{name:string}>();
  const location = useLocation();
 const [user, setUser] = useState<UserProfileData | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false)
  const [venues, setVenues] = useState<VenuesWithBookings[]>([]);
  const [bookings,setBookings] = useState<BookingGET[]>([])
  const upcomingBookings = venues.flatMap((venue:VenuesWithBookings) => venue.bookings || []).sort((a:BookingGET,b:BookingGET)=> new Date(a.dateFrom).getTime()-new Date(b.dateFrom).getTime())
           
  const [activeTab, setActiveTab] = useState<"venues" | "upcoming" | "bookings" | null>("venues"); /*ChatGPT idea after I presented mine*/ 
  
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/")
  }

  
  useEffect(() => {
    
    if (!name) return;
    
    if(!accessToken){
        alert("Log in to view this page.")
        navigate("/auth/login")
        return
      }
     
      const loadProfile = async() => {
        setIsLoading(true)
        try{
         
          const profileData = await getProfile(name)
          setUser(profileData.data);
          setVenues(profileData.data.venues || [])
          const profileBookings = await getProfileBookings();
          setBookings(profileBookings);
            
           const owner = profileData.data.name === userName;
          setIsOwner(owner)
          
          
        }
        catch (err) {
        alert(err)
        
      } finally {
        setIsLoading(false);
      }
      }
      loadProfile();

  }, [name, navigate]);
  useEffect(()=>{
    if(location.state){
      setActiveTab(location.state)
    }
    else{
      setActiveTab("venues")
    }
    
  },[location.state])

  if (isLoading) return (<div className="flex items-center justify-center min-h-screen">
    <p className="animate-bounce text-xl text-primary font-medium">
      Holidazing...
    </p>
  </div>);;
  if (!user) return <p> No profile data</p>;
  
      return(
        <div>
        <div className="w-full max-h-25 overflow-clip ">
            <img src={user.banner.url} alt={user.banner.alt} className="object-cover"/>
          </div>
        <div className="max-w-200 mx-auto flex flex-col items-center text-text text-xs font-inter">
          <div className=" w-full flex flex-col items-center">
          <div className="flex flex-row items-center justify-around w-[90%] h-20 border-b border-x border-border rounded-b-md shadow-sm font-inter">
          <div className="w-12 h-12 rounded-full overflow-clip">
            <img src={user.avatar.url || placeholder}  alt="profile image" className="w-12 h-12 object-cover"/>
          </div>
          <div className="font-medium">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
          
            {user.venueManager ? <p className="text-primary font-medium">VM</p> : <p className="text-bread font-medium">VM</p>}
          
          {isOwner ? <Link to={"edit"}className="border border-border rounded-sm px-2 hover:bg-primary/50 hover:text-white">Edit</Link> : null}
          </div>
          <div className="border-b border-x border-border rounded-b-md shadow-sm pt-2 pb-2 w-[70%] h-fit">
            <p className="text-[14px] pl-2 font-bold">Bio</p>
           <p className=" pl-2 pr-2 wrap-break-word">{user.bio}</p>
          </div>
         
          </div>

          <div className="mt-10 flex flex-col w-full items-center">
            {!isOwner ? 
            (
            <div  className="flex flex-col items-center  pt-5 border border-border rounded-md shadow"> <h1 className="font-dm text-xl">Venues</h1>
            <div className='md:grid md:grid-cols-2 overflow-auto h-110 md:h-auto'>
                     {venues.map((venue) => (
                       <ProfileVenueCard key={venue.id} {...venue} />
                     ))}
                   </div> </div>)
            : 
            venueManager ? 
            (<div className="flex flex-row w-[90%] justify-around">
              <button 
             className={activeTab === "venues" ? "w-full border rounded-l-md h-10 border-border bg-border px-2 cursor-pointer" : "w-full rounded-l-md border h-10 border-border px-2 cursor-pointer" } 
                onClick={()=>{setActiveTab("venues")}}
                >Venues</button>
              
              <button className={activeTab === "upcoming" ? "w-full border-y border-l h-10 border-border bg-border px-2 cursor-pointer" : "w-full border-y border-l h-10 border-border px-2 cursor-pointer" }
                onClick={()=>{setActiveTab("upcoming")}}
                
                
                > Upcoming bookings</button>
              
              <button 
                className={activeTab === "bookings" ? "w-full rounded-r-md border-y border-r h-10 border-border bg-border px-2 cursor-pointer" : "w-full rounded-r-md border h-10 border-border px-2 cursor-pointer" }
                 onClick={()=>{setActiveTab("bookings")}}
                >My bookings</button>
              </div>
              )
            :
            (
            <>
            
            <div className="h-full mt-5 flex flex-col items-center">
              {bookings.length > 0 ? (
               <div className="flex flex-col items-center  pt-5 border border-border rounded-md shadow">
                   <h1 className="font-dm text-2xl">My bookings</h1>
                   <div className='md:grid md:grid-cols-2'>
                     {bookings.map((booking) => (
                       <PersonalBookingCard key={booking.id} {...booking} />
                     ))}
                   </div>
                   </div>
                 ) : (
                  <div className="flex flex-col text-center mt-5 mb-25 justify-around h-25">
                    <p className="mt-5 text-bread">No bookings to show</p>
                  <Link to={"/venues"} className="px-4 py-2 border border-border drop-shadow-sm font-medium rounded-sm hover:bg-border active:bg-bread">Book a venue</Link>
                  </div>
                   )
           
                  }
               <button onClick={handleLogout} className="bg-alarm hover:bg-alarm/85 active:bg-alarm px-20 py-2 mt-30 mb-25 text-white font-inter rounded-md">Log out</button>
             </div></>)

            }
            
          </div>
          {isOwner && venueManager
          ? 
          <>
          <div className="h-full mt-5 flex flex-col">
           {activeTab === "venues" ? (venues.length > 0 ? (
                <div className="flex flex-col items-center  py-2 border border-border rounded-md shadow">
                    <h1 className="font-dm text-2xl">My venues</h1>
                     <Link to={"/venues/create"} className="px-4 py-2  mt-5 border border-border drop-shadow-sm font-medium rounded-sm hover:bg-border active:bg-bread text-text">Add venue +</Link>
                   <div className='md:grid md:grid-cols-2 overflow-auto h-110 md:h-auto'>
                     {venues.map((venue) => (
                       <ProfileVenueCard key={venue.id} {...venue} />
                     ))}
                   </div>
                   
                </div>
                 ) : (
                  <div className="flex flex-col text-center mt-5 mb-25 justify-around h-25">
                    <p className="mt-5 text-bread">No venues to show</p>
                  <Link to={"/venues/create"} className="px-4 py-2 border border-border drop-shadow-sm font-medium rounded-sm hover:bg-border active:bg-bread">Create venue +</Link>
                  </div>

                   )
                 ) : null}
            {activeTab === "upcoming" ? (upcomingBookings.length > 0 ? (
               <div className="flex flex-col items-center  py-2 border border-border rounded-md shadow">
                   <h1 className="font-dm text-2xl">Upcoming bookings</h1>
                   <div className='md:grid md:grid-cols-2'>
                     {upcomingBookings.map((booking) => (
                       <UpcomingBookingCard key={booking.id} {...booking} />
                     ))}
                   </div>
                   </div>
                 ) : (
                  <div className="flex flex-col text-center mt-5 mb-25 justify-around h-25">
                    <p className="mt-5 text-bread">No bookings to show</p>
                  <Link to={"/venues/create"} className="px-4 py-2 border border-border drop-shadow-sm font-medium rounded-sm hover:bg-border active:bg-bread">Create venue +</Link>
                  </div>
                   )
                 )  : null}
            {activeTab === "bookings" ?(bookings.length > 0 ? (
               <div className="flex flex-col items-center  pt-5 border border-border rounded-md shadow">
                   <h1 className="font-dm text-2xl">My bookings</h1>
                   <div className='md:grid md:grid-cols-2'>
                     {bookings.map((booking) => (
                       <PersonalBookingCard key={booking.id} {...booking} />
                     ))}
                   </div>
                   </div>
                 ) : (
                  <div className="flex flex-col text-center mt-5 mb-25 justify-around h-25">
                    <p className="mt-5 text-bread">No bookings to show</p>
                  <Link to={"/venues"} className="px-4 py-2 border border-border drop-shadow-sm font-medium rounded-sm hover:bg-border active:bg-bread">Book a venue</Link>
                  </div>
                   )
                 ) : null}
            
          </div>
          <button onClick={handleLogout} className="bg-alarm hover:bg-alarm/85 active:bg-alarm px-20 py-2 mt-30 mb-25 text-white font-inter rounded-md">Log out</button>
          </>
          : null}
        
          
        </div>
        </div>
      )
        
  }

  export default ProfileView;