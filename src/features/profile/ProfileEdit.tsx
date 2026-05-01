import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import getProfile from "@/api/profile/getProfile";
import type {userData, editProfileDataProps} from "@/interfacesAndTypes/types";
import { accessToken, userName, HOLIDAZE_URL, API_KEY, avatarFailsafe, bannerFailsafe } from "@/const/const";

function ProfileEdit(){
const {name} = useParams<{name:string}>();
const navigate = useNavigate();

const [oldUser, setOldUser] = useState<userData>({
    name:"",
    email:"",
    password:"",
    venueManager:false,
    bio:"",
    avatar:{url:"", alt:""},
    banner:{url:"", alt:""}
  })
  
const initialUser: userData = {
    name:"",
    email:"",
    password:"",
    venueManager:false,
    bio:"",
    avatar:{url:"", alt:""},
    banner:{url:"", alt:""}
  };

  const [user, setUser] = useState<editProfileDataProps>({
    venueManager:false,
    bio:"",
    avatar:{url:"", alt:""},
    banner:{url:"", alt:""}
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
            setUser({
              venueManager: profileData.data.venueManager,
              bio: profileData.data.bio,
              avatar: profileData.data.avatar || {url:"", alt:""},
              banner: profileData.data.banner || {url:"", alt:""}
            })
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
        const response = await fetch(`${HOLIDAZE_URL}/profiles/${userName}`, {
          method: "PUT",
          headers:{
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
            Authorization: `Bearer ${accessToken}`,
            
          },
          //Help from ChatGPT on how to add failsafe urls to request
          body: JSON.stringify({...user,
            avatar: {
              ...user.avatar,
              url:user.avatar.url.trim() || avatarFailsafe
            },
            banner: {
              ...user.banner,
              url:user.banner.url.trim() || bannerFailsafe
            }
          })
        });
        const responseData = await response.json()
        
        if(!response.ok){
          console.log(API_KEY)
          const errorMessage = 
          responseData.errors?.[0]?.message ||
           `Error: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
      }
      
      setUser(initialUser)
      navigate(`/profile/${userName}`)
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

        <label htmlFor="avatarUrl">Avatar url:</label>
        <input 
        type="text"
        id="avatarUrl"
        value={user.avatar?.url}
        placeholder={oldUser.avatar?.url}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setUser(prev => ({...prev, avatar: {...prev.avatar,
             url: e.target.value
        }
      }))
          }
          
        />
        <label htmlFor="avatarAlt">Avatar alt:</label>
        <input 
        type="text"
        id="avatarAlt"
        value={user.avatar?.alt}
        placeholder={oldUser.avatar?.alt}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setUser(prev => ({...prev, avatar: {...prev.avatar,
             alt: e.target.value
        }
      }))
          }
          
        />
        <label htmlFor="bannerUrl">Banner url:</label>
        <input 
        type="text"
        id="bannerUrl"
        value={user.banner?.url}
        placeholder={oldUser.banner?.url}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setUser(prev => ({...prev, banner: {...prev.banner,
             url: e.target.value
        }
      }))
          }
          
        />
        
        <label htmlFor="venueManager">I want to be a venue manager</label>
        <input 
        type="checkbox"
        id="venueManager"
        checked={user.venueManager}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>
          setUser(prev => ({
            ...prev,
            venueManager:e.target.checked
          }))
        }/>
        
        
       
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving changes..' : 'Save changes'}
          </button>
        </form>
      
    )
}
export default ProfileEdit;