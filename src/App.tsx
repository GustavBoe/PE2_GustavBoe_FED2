
import './App.css'
import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/auth/login'
import RegisterPage from '@/pages/auth/register';

function App() {
  

  return (
   <div>
    <Routes>
      <Route path="/auth/login" element={<LoginPage/>} />
      <Route path="/auth/register" element={<RegisterPage/>} />
    </Routes>
   </div>
  )
}

export default App
