import { HOLIDAZE_URL, accessToken, API_KEY } from "@/const/const";

export default async function getProfile(name:string) {
     try {
        const response = await fetch(
          `${HOLIDAZE_URL}/profiles/${name}`,
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
