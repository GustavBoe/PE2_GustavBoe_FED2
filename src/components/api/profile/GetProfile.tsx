import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOLIDAZE_URL, accessToken, API_KEY } from "@/const/const";
import type { getProfileDataProps, userData } from "@/interfacesAndTypes/types";


function GetProfileData({name}:getProfileDataProps ){
  
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
  const fetchProfile = async() => {
    setIsLoading(true)
     try {
        const response = await fetch(
          `${HOLIDAZE_URL}/profiles/${name}`,
            {headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": API_KEY,
            }}
        );
        const responseData = await response.json();
        
         
        if(!response.ok){
      const errorMessage = 
      responseData.errors?.[0]?.message ||
       `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
      }
      
      setUser(responseData.data);

      } catch (err) {
        alert(err)
        
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
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

  export default GetProfileData;