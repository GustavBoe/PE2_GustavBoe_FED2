import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import getVenue from "@/api/venues/getVenue";
import type { image, userData, venueDataOwner } from "@/interfacesAndTypes/types";
import { accessToken,userName, placeholder, avatarFailsafe } from "@/const/const";
import BookingCreate from "@/features/bookings/booking/BookingCreate";
import BookingCreateGuest from "@/features/bookings/booking/BookingCreateGuest"
import { Users, Star, Wifi, PawPrint, CarFront, Coffee} from "lucide-react";


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
  const [isLoading, setIsLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false)

  const mediaBackup = {
    url: placeholder,
    alt: "Holidaze placeholder"
  }
  
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
                      media: venueData.media,
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
                      location: venueData.location,
                      owner: venueData.owner

                    })
                    if(venue.owner.name === userName){
                      setIsOwner(true)
                    }
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
  const venueMedia = venue.media?.length ? (
    venue.media.map((venueImage, index) => (
      <li key={index} className="flex-none w-full snap-center">
        <img
        src={venueImage.url || mediaBackup.url}
        alt={venueImage.alt || mediaBackup.alt}
        className="
        aspect-video
        object-cover
        rounded-md
        block
        "
        />
      </li>
    ))
  )
    : (
    <li className="flex-none w-full">
      <img
      src={mediaBackup.url}
      alt={mediaBackup.alt}
      className="
      aspect-video
      object-cover
      rounded-md
      block"
      />
    </li>)
  if (isLoading) return <p>Loading venue...</p>;
  if (!venue) return <p> No venue data</p>;

  return(
    <div className="flex flex-col items-center mx-auto max-w-[75%] min-h-screen mb-15 mt-10 md:border-x md:border-x-border px-2 md:px-20  text-text">
      <h1 className="font-dm font-medium text-3xl text-center mb-2">{venue.name}</h1>
      {/* Help from chatGPT to style images in ul*/}
      <div className="w-[95%] overflow-hidden">
        <ul className="flex gap-4 overflowx-auto snap-x snap-mandatory list-none p-0 m-0 ">{venueMedia}</ul>
        </div>
      <div className="flex flex-row gap-5 items-center py-2 px-5 mb-5 w-auto  shadow-xs justify-center text-xs border-b border-x rounded-b-md border-border">
        
        <div className="flex flex-row gap-2 items-center">
        <Users size={16}/> <p>
          {venue.maxGuests}
        </p>
        </div>

        <div className="flex flex-row gap-2 items-center">
        <Star size={16}/>
        <p>
          {venue.rating}
        </p>
        </div>
        <div className="flex flex-row items-center">
          <p>{venue.price} $/night</p>
        </div>
      </div>

      <div className="flex flex-row h-20 border gap-10 items-center justify-center w-full border-border rounded-md shadow-xs ">
        <div className="flex flex-col items-center">
          {venue.meta.wifi ? <Wifi size={14} className="text-primary group-active:text-white"/> : <Wifi size={14} className="text-bread "/>}
          <p className="text-xs">Wifi</p>
        </div>
        
        <div className="flex flex-col items-center">
          {venue.meta.breakfast ? <Coffee size={14} className="text-primary group-active:text-white"/> : <Coffee size={14} className="text-bread"/>}
          <p className="text-xs">Breakfast</p>
        </div>
        <div className="flex flex-col items-center">
          {venue.meta.pets ? <PawPrint size={14} className="text-primary group-active:text-white"/> : <PawPrint size={14} className="text-bread"/>}
          <p className="text-xs">Pets</p>
        </div> 
        <div className="flex flex-col items-center">
          {venue.meta.parking ? <CarFront size={14} className="text-primary group-active:text-white"/> : <CarFront size={14} className="text-bread"/>}
          <p className="text-xs">Parking</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-around mt-5 w-full border border-border rounded-md p-4 font-inter shadow-xs ">
         <div className="rounded-full border border-primary overflow-clip">
         <img src={venue.owner.avatar ? venue.owner.avatar.url : avatarFailsafe} alt={venue.owner.avatar ? venue.owner.avatar.alt : "Holidaze placeholder"} className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20  object-cover"/>
      </div>
      <p className="text-[8px] sm:text-sm">Managed by {venue.owner.name}</p>
      {accessToken ? <Link to={`/profile/${venue.owner.name}`} className="text-[12px] hover:font-medium">View profile</Link> : <Link to={"/auth/login"} className="hover:font-medium">View profile</Link>}
     
      </div>
      <div className="mt-5 w-full border border-border rounded-md p-4">
        <h2 className="font-dm font-semibold mb-2">Location</h2>
        <div className="flex flex-row justify-around items-center gap-5 text-sm">

          <div className="flex flex-col gap-5">

          <div>
          <p>Address:</p> 
          <p>{venue.location.address}</p>
          </div>
          <div>
          <p>Zip-code:</p>
          <p>{venue.location.zip}</p>
          </div>
          <div>
          <p>City:</p> 
          <p>{venue.location.city}</p>
          </div>

          </div>
          <div className="flex flex-col gap-4">

         <div> 
          <p>Country {venue.location.country}</p>
          </div>
         <div> 
          <p>Continent {venue.location.continent}</p>
          </div>
         <div>
          <p>Latitude</p> 
          <p>{venue.location.lat}</p>
          </div>
         <div> 
          <p>Longditude</p> 
          <p>{venue.location.lng}</p>
          </div>

          </div>
          
        </div>
        </div>
      <div className="mt-5 w-full border border-border rounded-md p-4">
  <h2 className="font-dm font-semibold mb-2">
    Venue description
  </h2>
  <div className="mx-auto">
    <p className="leading-7 wrap-break-word">
      {venue.description}
    </p>
  </div>
</div>
    <div className="w-full mt-15 flex flex-col gap-2 items-center">
      
     { accessToken && !isOwner ?( <>
     <h2 className="font-dm font-semibold text-xl pl-5">Place booking</h2>
     <BookingCreate venueId={venueId} maxGuests={maxGuests}/> </>)
     : isOwner ? (<><Link to={`/venues/{venueId}/edit`}><button className="mt-5 py-2 px-7 rounded-md bg-primary text-white font-inter hover:bg-primary/75  active:bg-primary ">Edit venue</button></Link></>):
    <BookingCreateGuest venueId={venueId} maxGuests={maxGuests}/>
    } 
    </div>
     
    

    </div>
  )
}