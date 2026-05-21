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
      <section className="border w-full h-full  md:bg-primary flex flex-col items-center text-text">
        <div className="flex flex-col items-center h-full w-[90%] md:w-[80%] mt-10 md:mt-0 pt-10 pb-15  mb-10 md:mb-0 border border-border bg-white rounded-md md:rounded-none drop-shadow-lg md:drop-shadow-none">
        <form onSubmit={handleSubmit} className="flex flex-col items-center  gap-10 h-130 justify-around bg-white font-inter">
          <h2 className="font-dm font-medium text-2xl">Edit profile</h2>
        <div className="flex flex-col w-[70%]">
        <label htmlFor="bio" className="pl-2">Bio</label>
        <textarea 
        id="bio"
        value={user.bio}
        placeholder={oldUser.bio}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=> 
          setUser(prev => ({...prev,
             bio: e.target.value
            }))
          }
          rows={5}
          
          className=" resize-none pl-2 text-xs inset-shadow-sm rounded-md border border-primary/25 h-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="pl-2">Profile picture</h1>
      <div className="flex flex-row gap-2">
        <input 
        type="text"
        id="avatarUrl"
        value={user.avatar?.url}
        placeholder="Image source"
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setUser(prev => ({...prev, avatar: {...prev.avatar,
             url: e.target.value
        }
      }))
          }
          className="pl-2 text-xs inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"
          
        />
        
        <input 
        type="text"
        id="avatarAlt"
        value={user.avatar?.alt}
        placeholder={oldUser.avatar.alt ? `${oldUser.avatar?.alt}` : "Description"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setUser(prev => ({...prev, avatar: {...prev.avatar,
             alt: e.target.value
        }
      }))
          }
          className="pl-2 text-xs inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-start pl-2">Banner image</h1>
          <div className="flex flex-row gap-2">
         
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
        className="pl-2 text-xs inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input 
        type="text"
        id="bannerAlt"
        value={user.banner?.alt}
        placeholder="Description"
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setUser(prev => ({...prev, banner: {...prev.banner,
             alt: e.target.value
        }
      }))
          }
          className="pl-2 text-xs inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        </div>
        </div>
        
        <div className="flex flex-row gap-2 items-center">
        <label htmlFor="venueManager" className="text-sm">I wish to be a venue manager</label>
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
          <button type="submit" disabled={isSubmitting} className="px-7 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white">
            {isSubmitting ? 'Saving changes..' : 'Save changes'}
          </button>
        </form>
      </div>
      
      </section>
    )
}
export default ProfileEdit;