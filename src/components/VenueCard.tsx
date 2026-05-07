import type { AllVenuesData } from '@/interfacesAndTypes/types';
import { Link } from 'react-router-dom';

export function VenueCard({...venue} : AllVenuesData){
 
  return(
    <Link to={`/venues/${venue.id}`}>
      <h1>{venue.id}</h1>
      
    </Link>
  )
}