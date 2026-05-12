import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { BookingDataPOST, CreateBookingProps,image, userData, VenueCheckBookings } from "@/interfacesAndTypes/types";
import { HOLIDAZE_URL, API_KEY, accessToken } from "@/const/const";
import getVenue from "@/api/venues/getVenue";


const initialBooking = {
  dateFrom: "",
  dateTo:"",
  guests:0,
  venueId: "",
}

function BookingCreate({venueId, maxGuests}: CreateBookingProps){

if(!accessToken)return null;
const [isLoading, setIsLoading] = useState(false);
const [booking, setBooking] = useState<BookingDataPOST>({
  dateFrom: "",
  dateTo:"",
  guests:0,
  venueId: "",
})
//Calender component from https://refine.dev/blog/react-date-picker/
const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);
const [venueBookingFilter, setVenueBookingFilter] = useState<VenueCheckBookings>({
    id:"",
    name:"",
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
    bookings:[]
})
const [rangeError, setRangeError] = useState("");
useEffect(()=>{
  const loadVenue = async () => {
    setIsLoading(true);
    try{
  const venueData = await getVenue(venueId)
  setVenueBookingFilter(venueData)
}
catch (err) {
        alert(err)
        
      } finally {
        setIsLoading(false);
      }
  };
  loadVenue()
}, [venueId]);


// Adding already booked dates filter, with help from ChatGPT.
const getGuestsForDate = (date: Date) => {
  return venueBookingFilter.bookings.reduce((total, booking) => {
    const from = new Date(booking.dateFrom);
    const to = new Date(booking.dateTo);

    const overlaps =
      date >= from &&
      date < to;

    return overlaps
      ? total + booking.guests
      : total;
  }, 0);
};
const isAvailable = (date: Date) => {
   const today = new Date();

  today.setHours(0, 0, 0, 0);

  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  const guestsBooked = getGuestsForDate(date);
  if (compareDate < today) {
    return false;
  }
  if (booking.guests <= 0) return false;

  

  return (
    guestsBooked + booking.guests <=
    venueBookingFilter.maxGuests
  );
};
const isRangeAvailable = (
  start: Date,
  end: Date
) => {
  const current = new Date(start.getTime());

  while (current <= end) {
    const bookedGuests = getGuestsForDate(current);

    if (
      bookedGuests + booking.guests >
      venueBookingFilter.maxGuests
    ) {
      return false;
    }

    current.setDate(current.getDate() + 1);
  }

  return true;
};

const navigate = useNavigate();
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try{
    const payload = {
      ...booking,
      venueId
    }
    const response = await fetch(`${HOLIDAZE_URL}/bookings`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload)
    });
    const responseData = await response.json()
    
    if(!response.ok){
      const errorMessage = 
      responseData.errors?.[0]?.message ||
       `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
  }
  
  setBooking(initialBooking)
  navigate(`/bookings/success/${responseData.data.id}`)
}
catch (error){
  console.log("Could not create booking:",error)
}
finally{
  setIsSubmitting(false)
  }
};
if (isLoading) return <p>Loading booking...</p>;
return(
  <div>
     <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-45">
       
       <label htmlFor="venueId">Venue ID</label>
        <input 
        type="text"
        id="venueId"
        value={venueId}
          readOnly
          required
        />
        <label htmlFor="guests">Number of guests</label>
          <input 
        type="number"
        id="guests"
        value={booking.guests === 0 ? "" : booking.guests}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setBooking(prev => ({...prev,
             guests: Number(e.target.value),
            }))
          }
          placeholder={`Max ${maxGuests} guests`}
          required
        />
        
        <label htmlFor="bookingDates">Select dates</label>
       <DatePicker
        calendarClassName="hover:pointer"
        
        id="bookingDates"
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(dates: [Date | null, Date | null] | null)=> {
          if (!dates || (dates[0] === null && dates[1] === null)) {
          setStartDate(null);
          setEndDate(null);
        
          setBooking(prev => ({
          ...prev,
          dateFrom: "",
          dateTo: "",
        }));
      
        setRangeError("");
        return;
      }
        const [start, end] = dates;
           
         if (!start) return;
           
         if (!end) {
           setStartDate(start);
           setEndDate(null);
           return;
         }
       
         if (!isRangeAvailable(start, end)) {
          
           setRangeError("Selected range exceeds guest capacity");
           return;
         }
         setRangeError("");
         setStartDate(start);
         setEndDate(end);
       
         setBooking(prev => ({
           ...prev,
           dateFrom: start.toISOString(),
           dateTo: end.toISOString(),
         }));
       }}
        filterDate={isAvailable}
        dateFormat={"dd/MM/yy"}
        calendarStartDay={1}
        isClearable
        shouldCloseOnSelect={false}
        showDisabledMonthNavigation
/>
       {rangeError && (
          <p className="text-alarm">
          {rangeError}
          </p>
        )}
        <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating booking..." : "Book venue"}
      </button>
     </form>
  </div>
)
}
export default BookingCreate;