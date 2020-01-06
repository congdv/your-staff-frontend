import React from "react"
import {connect} from "react-redux"

import {newStaffAction} from "../reducers/staffReducer"
import NewStaffForm from "./NewStaffForm"
import { useField } from "../hooks"

const NewStaff = (props) => {
  const firstName = useField("text")
  const lastName = useField("text")
  
  const addNewStaff = async(event) => {
    event.preventDefault()
    const newStaff = {
      firstName: firstName.value,
      lastName: lastName.value
    }
    try {
      console.log("New Staff")
      props.addNewStaff(newStaff)
      firstName.reset()
      lastName.reset()
    }catch(exception) {
      console.log(exception)
    }

  }

  return(
    <div>
      <NewStaffForm firstName={firstName} lastName={lastName} handleSubmit={addNewStaff}/>
    </div>
  )
}

const mapDispatchToPros = (dispatch) => {
  return {
    addNewStaff: (newStaff) => {
      dispatch(newStaffAction(newStaff))
    }
  }
}

export default connect(null,mapDispatchToPros)(NewStaff)