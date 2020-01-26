import React from "react"
import NavBar from "../../components/NavBar"
import TimeTable from "../../components/TimeTable"
import StaffModal from "../../components/StaffModal"
import DateOfWeek from "../../components/DateOfWeek"
import Sidebar from "../../components/Sidebar"

const HomePage = () => {
  return (
    <div>
      <NavBar/>
      <Sidebar/>
      <div className="container">
        <div className="statusBar">
          <StaffModal/>
          <DateOfWeek/>
        </div>
        <TimeTable/>
      </div>
    </div>
  )
}

export default HomePage