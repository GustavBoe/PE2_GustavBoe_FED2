import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import type { BookingGET, venueDataOwner, Customer } from "@/interfacesAndTypes/types";
import getBooking from "@/api/bookings/getBooking";


export default function BookingSuccess(){
  
  const {id} = useParams<{id:string}>();
  const [booking, setBooking] = useState<BookingGET>({
      id:"",
      guests:0,
      dateFrom:"",
      dateTo:"",
      created:"",
      updated:"",
      venue: {} as venueDataOwner,
      customer: {}as Customer
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    
       useEffect(() => {
              
            if (!id) return;
            
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
      <h1>Booked!</h1>
    <p>Your booking of {booking.venue.name} was successful!</p>
    <div>
      <Link to={`/profile/${booking.customer.name}/bookings/${booking.id}`}><button>View booking</button></Link>
    
    </div>
   
    </div>
  )
}