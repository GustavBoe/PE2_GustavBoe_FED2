import type { ProfileVenueBookings } from "@/interfacesAndTypes/types";
import { placeholder} from "@/const/const";
import { MoveRight, MapPinHouse, Users, User } from "lucide-react";


export function UpcomingBookingCard({...booking}:ProfileVenueBookings){
  const imageUrl =
      booking.venue.media && booking.venue.media.length > 0
        ? booking.venue.media[0].url
        : placeholder;
  
    const imageAlt =
      booking.venue.media && booking.venue.media.length > 0
        ? booking.venue.media[0].alt
        : "Holidaze placeholder";

    /*Formatter from google search on how to format iso string*/
    const formatter = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
});
    
    const formattedDateFrom = formatter.format(new Date(booking.dateFrom))
    const formattedDateTo = formatter.format(new Date(booking.dateTo))
   
  return(
    
    <div className="flex flex-row border border-border items-center gap-3 w-85 h-30 shadow-md m-5 rounded-md text-text group active:bg-success active:text-white hover:bg-border  hover:shadow-lg">
        
          <img src={imageUrl} alt={imageAlt} className="w-25 h-full object-cover rounded-l-md"/>
          
          <div className="flex flex-col w-54 gap-2">
            <div className="flex flex-row justify-between w-40">
            <div className="flex flex-row items-baseline gap-1 "><User size={18}/> {booking.customer.name}</div>
            <div className="flex flex-row items-baseline gap-1 "><Users size={18}/>{booking.guests}</div>
          </div>
          <div className="flex flex-row items-baseline gap-1 "><MapPinHouse size={18}/>{booking.venue.name.slice(0,15)}</div>
          <div className="flex flex-row text-[14px] items-center w-full justify-between">
              <h1 className="font-inter">{formattedDateFrom}</h1>
              <MoveRight size={18}/>
              <h1 className="font-inter">{formattedDateTo}</h1>
            </div>
          </div>
     
      
    </div>
    
  )
}