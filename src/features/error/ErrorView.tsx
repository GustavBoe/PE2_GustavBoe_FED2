import { useNavigate } from "react-router-dom"

export default function ErrorView(){
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/")
  }
  return(
    <section className="min-h-screen w-full">
      <div className="h-150 flex flex-col items-center mx-auto pt-25">
        <div className="flex flex-col items-center w-[80%] h-[50%] border-5 border-border rounded-md shadow-lg">
           <h1 className="font-parkinsans text-lg mt-15">Whoops something went wrong</h1>
      <button onClick={handleButtonClick} className="mt-10 px-7 py-2 border border-primary rounded-md hover:bg-border active:text-white">Return to home</button>
        </div>
        
      </div>
     
    </section>
  )
}