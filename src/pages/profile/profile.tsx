import GetProfileData from "@/components/api/profile/GetProfile";

export default function ProfilePage(){
  return(
    <div>
      <GetProfileData name="Spellemann"/>
    </div>
  )
}