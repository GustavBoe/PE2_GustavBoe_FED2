import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userName } from "@/const/const";
import getBooking from "@/api/bookings/getBooking";
import type { BookingGET} from "@/interfacesAndTypes/types";

export default function BookingView(){

  const {id} = useParams<{id:string}>();
  
  const [booking, setBooking] = useState<BookingGET | null>(null);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
          
        if (!id) return;
        if (booking && userName?.trim() !== booking.customer.name.trim()){
          alert("Permission denied");
          navigate("/");
          return;
        } 
          const loadBooking = async() => {
            setIsLoading(true)
            try{
                      const bookingData = await getBooking(id);

                      setBooking({
                        id:bookingData.id,
                        guests: bookingData.guests,
                        dateFrom: bookingData.dateFrom,
                        dateTo: bookingData.dateTo,
                        created: bookingData.created,
                        updated: bookingData.updated,
                        venue: bookingData.venue,
                        customer: bookingData.customer
                      })  
                    }
            catch (err) {
            alert(err)
            
          } finally {
            setIsLoading(false);
          }
        }
          loadBooking();
          
      }, [id, navigate]);

  if(isLoading) return <p>Loading booking..</p>;
  if(!booking) return <p>No booking data</p>
  
  
  
  return(
    <div>
      <h1>{booking.dateFrom} - {booking.dateTo}</h1>
      <p>{booking.venue.name}</p>
      <p>{booking.guests}</p>
    </div>
  )

}