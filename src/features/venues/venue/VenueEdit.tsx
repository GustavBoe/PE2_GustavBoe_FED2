import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getVenue from "@/api/venues/getVenue";
import deleteVenue from "@/api/venues/deleteVenue";
import type { image, venueDataApi } from "@/interfacesAndTypes/types";
import { API_KEY, HOLIDAZE_URL, accessToken, userName } from "@/const/const";

export default function VenueEdit(){

  const {id} = useParams<{id:string}>();
  
  const [venue, setVenue] = useState<venueDataApi>({
      name: "",
      description: "",
      media:[] as image[],
      price:0,
      maxGuests:0,
      rating:0,
      created: "",
      updated: "",
      meta: {
        wifi: false,
        parking:false,
        breakfast:false,
        pets:false
      },
      location:{
        address:"",
        city:"",
        zip:"",
        country:"",
        continent:"",
        lat:0,
        lng:0
      } 
    });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  useEffect(() => {

    if (!id) return;      
    if(!accessToken){
        alert("Log in to view this page.")
        navigate("/auth/login")
        return
      }
    
      const loadVenue = async() => {
        setIsLoading(true)
        try{
          const venueData = await getVenue(id)
          
          if(venueData.owner.name !== userName){
            alert("Permission denied, redirecting..")
            navigate("/")
          };
          setVenue({
            name: venueData.name,
            description: venueData.description,
            media:[] as image[],
            price:venueData.price,
            maxGuests:venueData.maxGuests,
            rating:venueData.rating,
            created: venueData.created,
            updated: venueData.updated,
            meta: {
              wifi: venueData.meta.wifi,
              parking:venueData.meta.parking,
              breakfast:venueData.meta.breakfast,
              pets:venueData.meta.pets
            },
            location:{
              address:"",
             city:"",
             zip:"",
             country:"",
             continent:"",
             lat:0,
              lng:0
            } 
          })
        }
        catch (err) {
        alert(err)  
      } finally {
        setIsLoading(false);
      }
      }
      loadVenue();
      }, [id, navigate]);

      if (isLoading) return <p>Loading...</p>;
      if (!venue){
        alert("Unable to fetch venue data, returning to home");
        navigate("/")
        return
      }

      const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try{
          const response = await fetch(`${HOLIDAZE_URL}/venues/${id}`, {
            method: "PUT",
            headers:{
              "Content-Type": "application/json",
              "X-Noroff-API-Key": API_KEY,
              Authorization: `Bearer ${accessToken}`,
              
            },
            body: JSON.stringify(venue)
          });
          const responseData = await response.json()
          console.log(responseData);
          if(!response.ok){
            console.log(API_KEY)
            const errorMessage = 
            responseData.errors?.[0]?.message ||
             `Error: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }
        
        //navigate(`/venues/${id}`)
      }
      catch (error){
        console.log("Could not register user:",error)
      }
      finally{
        setIsSubmitting(false)
        }
      };
      const handleDelete = async() => {
        if(!id){
        alert("Unable to get venue");
        return null;
        }
        try{
          const deleteResponse = await deleteVenue(id);
          if(!deleteResponse){
            alert("Could not delete venue")
            navigate(`/venues/${id}/edit`)
          }
          if(deleteResponse.status === 204){
            alert("Venue was deleted");
            navigate(`profile/${userName}`)
          }
        }
        catch (err) {
        alert(err) 
      }
      finally{
      setIsLoading(false)  
      }
      };
      return(
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col mx-auto justify-center">
            <h2 className="self-center">Edit venue</h2>
            <div className="flex flex-col mx-auto justify-center con">
              <div className="flex flex-col mx-auto justify-around gap-2">

             <label htmlFor="name">Name of venue</label>
              <input
              id="name"
              type="text"
              value={venue.name}
              placeholder={venue.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
                setVenue(prev => ({...prev,
                   name: e.target.value
                  }))
                }
              />

            <label htmlFor="description">Describe your venue</label>
              <textarea
              id="description"
              value={venue.description}
              placeholder={venue.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=> 
                setVenue(prev => ({...prev,
                   description: e.target.value
                  }))
                }
              />

            <label htmlFor="price">Set price:</label>
              <input 
              type="number"
              id="price"
              value={venue.price}
              placeholder={`${venue.price}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
                setVenue(prev => ({...prev,
                   price: Number(e.target.value),
                  }))
                }  
                />

            <label htmlFor="maxGuests">Maximum amount of guests:</label>
              <input 
              type="number"
              id="maxGuests"
              value={venue.maxGuests}
              placeholder={`${venue.maxGuests}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
                setVenue(prev => ({...prev,
                   maxGuests: Number(e.target.value),
                  }))
                }
              />

              <label htmlFor="rating">Rating:</label>
                <input 
                type="number"
                id="rating"
                value={venue.rating}
                placeholder={`${venue.rating}`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
                  setVenue(prev => ({...prev,
                     rating: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="flex flex-col mx-auto justify-center">
                <h2>Accomodations:</h2>
                <label htmlFor="wifi">Wifi</label>
                  <input
                  type="checkbox"
                  id="wifi"
                  checked={venue.meta.wifi}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                    setVenue(prev => ({
                      ...prev,
                      meta:{
                        ...prev.meta,
                        wifi: e.target.checked
                      }
                    }))
                  
                  }
                  />
                <label htmlFor="parking">Parking</label>
                  <input
                  type="checkbox"
                  id="parking"
                  checked={venue.meta.parking}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                    setVenue(prev => ({
                      ...prev,
                      meta:{
                        ...prev.meta,
                        parking: e.target.checked
                      }
                    }))
                  
                  }
                  />
                <label htmlFor="breakfast">Breakfast</label>
                  <input
                  type="checkbox"
                  id="breakfast"
                  checked={venue.meta.breakfast}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                    setVenue(prev => ({
                      ...prev,
                      meta:{
                        ...prev.meta,
                        breakfast: e.target.checked
                      }
                    }))
                  
                  }
                  />
                <label htmlFor="pets">Pets</label>
                  <input
                  type="checkbox"
                  id="pets"
                  checked={venue.meta.pets}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                    setVenue(prev => ({
                      ...prev,
                      meta:{
                        ...prev.meta,
                        pets: e.target.checked
                      }
                    }))
                  
                  }
                  />
              </div>
              <div className="flex flex-col mx-auto justify-center">
                <h2>Location</h2>
                  <label htmlFor="address">Address</label>
        <input 
        type="text"
        id="address"
        value={venue.location.address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                address: e.target.value
              }
            }))
          }
        />
        <label htmlFor="city">City</label>
        <input 
        type="text"
        id="city"
        value={venue.location.city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                city: e.target.value
              }
            }))
          }
        />
        <label htmlFor="zip">Zip code</label>
        <input 
        type="text"
        id="zip"
        value={venue.location.zip}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                zip: e.target.value
              }
            }))
          }
        />
        <label htmlFor="country">Country</label>
        <input 
        type="text"
        id="country"
        value={venue.location.country}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                country: e.target.value
              }
            }))
          }
      />
      <label htmlFor="continent">Continent</label>
        <input 
        type="text"
        id="continent"
        value={venue.location.continent}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                continent: e.target.value
              }
            }))
          }
        />
        <label htmlFor="lat">Lat</label>
        <input 
        type="number"
        id="lat"
        value={venue.location.lat}
        placeholder={`${venue.location.lat}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                lat: Number(e.target.value)
              }
            }))
          }
        />
        <label htmlFor="lng">Lng</label>
        <input 
        type="number"
        id="lng"
        value={venue.location.lng}
        placeholder={`${venue.location.lng}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          setVenue(prev => ({
              ...prev,
              location:{
                ...prev.location,
                lng: Number(e.target.value)
              }
            }))
          }
        />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving changes..' : 'Save changes'}
            </button>
          </form>
        <button type="button" onClick={handleDelete} >Delete venue</button>
        </div>
      )
  }