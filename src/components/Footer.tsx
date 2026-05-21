import { Link } from "react-router-dom"
export default function Footer(){
  return(
    <section className="flex flex-col text-center justify-center w-full h-20  gap-5 font-dm text-text border-t border-border">
      <div className="flex flex-row justify-around">
        <p>Holidaze&reg;2026</p>
        <p>About us</p>
         <Link to={"/"} className="hidden md:block"> <p>Terms and Conditions</p></Link>
      </div>
      <Link to={"/"} className="md:hidden"> <p>Terms and Conditions</p></Link>
   
    </section>
  )
}