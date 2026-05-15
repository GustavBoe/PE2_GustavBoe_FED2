import { Outlet } from "react-router-dom"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

export default function AppLayout(){
  return(
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-1">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}