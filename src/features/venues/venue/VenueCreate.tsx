import { useState } from "react";

import { HOLIDAZE_URL, accessToken } from "@/const/const";
import type {image, venueDataApi} from "@/interfacesAndTypes/types";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;


//Help from ChatGPT to reset the venue object"
const initialVenue: venueDataApi = {
    name: "",
    description: "",
    media:[],
    price:0,
    maxGuests:0,
    rating:0,
    created: "",
    updated: "",
    meta: {
      wifi: false,
      parking:false,
      breakfast:false,
      pets:false
    },
    location:{
      address:"",
      city:"",
      zip:"",
      country:"",
      continent:"",
      lat:0,
      lng:0
    },
  
};

function CreateVenue(){
  const navigate = useNavigate();
  const [venue, setVenue] = useState<venueDataApi>({
  name: "",
  description: "",
  media:[] as image[],
  price:"",
  maxGuests:"",
  rating:"",
  created: "",
  updated: "",
  meta: {
    wifi: false,
    parking:false,
    breakfast:false,
    pets:false
  },
  location:{
    address:"",
    city:"",
    zip:"",
    country:"",
    continent:"",
    lat:"",
    lng:""
  } 
});

//ChatGPT rubberducking to media solution
const initialImage = {url:"", alt:""};
const [image, setImage] = useState<image>(initialImage);
const [isAdding, setIsAdding] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

const handleAddImage = () => {
  setIsAdding(true);
  try{ 
    setVenue(prev => ({
    ...prev, 
    media:[...prev.media ?? [], image]
  }));
  setImage(initialImage);
}
finally{
  setIsAdding(false)
};
};

//From JS frameworks module 3.3
const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  try{
    const response = await fetch(`${HOLIDAZE_URL}/venues`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(venue)
    });
    const responseData = await response.json()
    
    if(!response.ok){
      const errorMessage = 
      responseData.errors?.[0]?.message ||
       `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
  }
  
  setVenue(initialVenue)
  navigate(`/venues/${responseData.data.id}`)
}
catch (error){
  console.log("Could not create venue:",error)
}
finally{
  setIsSubmitting(false)
  }
};
return(
  <section className=" w-full h-full  md:bg-primary flex flex-col items-center text-text">
    <div className="flex flex-col items-center h-full w-[90%] md:w-[80%] mt-10 md:mt-0 pt-10 pb-15  mb-10 md:mb-0 border border-border bg-white rounded-md md:rounded-none drop-shadow-lg md:drop-shadow-none">
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 w-full h-300 bg-white font-inter">
      <h2 className="font-dm font-medium text-2xl">Create venue</h2>
      <div className="flex flex-col w-[70%]">
          <label htmlFor="name">Name of venue</label>
        <input 
        type="text"
        id="name"
        value={venue.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({...prev,
             name: e.target.value
            }))
          }
          required
           className="pl-2  text-xs inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
         </div>
        <div  className="flex flex-col w-[70%]">
          <label htmlFor="description">Venue description</label>
        <textarea       
        id="description"
        value={venue.description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=> 
          setVenue(prev => ({...prev,
             description: e.target.value
            }))
          }
          rows={5}
          className=" resize-none pl-2 pt-2 text-xs inset-shadow-sm rounded-md border border-primary/25 h-full focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        </div>
        <div className="flex flex-col w-[70%]">
          <label htmlFor="image">Image of venue</label>
        <input 
        type="text"
        id="image"
        value={image.url}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setImage(prev => ({...prev,
             url: e.target.value
            }))
          }
          className="pl-2 text-xs inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="button" disabled={isAdding} onClick={handleAddImage} className="px-7 py-2 mt-5 border border-primary rounded-md hover:bg-primary hover:text-white">
          {isAdding ? "Adding image.." : "Add image"}
        </button>
        </div>
      <div className="flex flex-row justify-around items-center border-t border-border pt-5 w-full">
         
       <div className="flex flex-col items-center"> 
        <label htmlFor="maxGuests">Max guests</label>
        <input 
        type="number"
        id="maxGuests"
        value={venue.maxGuests}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({...prev,
             maxGuests:  e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
          required
        className="text-center w-15 h-7 inset-shadow-sm rounded-md border border-primary/25 focus:outline-none focus:ring-2 focus:ring-primary"

        />
        </div>
        <div className="flex flex-col items-center">
         <label htmlFor="price">Price</label>
        <input 
        type="number"
        id="price"
        value={venue.price}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({...prev,
             price: e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
          required
           className="text-center w-20 h-7 inset-shadow-sm rounded-md border border-primary/25  focus:outline-none focus:ring-2 focus:ring-primary"
        />
       </div>
        <div className="flex flex-col items-center">
        <label htmlFor="rating">Rating</label>
        <input 
        type="number"
        id="rating"
        value={venue.rating}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({...prev,
             rating:  e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
        className="text-center w-15 h-7 inset-shadow-sm rounded-md border border-primary/25 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        </div>
      </div>
        <div className="flex flex-col items-center gap-2 border-t border-border w-full pt-5">
          <h2 className="font-dm text-xl">Accomodations</h2>
            <div className="flex flex-row gap-5">
          <div className="flex flex-col">
            <label htmlFor="wifi" className="font-medium">Wifi</label>
          <input
          type="checkbox"
          id="wifi"
          checked={venue.meta.wifi}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
            setVenue(prev => ({
              ...prev,
              meta:{
                ...prev.meta,
                wifi: e.target.checked
              }
            }))

          }
          />
          </div>
          <div className="flex flex-col">
            <label htmlFor="parking" className="font-medium">Parking</label>
          <input
          type="checkbox"
          id="parking"
          checked={venue.meta.parking}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
            setVenue(prev => ({
              ...prev,
              meta:{
                ...prev.meta,
                parking: e.target.checked
              }
            }))

          }
          />
          </div>
          <div className="flex flex-col">
            <label htmlFor="breakfast" className="font-medium">Breakfast</label>
          <input
          type="checkbox"
          id="breakfast"
          checked={venue.meta.breakfast}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
            setVenue(prev => ({
              ...prev,
              meta:{
                ...prev.meta,
                breakfast: e.target.checked
              }
            }))

          }
          />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pets" className="font-medium">Pets</label>
          <input
          type="checkbox"
          id="pets"
          checked={venue.meta.pets}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
            setVenue(prev => ({
              ...prev,
              meta:{
                ...prev.meta,
                pets: e.target.checked
              }
            }))
          }
          />
          </div>
          </div>
          </div>
        <div className="flex flex-col items-center gap-2 border-t border-border w-full pt-5">

          <h2 className="font-dm text-xl">Location</h2>

          <div className="flex flex-col">
          <label htmlFor="address">Address</label>
        <input 
        type="text"
        id="address"
        value={venue.location.address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                address: e.target.value
              }
            }))
          }
        className="pl-2 h-10 shadow-sm rounded-md border border-primary/25 focus:outline-none focus:ring-2 focus:ring-primary"

        />
          </div>
          <div className="flex flex-col">
          <label htmlFor="city">City</label>
        <input 
        type="text"
        id="city"
        value={venue.location.city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                city: e.target.value
              }
            }))
          }
        className="pl-2 inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"

        />
          </div>
        
        <div className="flex flex-col">
          <label htmlFor="zip">Zip code</label>
        <input 
        type="text"
        id="zip"
        value={venue.location.zip}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                zip: e.target.value
              }
            }))
          }
           className=" text-center w-15 inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        </div>
       <div className="flex flex-col ">
         <label htmlFor="country">Country</label>
        <input 
        type="text"
        id="country"
        value={venue.location.country}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                country: e.target.value
              }
            }))
          }
      className="pl-2 inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"

      />
       </div>
        <div className="flex flex-col ">
           <label htmlFor="continent">Continent</label>
        <input 
        type="text"
        id="continent"
        value={venue.location.continent}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                continent: e.target.value
              }
            }))
          }
        className="pl-2 inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"

        />
        </div>
     <div className="flex flex-row justify-around w-65">
      <div className="flex flex-col items-center">
         <label htmlFor="lat">Lat</label>
        <input 
        type="text"
        id="lat"
        value={venue.location.lat}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                lat:  e.target.value === "" ? "" : Number(e.target.value)
              }
            }))
          }
        className=" text-center w-15 pl-3 inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"

        />
       </div>
        <div className="flex flex-col items-center">
        <label htmlFor="lng">Lng</label>
        <input 
        type="number"
        id="lng"
        value={venue.location.lng}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                lng:  e.target.value === "" ? "" : Number(e.target.value)
              }
            }))
          }
        className=" text-center w-15 pl-3 inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        </div>
     </div>
       
        </div>
      
      <button type="submit" disabled={isSubmitting} className="px-7 py-2 border border-primary rounded-md mt-5 hover:bg-primary hover:text-white">
        {isSubmitting ? "Creating venue..." : "Create venue"}
      </button>
    </form>
  </div>
  </section>
)
}
export default CreateVenue;