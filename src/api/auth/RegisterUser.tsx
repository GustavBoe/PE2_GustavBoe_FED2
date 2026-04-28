import { useState } from "react";
import { BASE_URL } from "@/const/const";
import type { regUserData } from "@/interfacesAndTypes/interfaces";

const API_KEY = import.meta.env.VITE_API_KEY;

//Help from ChatGPT to reset the user object"
const initialUser: regUserData = {
  name: "",
  email: "",
  password: "",
  venueManager: false
};

function RegisterUser(){
const [user, setUser] = useState<regUserData>({
  name:"",
  email:"",
  password:"",
  venueManager:false
});
const [isSubmitting, setIsSubmitting] = useState(false);

//From JS frameworks module 3.3

const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  ;

  
  try{
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
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
      <h2>Register</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input 
        type="text"
        id="name"
        value={user.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setUser(prev => ({...prev,
             name: e.target.value
            }))
          }
          required
        />
         <label htmlFor="email">Email:</label>
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
        />
         <label htmlFor="password">Password:</label>
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
        />
        <label htmlFor="venueManager">Do you wish to be a venue manager?</label>
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
        {isSubmitting ? 'Joining...' : 'Join'}
      </button>
    </form>
  
)
}
export default RegisterUser;

