import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addToLocalStorage } from "@/storage/localStorage";
import { BASE_URL } from "@/const/const";
import type {logUserData} from "@/interfacesAndTypes/types";

const API_KEY = import.meta.env.VITE_API_KEY;

//Help from ChatGPT to reset the user object"
const initialUser: logUserData = {
  email: "",
  password: "",
};

function LoginUser(){
  const navigate = useNavigate();
const [user, setUser] = useState<logUserData>({
  email:"",
  password:"",
 
});
const [isSubmitting, setIsSubmitting] = useState(false);

//From JS frameworks module 3.3
const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  try{
    const response = await fetch(`${BASE_URL}/auth/login?_holidaze=true`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "X_Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(user)
    });
    const responseData = await response.json()
    const accessToken = responseData.data.accessToken;
    const userName = responseData.data.name;
    const venueManager = responseData.data.venueManager;
    const userAvatar = responseData.data.avatar.url;
    addToLocalStorage("accessToken", accessToken);
    addToLocalStorage("userName", userName);
    addToLocalStorage("venueManager", venueManager)
    addToLocalStorage("userAvatar", userAvatar);
    
    if(!response.ok){
      const errorMessage = 
      responseData.errors?.[0]?.message ||
       `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
  }
  
  setUser(initialUser)
  navigate("/")
}
catch (error){
  console.log("Could not log in user:",error)
}
finally{
  setIsSubmitting(false)
  }
};
return(
    <section className="flex flex-col items-center text-text">
      <h2 className="font-dm font-medium text-2xl">Log in</h2>
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-10">
      <div className="flex flex-col">
         <label htmlFor="email" className="font-inter">Email</label>
        <input 
        type="text"
        id="email"
        value={user.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setUser(prev => ({...prev,
             email: e.target.value
            }))
          }
          required
          className=" pl-2 inset-shadow-sm rounded-md text-lg h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        </div>
        <div className="flex flex-col">
         <label htmlFor="password" className="font-inter">Password</label>
        <input 
        type="text"
        id="password"
        value={user.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setUser(prev => ({...prev,
             password: e.target.value
            }))
          }
          required
          className="pl-2 text-lg inset-shadow-sm rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
       </div>
      
      <button type="submit" disabled={isSubmitting} className="border pb-1 pt-1 font-dm text-xl text-white bg-primary rounded-md hover:bg-text mt-5">
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </button>
    </form>
    <div className="flex flex-col items-center mt-10">
      <h3>Not a member yet?</h3>
      <Link to={"/auth/register"} className="underline">Register here</Link>
    </div>
  </section>
)
}
export default LoginUser;
