import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import getProfile from "@/api/profile/getProfile";
import type {userData, editProfileDataProps} from "@/interfacesAndTypes/types";
import { accessToken, userName, HOLIDAZE_URL, API_KEY } from "@/const/const";

function ProfileEdit(){
const {name} = useParams<{name:string}>();
const navigate = useNavigate();

const [oldUser, setOldUser] = useState<userData>({
    name:"",
    email:"",
    password:"",
    venueManager:false,
    bio:"",
    avatar: undefined,
    banner:undefined
  });
const initialUser: userData = {
    name:"",
    email:"",
    password:"",
    venueManager:false,
    bio:"",
    avatar: undefined,
    banner:undefined
  };
  const [user, setUser] = useState<editProfileDataProps>({
    venueManager:false,
    bio:"",
    avatar: undefined,
    banner:undefined
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

    useEffect(() => {
      
      if (!name) return;
      
      if(!accessToken){
          alert("Log in to view this page.")
          navigate("/auth/login")
          return
        }
      if(name !== userName){
      alert("Permission denied, redirecting to home");
      navigate("/");
      return
      }
        const loadProfile = async() => {
          setIsLoading(true)
          try{
            const profileData = await getProfile(name)
            setOldUser(profileData.data);
            
          }
          catch (err) {
          alert(err)
          
        } finally {
          setIsLoading(false);
        }
        }
        loadProfile();
  
    }, [name, navigate]);
    if (isLoading) return <p>Loading profile data...</p>;
    if (!user){
      alert("Unable to fetch profile data, returning to home");
      navigate("/")
      return
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      try{
        const response = await fetch(`${HOLIDAZE_URL}/`, {
          method: "PUT",
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X_Noroff-API-Key": API_KEY,
          },
          body: JSON.stringify(user)
        });
        const responseData = await response.json()
        
        if(!response.ok){
          const errorMessage = 
          responseData.errors?.[0]?.message ||
           `Error: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
      }
      
      setUser(initialUser)
    }
    catch (error){
      console.log("Could not register user:",error)
    }
    finally{
      setIsSubmitting(false)
      }
    };
    return(
      
        <form onSubmit={handleSubmit}>
          <h2>Edit profile</h2>
          <div>
           <p>{oldUser.name}</p>
            <label htmlFor="bio">Bio:</label>
        <input 
        type="text"
        id="bio"
        value={user.bio}
        placeholder={oldUser.bio}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setUser(prev => ({...prev,
             bio: e.target.value
            }))
          }
          
        />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving changes..' : 'Save changes'}
          </button>
        </form>
      
    )
}
export default ProfileEdit;