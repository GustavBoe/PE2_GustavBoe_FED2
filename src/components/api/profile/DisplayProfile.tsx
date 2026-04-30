import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import getProfile from "@/api/profile/getProfile";
import type {getProfileDataProps, userData} from "@/interfacesAndTypes/types";
import { accessToken } from "@/const/const";

function DisplayProfile({name}:getProfileDataProps ){
  
  const [user, setUser] = useState<userData>({
    name:"",
    email:"",
    password:"",
    venueManager:false,
    bio:"",
    avatar: undefined,
    banner:undefined
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    
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
          console.log(profileData)
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
        </div>
      )
        
  }

  export default DisplayProfile;