type image = {
  url:string;
  alt:string;
}

export type regUserData = {
  name:string;
  email:string;
  password:string;
  venueManager:boolean;
}
export type userData = regUserData & {
  bio?:string;
  avatar?: image;
  banner?:image;
}