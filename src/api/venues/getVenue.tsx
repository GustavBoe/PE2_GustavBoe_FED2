import { HOLIDAZE_URL} from "@/const/const";

export default async function getVenue(id:string) {
     try {
        const response = await fetch(
          `${HOLIDAZE_URL}/venues/${id}?_owner=true&_bookings=true`
        );
        const data = await response.json();

        if(!response.ok){
      const errorMessage = 
      data.errors?.[0]?.message ||
       `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
      }
        return data;
      }
      catch (err) {
        alert(err) 
      } 
    };
