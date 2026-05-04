

type image = {
  url:string;
  alt:string;
}
export type logUserData = {
  email:string;
  password:string;
}
export type regUserData = logUserData & {
  name:string;
  venueManager:boolean;
}
export type userData = regUserData & {
  bio?:string;
  avatar: image;
  banner:image;
  
}
export type getProfileDataProps = {
  name:string;
}
export type editProfileDataProps = {
  venueManager:boolean;
  bio?:string;
  avatar: image;
  banner:image;
}
type venueMeta = {
  wifi:boolean;
  parking:boolean;
  breakfast:boolean;
  pets:boolean;
}
type venueLocation = {
  address: string; 
  city: string; 
  zip: string; 
  country: string; 
  continent: string; 
  lat: number; 
  ong: number;
}
export type VenueDataApi = {
   id: string;
  name: string;
  description: string;
  media:image[];
  price:number;
  maxGuests:number;
  rating:number;
  created: string;
  updated: string;
  meta: venueMeta;
  location:venueLocation;
  _owner:userData;
  
}