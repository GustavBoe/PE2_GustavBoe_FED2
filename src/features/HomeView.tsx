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

  return(
    <div>
    {isLoading ? 
    <div className="flex items-center justify-center min-h-screen">
    <p className="animate-bounce text-xl text-primary font-medium">
      Holidazing...
    </p>
  </div> : (
      <section className="flex flex-col items-center text-text  mb-20">
    <div className="relative flex justify-center text-white overflow-hidden h-165 w-full mb-10">
      <img src="https://i.imghippo.com/files/ohKo6602UDk.jpg" alt="Image" className="w-full h-full object-cover object-center blur-[1px]"/>
      <div className="absolute inset-0 bg-primary/70"></div>
      <div className="flex flex-col text-center items-center absolute bottom-0 h-full">
      <h1 className="font-dm font-medium text-4xl md:text-5xl w-60 md:w-100 mt-30 md:mt-25">
        Find the perfect venue for your next event.
      </h1>
      <p className="font-inter text-lg w-90 mt-20">
        Browse unique spaces, compare options, and book with confidence.
      </p>
      <Link to={"/venues"} className="mt-25 font-inter font-medium text-xl w-50 py-1 px-2 rounded-md bg-CTA/95 hover:bg-CTA/90 active:bg-CTA ">Explore venues</Link>
      </div>
    </div>
    
    <h2 className="font-dm text-3xl">Popular venues</h2>

    <div className="flex flex-row items-center mt-5 h-92 w-95 md:w-190 overflow-x-auto snap-x snap-mandatory scroll-smooth">
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
   )}
  </div>
  )
}