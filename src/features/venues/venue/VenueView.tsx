import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getVenue from "@/api/venues/getVenue";

import type { image, venueDataApi } from "@/interfacesAndTypes/types";
export default function VenueView(){
  const {id} = useParams<{id:string}>();
  
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
      ong:0
    } 
  });
  const navigate =useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  
  console.log(id);
  console.log(navigate)
  
   useEffect(() => {
      
      if (!id) return;
      
    
        const loadVenue = async() => {
          setIsLoading(true)
          try{
           
            const venueData = await getVenue(id)
            setVenue(venueData.data);
            console.log(venueData)
          }
          catch (err) {
          alert(err)
          
        } finally {
          setIsLoading(false);
        }
        }
        loadVenue();
        
    }, [id, navigate]);

  if (isLoading) return <p>Loading venue...</p>;
  if (!venue) return <p> No venue data</p>;
  return(
    <div>
      <h1>{venue.name}</h1>
     <p>{venue.description}</p>
    </div>
  )
}