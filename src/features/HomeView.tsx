import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import type { VenuesWithBookings } from "@/interfacesAndTypes/types";
import getAllVenues from "@/api/venues/getAllVenues";
import { PopularVenueCard } from "@/components/PopularVenueCard";
import { accessToken } from "@/const/const";

export default function HomeView(){

  const [venues, setVenues] = useState<VenuesWithBookings[]>([]);

  const sortedVenues = [...venues].sort(
  (a,b) => (b.rating ?? 0) - (a.rating ?? 0)
);

  const popularVenues = sortedVenues.slice(0,6);

  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const loadVenues = async()=>{
      setIsLoading(true)

      try{
        const venueData = await getAllVenues();
       
        setVenues(venueData.data ?? []);


      }
      catch(error){
        alert("Could not get venues, see console for details");
        console.log(error);
      }
      finally{
        setIsLoading(false)
      }
    }
    loadVenues()
  }, [])
 if (isLoading) return <p>Holidazing...</p>;
  return(
  <section className="flex flex-col items-center text-text">
    <div className="relative flex justify-center text-white overflow-hidden h-150 w-full mb-20">
      <img src="https://i.imghippo.com/files/ohKo6602UDk.jpg" alt="Image" className="w-full h-full object-cover object-center blur-[1px]"/>
      <div className="absolute inset-0 bg-primary/70"></div>
      <div className="flex flex-col text-center items-center absolute bottom-0 h-full">
      <h1 className="font-dm font-medium text-4xl w-60 mt-15">
        Find the perfect venue for your next event.
      </h1>
      <p className="font-inter text-lg w-90 mt-15">
        Browse unique spaces, compare options, and book with confidence.
      </p>
      <Link to={"/venues"} className="mt-25 font-inter font-medium text-lg w-50 bg-CTA py-1 rounded-md">Explore venues</Link>
      </div>
    </div>
    
    <h2 className="font-dm text-2xl">Popular venues</h2>

    <div className="flex flex-row h-50 w-90 md:w-180 overflow-x-auto snap-x snap-mandatory scroll-smooth">
   {popularVenues.map(venue => (
    <div className="snap-center shrink-0">
    <PopularVenueCard key={venue.id} {...venue} />
    
    </div>
    ))}
    </div>
  {!accessToken ? 
    <div className="flex flex-col mt-10 text-center gap-2">
      <h3 className="font-dm font-medium text-xl ">Found someplace you like?</h3>
      <div className=" flex flex-col md:flex-row text-sm font-inter gap-2">
      <Link to={"/auth/login"}><p className="underline">Log in to place a booking</p></Link>
      <p>or</p>
      <Link to={"/auth/register"}><p className="underline">Register new user</p></Link>
      </div>
    </div> 
    : null
  }
  </section>
   
  )
}