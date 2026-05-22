import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import {CircleCheck, CircleArrowRight} from "lucide-react"
import type { BookingGET, venueDataOwner, Customer } from "@/interfacesAndTypes/types";
import getBooking from "@/api/bookings/getBooking";
import {PersonalBookingCard} from "@/components/PersonalBookingCard"


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
  if(!booking.id) return <p>No booking data</p>
  return(
    <div className="w-full pb-15 flex flex-col items-center ">
      <div className="border border-border rounded-md py-10 w-[95%] flex flex-col items-center mt-20 text-text">
         <CircleCheck size={48} className="text-success"/>
         <h1>Booked!</h1>
    <p>Your booking was successful!</p>
    <div className="flex flex-col items-center">
      <div className="read-only">
      <PersonalBookingCard {...booking}/>
      </div>
      <Link to={`/profile/${booking.customer.name}/bookings/${id}`}>
      <div className="flex flex-row items-center gap-2 py-2 px-7 border border-border rounded-md shadow-lg">
        <p>Go to booking</p>
       <CircleArrowRight size={18}/>
      </div>
      </Link>
    
    </div>
      </div>
     
   
    </div>
  )
}