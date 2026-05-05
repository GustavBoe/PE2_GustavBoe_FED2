import { HOLIDAZE_URL, API_KEY, accessToken} from "@/const/const";

export default async function deleteVenue(id: string) {
  try{
    const response = await fetch(`${HOLIDAZE_URL}/venues/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY, 
      Authorization: `Bearer ${accessToken}`,
    },
  })
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
}
