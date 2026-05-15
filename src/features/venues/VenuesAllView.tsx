import { useEffect, useState } from "react"

import type { AllVenuesData } from "@/interfacesAndTypes/types";
import getAllVenues from "@/api/venues/getAllVenues";

import SearchBar from "@/components/SearchBar";

export default function VenuesAll(){
  const [venues, setVenues] = useState<AllVenuesData[]>([]);
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
      
    {isLoading ? <p>Loading venues...</p> : <SearchBar allVenues={venues}/>}
    
    </div>
  )
  
}