import type { AllVenuesData } from '@/interfacesAndTypes/types';
import { Link } from 'react-router-dom';
import {Wifi, Coffee,PawPrint, CarFront, MapPin, Users, Star} from "lucide-react";
import { placeholder } from '@/const/const';

export function VenueCard({...venue} : AllVenuesData){
    
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
      <div className="flex flex-row gap-3 w-85 h-30 shadow-md m-5 rounded-md text-text group active:bg-success active:text-white hover:bg-border  hover:shadow-lg">
        
        <div >
          <img src={imageUrl} alt={imageAlt} className="w-25 h-full object-cover rounded-l-md"/>
          </div>
        
        <div className="flex flex-col items-start gap-2 w-55 pt-2 pr-5">
          
          <h1 className="font-dm text-lg">{venue.name.slice(0,22)}..</h1>
          
          <div className="flex flex-row justify-between w-30">
          {venue.meta.wifi ? <Wifi size={14} className="text-primary group-active:text-white"/> : <Wifi size={14} className="text-bread "/>}
          {venue.meta.breakfast ? <Coffee size={14} className="text-primary group-active:text-white"/> : <Coffee size={14} className="text-bread"/>}
          {venue.meta.pets ? <PawPrint size={14} className="text-primary group-active:text-white"/> : <PawPrint size={14} className="text-bread"/>}
          {venue.meta.parking ? <CarFront size={14} className="text-primary group-active:text-white"/> : <CarFront size={14} className="text-bread"/>}
          </div>
          
          <div className="flex flex-row items-center justify-evenly text-xs font-inter gap-1">
          <MapPin size={12}/>
          {!venue.location.country ? <p>Contact for location</p> : <p>{venue.location.city}, {venue.location.country}</p>}
          </div>
          
          <div className="flex flex-row items-center justify-between w-40">

            <div className="flex flex-row items-center gap-1">
              <Users size={12} className="text-primary group-active:text-white"/> 
              <p className="text-xs">{venue.maxGuests}</p>
            </div>

            <div className="flex flex-row items-center gap-1">
              <Star size={12} className="text-primary group-active:text-white"/>
              <p className="text-xs">{venue.rating}</p>
            </div>
          
            <div className="flex flex-row items-center text-xs gap-1">
              <p>{venue.price} $/day</p>
            </div>
            
          </div>
        </div>
      

      </div>
    </Link>
  )
}