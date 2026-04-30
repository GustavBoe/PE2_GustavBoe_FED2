
import './App.css'
import { Routes, Route } from 'react-router-dom';
import RegisterUser from './features/auth/RegisterUser';
import LoginUser from '@/features/auth/LoginUser'
import ProfileLayout from './features/profile/ProfileLayout';
import ProfileView from '@/features/profile/ProfileView';
import ProfileEdit from './features/profile/ProfileEdit';


function App() {
  
  return (
   <div>
    <Routes>
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
