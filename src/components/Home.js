import React from "react"
import NewStaffModal from "./NewStaffModal"
import DateOfWeek from "./DateOfWeek"
import TimeTable from "./TimeTable"


const Home = () => {
  return (
    <>
      <div className="container">
        <div className="statusBar">
          <NewStaffModal/>
          <DateOfWeek/>
        </div>
        <TimeTable/>
      </div>
    </>
  )
}

export default Home