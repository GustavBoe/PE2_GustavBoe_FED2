import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL, API_KEY } from "@/const/const";
import type { regUserData } from "@/interfacesAndTypes/types";



//Help from ChatGPT to reset the user object"
const initialUser: regUserData = {
  name: "",
  email: "",
  password: "",
  venueManager: false
};

function RegisterUser(){
  const navigate = useNavigate();

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
  navigate("/")
}
catch (error){
  console.log("Could not register user:",error)
}
finally{
  setIsSubmitting(false)
  }
};
return(
    <section className="flex flex-col items-center">
      <h2 className="font-dm font-medium text-text text-2xl">Register</h2>
    <form onSubmit={handleSubmit} className="mx-auto text-text mt-10">
      <div className="flex flex-col gap-5">
      
        <div className="flex flex-col">
        <label htmlFor="name" className="font-inter">Name</label>
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
          className="pl-2 text-lg inset-shadow-sm rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        </div>
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
          className="pl-2 text-lg inset-shadow-sm rounded-md h-10 focus:outline-none focus:ring-2 focus:ring-primary"
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
        <div className="flex flex-row items-center gap-4 mt-5 mb-10">
        <label htmlFor="venueManager" className="font-inter">I wish to be a venue manager</label>
        <input 
        type="checkbox"
        id="venueManager"
        checked={user.venueManager}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>
          setUser(prev => ({
            ...prev,
            venueManager:e.target.checked
          }))
        }
        className="inset-shadow-sm rounded-sm  accent-primary checked h-5 w-5 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <button type="submit" disabled={isSubmitting} className="border pb-1 pt-1 font-dm text-xl text-white bg-primary rounded-md hover:bg-text">
        {isSubmitting ? 'Registering...' : 'Register new user'}
      </button>
      </div>
    </form>

    <div className="flex flex-col items-center mt-10 gap-5">
      <h3 className="font-dm text-lg">Already a holidaze user?</h3>
      <Link to={`/auth/login`} className="underline">Log in to existing user</Link>
    </div>
    
    </section>
  
)
}
export default RegisterUser;

