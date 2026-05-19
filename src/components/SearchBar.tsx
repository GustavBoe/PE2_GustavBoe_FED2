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
            venue.location.country.toLowerCase().includes(lowerSearchTerm)) ||  (venue.location.city &&
            venue.location.city.toLowerCase().includes(lowerSearchTerm)),
      );
    }

    return venuesToProcess;
  }, [allVenues, debouncedSearchTerm]);
  

  return(
    <section className="flex flex-col mt-10">
      
        <div className="mx-auto">
          <label htmlFor="venueNameSearch">
            Venue search </label>
          <input
            type="text"
            id="venueNameSearch"
            placeholder="Search venues..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-border rounded-md pl-2 shadow-xs"
            
          /></div>
          
           {processedVenues.length > 0 ? (
        <li className='md:grid md:grid-cols-2'>
          {processedVenues.map((venue) => (
            <VenueCard key={venue.id} {...venue} />
          ))}
        </li>
      ) : (
        <p className="mt-5">No venues matches your search.</p>
      )}
    
    </section>
  )
  }
