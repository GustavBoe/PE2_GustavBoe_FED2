

export type image = {
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
export type UserProfileData = userData & {
  venues: venueDataApi[];
  bookings: UserProfileBookings[];
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
export type AllVenuesData = {
  id: string;
  name: string;
  description: string;
  media?:image[];
  price:number;
  maxGuests:number;
  rating?:number;
  meta: venueMeta;
  location:venueLocation;
}
export type VenuesWithBookings = AllVenuesData & {
  bookings?: BookingGET[];
}
export type venueMeta = {
  wifi?:boolean;
  parking?:boolean;
  breakfast?:boolean;
  pets?:boolean;
}
export type venueLocation = {
  address?: string; 
  city?: string; 
  zip?: string; 
  country?: string; 
  continent?: string; 
  lat?: number; 
  lng?: number;
}
export type venueDataApi = {
  name: string;
  description: string;
  media?:image[];
  price:number;
  maxGuests:number;
  rating?:number;
  created: string;
  updated: string;
  meta: venueMeta;
  location:venueLocation;
}
export type venueDataOwner = venueDataApi & {
  id: string;
  owner:userData;
}
export type VenueBookingsData = venueDataOwner & {
  bookings: BookingDataGET;
}
export type DeleteResponse = {
  success: boolean;
  status: number;
};
export type Customer = {
  name:string;
  email:string;
  bio:string;
  avatar: image;
  banner: image;
}
export type FilterBookedVenue = {
  id:string;
  dateFrom:string;
  dateTo:string;
  guests:number;
  created:string;
  updated:string;
  customer: Customer;
}
export type VenueCheckBookings = venueDataOwner & {
  bookings: FilterBookedVenue[];
}
export type CreateBookingProps = {
  venueId:string;
  maxGuests:number;
}
export type BookingDataPOST = {
  venueId:string;
  dateFrom:string;
  dateTo:string;
  guests:number;
}
 type BookingDataGET = BookingDataPOST & {
  id:string;
  created:string;
  updated:string;
  customer: Customer;
  venue: venueDataOwner;
}
export type BookingGET = {
  id:string;
  dateFrom:string;
  dateTo:string;
  guests: number;
  created:string;
  updated:string;
  venue: venueDataOwner;
  customer:Customer;
}
export type BookingDataPUT = {
  guests:number;
  dateFrom: string;
  dateTo:string;
}
export type UserProfileBookings = {
  id:string;
  dateFrom:string;
  dateTo:string;
  guests: number;
  created:string;
  updated:string;
  venue: venueDataApi;
}
export type VenuesAllViewProps = {
  allVenues: AllVenuesData[]
}
