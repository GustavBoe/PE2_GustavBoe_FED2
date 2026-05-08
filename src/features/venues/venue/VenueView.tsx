import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getVenue from "@/api/venues/getVenue";
import type { image, userData, venueDataOwner } from "@/interfacesAndTypes/types";
import BookingCreate from "@/features/bookings/BookingCreate";
export default function VenueView(){
  const {id} = useParams<{id:string}>();
  
  const [venue, setVenue] = useState<venueDataOwner>({
    id:"",
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
    },
    owner:{} as userData,
    
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  
  
  
   useEffect(() => {
        
      if (!id) return;
      
    
        const loadVenue = async() => {
          setIsLoading(true)
          try{
                    const venueData = await getVenue(id)
                    
                    setVenue({
                      id:venueData.id,
                      name: venueData.name,
                      description: venueData.description,
                      media:[] as image[],
                      price:venueData.price,
                      maxGuests:venueData.maxGuests,
                      rating:venueData.rating,
                      created: venueData.created,
                      updated: venueData.updated,
                      meta: {
                        wifi: venueData.meta.wifi,
                        parking:venueData.meta.parking,
                        breakfast:venueData.meta.breakfast,
                        pets:venueData.meta.pets
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
                      owner:{
                        name:"",
                        email:"",
                        password:"",
                        venueManager:false,
                        bio:"",
                        avatar:{url:"", alt:""},
                        banner:{url:"", alt:""}},
                      

                    })
                  }
          catch (err) {
          alert(err)
          
        } finally {
          setIsLoading(false);
        }
        }
        loadVenue();
        
    }, [id, navigate]);
  const venueId = venue.id;
  const maxGuests = venue.maxGuests;
  if (isLoading) return <p>Loading venue...</p>;
  if (!venue) return <p> No venue data</p>;

  return(
    <div>
      <h1>{venue.name}</h1>
     <p>{venue.description}</p>
     <p>{venue.location.lat}</p>
    <BookingCreate venueId={venueId} maxGuests={maxGuests}/>
    </div>
  )
}