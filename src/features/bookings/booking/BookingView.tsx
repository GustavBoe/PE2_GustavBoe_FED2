import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { MoveRight, SquareChevronDown, SquareChevronUp } from "lucide-react";
import { placeholder, userName } from "@/const/const";
import getBooking from "@/api/bookings/getBooking";
import BookingEdit from "@/features/bookings/booking/BookingEdit"
import type { BookingGET} from "@/interfacesAndTypes/types";

export default function BookingView(){

  const {id} = useParams<{id:string}>();
  
  const [booking, setBooking] = useState<BookingGET | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
   /*Formatter from google search on how to format iso string*/
    const formatter = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
});
    
    

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
  //Difference calculation from both google and CoPilot
  const dateFrom = new Date(booking.dateFrom);
  const dateTo = new Date(booking.dateTo);
  const formattedDateFrom = formatter.format(new Date(dateFrom));
  const formattedDateTo = formatter.format(new Date(dateTo));
  const difference = Math.abs(dateTo.getTime() - dateFrom.getTime());
  const duration =  Math.ceil(difference / (1000 * 60 * 60 * 24));;
  return(
    <div className="h-fit w-90 md:w-200 mt-10 mb-25 flex flex-col items-center text-text">
      
      <div className="flex flex-col gap-5 items-center border border-border mt-5 shadow-md rounded-md w-full h-full">
        
        <div className="border-b border-border h-40 w-full rounded-t-md overflow-clip">
          <img src={booking.venue.media?.[0]?.url || placeholder} alt="" className="w-full h-full object-cover object-center"/>
        </div>
        <h1 className="font-dm text-2xl font-semibold">Booking for {booking.venue.name}</h1>
        <div className="flex flex-row w-full justify-around items-center border-t border-border pt-4 ">
          <div className="flex flex-col items-center">
            <p className=" font-dm font-[550]">From</p>
            <p className="font-semibold border-2 border-border drop-shadow-xs  rounded-sm p-2">{formattedDateFrom}</p>
          </div>
          <MoveRight size={28} className="mt-5"/>
          <div className="flex flex-col items-center">
            <p className="font-dm font-[550]">To</p>
            <p className="font-semibold border-2 border-border drop-shadow-xs rounded-sm p-2">{formattedDateTo}</p>
          </div>
        </div>
        <div className="flex flex-col items-center border-t border-border pt-4 w-full gap-1 text-lg">
          <h3 className="font-dm">Booked for</h3>
          <p>{booking.guests} {booking.guests === 1 ? "guest" : "guests"}</p>
        </div>
        <div className="flex flex-col items-center border-t border-border pt-4 w-full gap-1 text-lg">
          <h3 className="font-dm">Estimated total</h3>
          <p>{booking.guests * booking.venue.price * duration}</p>
          </div>
          <div className="border-t border-border pt-5 text-center flex flex-row items-center justify-around gap-2">
            <p>Change of plans?</p>
            <button  onClick={() => setShowEdit(!showEdit)}>{!showEdit ? <SquareChevronDown size={24} className="text-bread hover:text-primary"/> : <SquareChevronUp size={24} className="text-bread hover:text-primary"/>}</button>
            </div>
          
        <div>
          {showEdit ? <BookingEdit maxGuests={booking.venue.maxGuests}/> : null}
        </div>
      </div>
      
     
    </div>
  )

}