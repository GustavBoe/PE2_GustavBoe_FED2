import type { VenueDataApi } from '@/interfacesAndTypes/types';
import { Link } from 'react-router-dom';

export function VenueCard({...venue} : VenueDataApi){
 
  return(
    <Link to={`/venues/${venue.id}`}>
      <h1>venue.name</h1>
      
    </Link>
  )
}