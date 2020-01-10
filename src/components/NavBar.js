import React from "react"
import { Navbar, NavDropdown } from "react-bootstrap"
import {connect} from "react-redux"

import Logout from "./Logout"

const NavBar = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <div className="container">
        <Navbar.Text>Your Staff</Navbar.Text>
        <NavDropdown title={props.user.name} id="nav-dropdown">
          <NavDropdown.Item>Your Profile</NavDropdown.Item>
          <NavDropdown.Divider/>
          <Logout/>
        </NavDropdown>
      </div>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(NavBar)