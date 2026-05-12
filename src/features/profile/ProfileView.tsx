import {useState, useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import getProfile from "@/api/profile/getProfile";
import type {UserProfileData} from "@/interfacesAndTypes/types";
import { accessToken } from "@/const/const";

function ProfileView(){
  
  const {name} = useParams<{name:string}>();
  
  const [user, setUser] = useState<UserProfileData>({
    name:"",
    email:"",
    password:"",
    venueManager:false,
    bio:"",
    avatar:{url:"", alt:""},
    banner:{url:"", alt:""},
    venues: [],
    bookings: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



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
          
        }
        catch (err) {
        alert(err)
        
      } finally {
        setIsLoading(false);
      }
      }
      loadProfile();

  }, [name, navigate]);
  if (isLoading) return <p>Loading profile...</p>;
  if (!user) return <p> No profile data</p>;
  
      return(
        <div>
          <h1>{user.name}</h1>
          <h2>{user.venueManager ? "Venue Manager" : "User"}</h2>

          <h3>Bookings</h3>
          <div>
          <h3>{user.bookings?.[0]?.venue?.name}</h3>
          <p>At {user.bookings?.[0]?.dateFrom} - {user.bookings?.[0]?.dateTo} </p>
          <Link to={`bookings/${user.bookings?.[0]?.id}/edit`}>Edit</Link>
          </div>
        </div>
      )
        
  }

  export default ProfileView;