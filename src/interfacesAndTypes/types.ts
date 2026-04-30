

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