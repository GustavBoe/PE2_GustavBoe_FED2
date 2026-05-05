import { useState } from "react";

import { HOLIDAZE_URL, accessToken } from "@/const/const";
import type {image, venueDataApi} from "@/interfacesAndTypes/types";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;


//Help from ChatGPT to reset the user object"
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
  console.log("Could not register user:",error)
}
finally{
  setIsSubmitting(false)
  }
};
return(
    <div>
    <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-45">
      <h2>Create venue</h2>
      <div>
         <label htmlFor="name">Name of venue:</label>
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
        />
        <label htmlFor="description">Description of venue:</label>
        <textarea 
        
        id="description"
        value={venue.description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=> 
          setVenue(prev => ({...prev,
             description: e.target.value
            }))
          }
          required
        />
        <div>
          <label htmlFor="image">Image of venue:</label>
        <input 
        type="text"
        id="image"
        value={image.url}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setImage(prev => ({...prev,
             url: e.target.value
            }))
          }
        />
        <button type="button" disabled={isAdding} onClick={handleAddImage}>
          {isAdding ? "Adding image.." : "Add image"}
        </button>
        </div>
       
       <label htmlFor="price">Set price:</label>
        <input 
        type="number"
        id="price"
        value={venue.price}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({...prev,
             price: Number(e.target.value),
            }))
          }
          required
        />
        <label htmlFor="maxGuests">Maximum amount of guests:</label>
        <input 
        type="number"
        id="maxGuests"
        value={venue.maxGuests}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({...prev,
             maxGuests: Number(e.target.value),
            }))
          }
          required
        />
        <label htmlFor="rating">Rating:</label>
        <input 
        type="number"
        id="rating"
        value={venue.rating}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({...prev,
             rating: Number(e.target.value),
            }))
          }
        />
        <div>
          <h2>Accomodations:</h2>
          <label htmlFor="wifi">Wifi</label>
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
          <label htmlFor="parking">Parking</label>
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
          <label htmlFor="breakfast">Breakfast</label>
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
          <label htmlFor="pets">Pets</label>
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
        <div>
          <h2>Location</h2>
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
        />
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
        />
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
        />
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
      />
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
        />
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
                lat: Number(e.target.value)
              }
            }))
          }
        />
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
                lng: Number(e.target.value)
              }
            }))
          }
        />
        </div>
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating venue..." : "Create venue"}
      </button>
    </form>
  </div>
)
}
export default CreateVenue;