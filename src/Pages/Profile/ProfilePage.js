import React from "react"
import NavBar from "../../components/NavBar"
import UserProfile from "../../components/UserProfile"

const ProfilePage = () => {
  return (
    <div>
      <NavBar/>
      <div className="container">
        <UserProfile/>
      </div>
    </div>
  )
}

export default ProfilePage