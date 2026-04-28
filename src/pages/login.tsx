import { useState } from "react";
import { BASE_URL } from "@/const/const";
import type { logUserData} from "@/interfacesAndTypes/interfaces";

const API_KEY = import.meta.env.VITE_API_KEY;

//Help from ChatGPT to reset the user object"
const initialUser: logUserData = {
  email: "",
  password: "",
};

function LoginUser(){
const [user, setUser] = useState<logUserData>({
 
  email:"",
  password:"",
 
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
    console.log(responseData)

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
       
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  
)
}
export default LoginUser;

