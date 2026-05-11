import { HOLIDAZE_URL, API_KEY, accessToken} from "@/const/const";

export default async function deleteVenue(id: string) {
  try{
    const response = await fetch(`${HOLIDAZE_URL}/bookings/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY, 
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response;

      }
      catch (err) {
        alert(err) 
      } 
}

/**const handleDelete = async() => {
        if(!id){
        alert("Unable to get venue");
        return null;
        }
        try{
          const response = await deleteVenue(id);
          if (!response) {
            alert("Could not delete venue");
            navigate(`/bookings/${id}/edit`);
            return;
          }

          if (response.status === 204) {
            alert("Venue was deleted");
            navigate(`/profile/${userName}`);
          }
        }

        catch (err) {
        alert(err) 
      }
      
      finally{
      setIsLoading(false)  
      }
      };*/