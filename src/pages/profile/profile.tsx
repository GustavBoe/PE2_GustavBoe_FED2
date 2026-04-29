import GetProfileData from "@/api/profile/getProfile"

export default function ProfilePage(){
  return(
    <div>
      <GetProfileData name="Spellemann"/>
    </div>
  )
}