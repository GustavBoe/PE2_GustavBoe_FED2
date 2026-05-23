import { HOLIDAZE_URL, accessToken, API_KEY} from "@/const/const";

export default async function getProfileVenues(profile:string) {
     try {
        const response = await fetch(
          `${HOLIDAZE_URL}/profiles/${profile}/venues?_bookings=true&_owner=true`,
          {headers: {
             Authorization: `Bearer ${accessToken}`,
                        "X-Noroff-API-Key": API_KEY,
                      }}
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