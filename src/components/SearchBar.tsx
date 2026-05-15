import { useState,useEffect, useMemo } from 'react';
import type { VenuesAllViewProps } from '@/interfacesAndTypes/types';
import { VenueCard } from './VenueCard';

//Function "made to fit" from Module 3.3 Implementing Client Side Searching of API Data

export default function SearchBar({allVenues}:VenuesAllViewProps){

  const [inputValue, setInputValue] = useState('');

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

   useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchTerm(inputValue);

     }, 500)
     return () => {
      clearTimeout(handler); 
    };
  }, [inputValue]);


  const processedVenues = useMemo(() => {
    
    let venuesToProcess = [...allVenues];
    if (debouncedSearchTerm.trim() !== '') {
      const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
      venuesToProcess = venuesToProcess.filter(
        (venue) =>
          venue.name.toLowerCase().includes(lowerSearchTerm) ||
          (venue.location.country &&
            venue.location.country.toLowerCase().includes(lowerSearchTerm)),
      );
    }

    return venuesToProcess;
  }, [allVenues, debouncedSearchTerm]);
  

  return(
    <section>
      <div>
          <label htmlFor="venueNameSearch">
            Venue search </label>
          <input
            type="text"
            id="venueNameSearch"
            placeholder="Search venues..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            
          />
           {processedVenues.length > 0 ? (
        <li>
          {processedVenues.map((venue) => (
            <VenueCard key={venue.id} {...venue} />
          ))}
        </li>
      ) : (
        <p>No venues match your search.</p>
      )}
        </div>
    </section>
  )
  }
