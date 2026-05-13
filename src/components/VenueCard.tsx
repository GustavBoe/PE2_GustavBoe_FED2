
import type { AllVenuesData } from '@/interfacesAndTypes/types';
import { Link } from 'react-router-dom';

export function VenueCard({...venue} : AllVenuesData){
 
  return(
    <Link to={`/venues/${venue.id}`}>
      <div>
        
        <div></div>
      <h1>{venue.name}</h1>

      </div>
    </Link>
  )
}