import { HOLIDAZE_URL, API_KEY,accessToken, userName } from "@/const/const";

export default async function getProfileBookings() {
     try {
        const response = await fetch(
          `${HOLIDAZE_URL}/profiles/${userName}/bookings?_venue=true&_customer=true`,
           {headers: 
            {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
            }
          }
        );
        const responseData = await response.json();
        const data = responseData.data;
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