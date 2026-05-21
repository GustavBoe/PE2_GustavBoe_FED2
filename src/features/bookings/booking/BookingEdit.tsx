import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { BookingDataPUT, BookingProps} from "@/interfacesAndTypes/types";
import { HOLIDAZE_URL, API_KEY, accessToken, userName } from "@/const/const";
import deleteBooking from "@/api/bookings/deleteBooking";
import getBooking from "@/api/bookings/getBooking";
import { Minus } from "lucide-react";


export default function BookingEdit({maxGuests}:BookingProps){

if(!accessToken)return null;

const {id} = useParams<{id:string}>();

const [booking, setBooking] = useState<BookingDataPUT>({
  guests:0,
  dateFrom: "",
  dateTo:"",
  
})

//Calender component from https://refine.dev/blog/react-date-picker/
const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);
const pastDate = (date:Date) => date >= new Date();

const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
useEffect(()=>{
   if (!id){
      alert("Could not get booking")
      navigate("/")
    }      
    if(!accessToken){
        alert("Log in to view this page.")
        navigate("/auth/login")
        return
      }
      const loadBooking = async() =>{
        setIsLoading(true)
        try{
          if(!id) return;
          const bookingData = await getBooking(id);
          if(bookingData.customer.name !== userName){
            alert("Permission denied, redirecting..")
            navigate("/")
          };
          setBooking({
            guests: bookingData.guests,
            dateFrom: bookingData.dateFrom,
            dateTo:bookingData.dateTo,
            
          });
          //Help from ChatGPT on adding value from API to calendar
          setStartDate(new Date(bookingData.dateFrom));
          setEndDate(new Date(bookingData.dateTo));
          setIsLoading(false)
        }
        catch(err){
          alert(err)
          setIsLoading(false)
        }
        finally{
          setIsLoading(false)
        }
      }
      loadBooking();
}, [id, navigate]);
if(isLoading) return <p className="animate-bounce font-parkinsans">Holidazing...</p>
if(!booking){
   alert("Unable to fetch booking data, returning to home");
        navigate("/")
        return
}
const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try{
    
    const response = await fetch(`${HOLIDAZE_URL}/bookings/${id}`, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(booking)
    });
    const responseData = await response.json()
    
    if(!response.ok){
      const errorMessage = 
      responseData.errors?.[0]?.message ||
       `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
  }
  
  
  navigate(`/bookings/success/${responseData.data.id}`)
}
catch (error){
  console.log("Could not create booking:",error)
}
finally{
  setIsSubmitting(false)
  }
};
const handleDelete = async() => {
    
        if(!id){
        alert("Unable to get venue");
        return null;
        }
        confirm("Are you sure you want to cancel your booking?")
        if(!confirm) return
        try{
          const response = await deleteBooking(id);
          if (!response) {
            alert("Could not delete venue");
            navigate(`/venues/${id}/edit`);
            return;
          }

          if (response.status === 204) {
            alert("Booking was canceled");
            navigate(`/profile/${userName}`);
          }
        }

        catch (err) {
        alert(err) 
      }
      
      finally{
      setIsLoading(false)  
      }
      };
return(
  <section className="w-full md:w-200 h-fit flex flex-col items-center justify-between text-text mb-10">
  <div className="flex flex-col items-center w-80 md:w-[80%] border border-border bg-white rounded-md drop-shadow-lg">
     <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white font-inter pt-2 h-75 gap-5">
         <div className="flex flex-col items-center gap-2">
          <label htmlFor="guests" className="font-medium">Number of guests</label>
          <input 
        type="number"
        id="guests"
        max={maxGuests}
        value={booking.guests === 0 ? "" : booking.guests}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setBooking(prev => ({...prev,
             guests: Number(e.target.value),
            }))
          }
        className=" text-center w-15 pl-3 inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"

        />
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="flex flex-col items-center">
        <label htmlFor="dateFrom" className="font-medium">From</label>
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
        endDate={endDate}

        //https://stackoverflow.com/questions/68231708/how-to-make-react-datepicker-start-the-days-of-the-week-on-monday
        calendarStartDay={1}
        dateFormat={"dd/MM/yy"}
        id="dateFrom"
        className="text-center w-20 inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
        <Minus size={24} className="mt-5"/>
      <div className="flex flex-col items-center">
        { startDate ?
        <>
        <label htmlFor="dateTo" className="font-medium">To</label>
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
        id="dateTo"
        className="text-center w-20 inset-shadow-sm rounded-md border border-primary/25 h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        
        </>: null}
        </div>
        </div>
        <div className="flex flex-col gap-5">
          <button type="submit" disabled={isSubmitting} className="px-7 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white">
        {isSubmitting ? "Saving changes..." : "Save changes"}
      </button>
       <button type="button" onClick={handleDelete} className="px-5 py-1 border border-alarm text-alarm rounded-md hover:bg-alarm hover:text-white">Cancel booking</button>
        </div>
        
     </form>
    
  </div>
  </section>
)
}
