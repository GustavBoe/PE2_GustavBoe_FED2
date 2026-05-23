
import './App.css'
import { Routes, Route } from "react-router-dom";
import AppLayout from './layout/AppLayout';
import HomeView from "./features/HomeView";
import RegisterUser from "./features/auth/RegisterUser";
import LoginUser from "@/features/auth/LoginUser";
import ProfileLayout from "./features/profile/ProfileLayout";
import ProfileView from "@/features/profile/ProfileView";
import ProfileEdit from "./features/profile/ProfileEdit";
import VenuesLayout from "./features/venues/venue/VenueLayout";
import VenuesAll from "./features/venues/VenuesAllView";
import VenueView from "./features/venues/venue/VenueView"
import VenueCreate from "./features/venues/venue/VenueCreate";
import VenueEdit from "./features/venues/venue/VenueEdit";
import BookingLayout from './features/bookings/booking/BookingLayout';
import BookingView from './features/bookings/booking/BookingView';

import BookingSuccess from './features/bookings/booking/BookingSuccess';
import ErrorView from './features/error/ErrorView';
function App() {
  
  return (
   <div>
    <Routes>
      <Route path="/" element={<AppLayout/>}>
      <Route index element={<HomeView/>}/>
      <Route path="/auth/login" element={<LoginUser/>} />
      <Route path="/auth/register" element={<RegisterUser/>} />

      <Route path="/profile/:name" element= {<ProfileLayout/>}>
        <Route index element={<ProfileView/>} />
        {/* <Route path="venues" element={ProfileVenues}/>*/}
        <Route path="edit" element={<ProfileEdit/>}/>
        <Route path="bookings/:id" element={<BookingLayout/>}>
          <Route index element={<BookingView/>}/>
        </Route>
      </Route>

      <Route path="/bookings/success/:id" element={<BookingSuccess/>}/>

      <Route path="/venues" element={<VenuesAll/>}/>
      <Route path="/venues/create" element={<VenueCreate/>}/>
        <Route path="/venues/:id" element={<VenuesLayout/>}>
          <Route index element={<VenueView/>}/>
          <Route path="edit" element={<VenueEdit/>}/>
      </Route>
      <Route path="*" element={<ErrorView/>}/>
      </Route>
      
    </Routes>
    
   </div>
  )
}

export default App
/**
 <Route path="/venues" element={<AllVenuesView/>}
 */
/**<Route path="/venue" element={<VenueLayout/>}>
 <Route path="/:id"element={<VenueView/>}> 
 <Route path="edit" element={<VenueEdit/>}>
 </Route>
  <Route path="create" element={<VenueCreate/>}
 </Route>*/