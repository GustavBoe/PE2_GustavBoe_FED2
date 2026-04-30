
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomeView from './features/home';
import RegisterUser from './features/auth/RegisterUser';
import LoginUser from '@/features/auth/LoginUser'
import ProfileLayout from './features/profile/ProfileLayout';
import ProfileView from '@/features/profile/ProfileView';
import ProfileEdit from './features/profile/ProfileEdit';


function App() {
  
  return (
   <div>
    <Routes>
      <Route path="/" element={<HomeView/>}/>
      <Route path="/auth/login" element={<LoginUser/>} />
      <Route path="/auth/register" element={<RegisterUser/>} />
      <Route path="/profile/:name" element= {<ProfileLayout/>}>
      <Route index element={<ProfileView/>} />
      <Route path="edit" element={<ProfileEdit/>}/>
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