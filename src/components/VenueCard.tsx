import type { venueDataApi } from '@/interfacesAndTypes/types';
import { Link } from 'react-router-dom';

export function VenueCard({...venue} : venueDataApi){
 
  return(
    <Link to={`/venues/${venue}`}>
      <h1>venue.name</h1>
      
    </Link>
  )
}