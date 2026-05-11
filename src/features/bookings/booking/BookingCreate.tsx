import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { BookingDataPOST, CreateBookingProps } from "@/interfacesAndTypes/types";
import { HOLIDAZE_URL, API_KEY, accessToken } from "@/const/const";


const initialBooking = {
  dateFrom: "",
  dateTo:"",
  guests:0,
  venueId: "",
}

function BookingCreate({venueId, maxGuests}: CreateBookingProps){

if(!accessToken)return null;

const [booking, setBooking] = useState<BookingDataPOST>({
  dateFrom: "",
  dateTo:"",
  guests:0,
  venueId: "",
})
//Calender component from https://refine.dev/blog/react-date-picker/
const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);
const pastDate = (date:Date) => date >= new Date();

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
        
        <label htmlFor="dateFrom">From</label>
        <DatePicker
        selectsStart
        filterDate={pastDate}
        selected={startDate}
        onChange={(date: Date | null) => {
          setStartDate(date);//** Help from ChatGPT to set booking using DatePicker */
          setBooking(prev => ({
            ...prev,
            dateFrom:date ? date.toISOString() : ""
          }));
        }}
        startDate={startDate}
        //https://stackoverflow.com/questions/68231708/how-to-make-react-datepicker-start-the-days-of-the-week-on-monday
        calendarStartDay={1}
        dateFormat={"dd/MM/yy"}
        />

        { startDate ?
        <>
        <label htmlFor="dateTo">To</label>
        <DatePicker
        selectsEnd
        selected={endDate}
        onChange={(date: Date | null) => {
          setEndDate(date);
          setBooking(prev => ({
            ...prev,
            dateTo:date ? date.toISOString() : ""
          }));
        }}
        endDate={endDate}
        startDate={startDate}
        minDate={startDate}
        calendarStartDay={1}
        dateFormat={"dd/MM/yy"}
        />
        </>: null}
        <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating booking..." : "Book venue"}
      </button>
     </form>
  </div>
)
}
export default BookingCreate;