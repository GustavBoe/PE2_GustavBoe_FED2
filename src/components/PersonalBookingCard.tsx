import type { ProfileVenueBookings } from "@/interfacesAndTypes/types";
import { placeholder} from "@/const/const";
import { MoveRight, MapPinHouse, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function PersonalBookingCard({...booking}:ProfileVenueBookings){
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
const formatDate = (dateValue: any) => {
  const date = new Date(dateValue);
  return !isNaN(date.getTime()) ? formatter.format(date) : 'Invalid Date';
};
    
    const formattedDateFrom = formatDate(new Date(booking.dateFrom))
    const formattedDateTo = formatDate(new Date(booking.dateTo))
    
    //pathname check from google
    const {pathname} = useLocation();
    const firstWord = pathname.split("/")[1 || ""];
    const profilePage = firstWord ==="profile";

  return(
    <Link to={!profilePage?`/profile/${booking.customer.name}/bookings/${booking.id}`:`bookings/${booking.id}`}>
    <div className="flex flex-row border border-border items-center gap-3 w-85 h-20 shadow-md m-5 rounded-md text-text group active:bg-success active:text-white hover:bg-border  hover:shadow-lg">
        
          <img src={imageUrl} alt={imageAlt} className="w-25 h-full object-cover rounded-l-md"/>
          
          <div className="flex flex-col w-54 h-13 justify-between">
            <div className="flex flex-row text-[14px] items-center w-full justify-between">
              <h1 className="font-inter">{formattedDateFrom}</h1>
              <MoveRight size={18}/>
              <h1 className="font-inter">{formattedDateTo}</h1>
            </div>
            <div className="flex flex-row justify-between w-40">
             <div className="flex flex-row items-baseline gap-1 "><MapPinHouse size={18}/>{booking.venue.name.slice(0,15)}</div>
             <div className="flex flex-row items-baseline gap-1 "><Users size={18}/>{booking.guests}</div>
          </div>
          </div>
     
      
    </div>
    </Link>
  )
}