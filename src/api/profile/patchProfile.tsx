import { HOLIDAZE_URL, accessToken, API_KEY } from "@/const/const";

export default async function patchProfile(name:string) {
  const [user, setUser] = useState<logUserData>({
   venueManager:boolean;
  bio?:string;
  avatar?: image;
  banner?:image;,
   
  });
     try {
        const response = await fetch(
          `${HOLIDAZE_URL}/profiles/${name}`,
            {method:"PATCH",
              headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": API_KEY,
               body: JSON.stringify(user)
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
