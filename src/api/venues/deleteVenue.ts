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
  if (response.status === 204) {
    return { success: true };
  }
  
      }
      catch (err) {
        alert(err) 
      } 
}
