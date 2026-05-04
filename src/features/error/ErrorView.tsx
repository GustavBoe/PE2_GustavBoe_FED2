import { useNavigate } from "react-router-dom"

export default function ErrorView(error:string){
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/")
  }
  return(
    <div>
      <h1>Whoops something went wrong</h1>
      <h2>Error code: {error}</h2>
      <button onClick={handleButtonClick}>Return to home</button>
    </div>
  )
}