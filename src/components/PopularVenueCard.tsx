
import type { AllVenuesData } from '@/interfacesAndTypes/types';
import { Link } from 'react-router-dom';
import {Users, Star} from "lucide-react";

export function PopularVenueCard({...venue} : AllVenuesData){
    const placeholder = "https://i.imghippo.com/files/Mchh9030os.png" 
  const imageUrl =
    venue.media && venue.media.length > 0
      ? venue.media[0].url
      : placeholder;

  const imageAlt =
    venue.media && venue.media.length > 0
      ? venue.media[0].alt
      : "Holidaze placeholder";
  return(
    <Link to={`/venues/${venue.id}`}>
      <div className="flex flex-col items-center  gap-3 w-85 h-90 shadow-md mx-5 rounded-md text-text group active:bg-success active:text-white  hover:shadow-lg">
        
        <div className=' '>
          <img src={imageUrl} alt={imageAlt} className="object-cover w-85 h-50 rounded-t-md"/>
          </div>
        
        <div className="flex flex-col items-center gap-5 w-55 pt-2 pr-5">
          
          <h1 className="font-dm text-2xl">{venue.name.slice(0,20)}</h1>
          
          <div className="grid grid-cols-3 items-center w-60">

          <div className="flex items-center justify-center gap-1">
            <Users
              size={20}
              className="text-primary group-active:text-white"
            />
            <span className="text-xs">
              {venue.maxGuests}
            </span>
          </div>

          <div className="flex items-center justify-center gap-1">
            <Star
              size={20}
              className="text-primary group-active:text-white"
            />
            <span className="text-xs">
              {venue.rating}
            </span>
          </div>

          <div className="flex items-center justify-center gap-1">
            <span className="text-xs font-inter">
              {venue.price} $/day
            </span>
          </div>

        </div>
          <Link to={`/venues/${venue.id}`}><button className="px-8 py-1 border font-inter bg-primary hover:bg-primary/70 text-white rounded-sm cursor-pointer">View venue</button></Link>
        </div>
      

      </div>
    </Link>
  )
}