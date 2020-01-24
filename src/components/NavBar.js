import React from "react"
import { Navbar, NavDropdown } from "react-bootstrap"
import { connect } from "react-redux"

import Logout from "./Logout"
import { Link } from "react-router-dom"

const NavBar = (props) => {
  const { user } = props
  return (
    <Navbar bg="light" expand="lg">
      <div className="container">
        <Navbar.Text className="brandNav"><Link to="/">Your Staff</Link></Navbar.Text>
        <NavDropdown title={`${user ? user.name: ""}`} id="nav-dropdown">
          <NavDropdown.Item as={Link} to="/profile">Your Profile</NavDropdown.Item>
          <NavDropdown.Divider/>
          <Logout/>
        </NavDropdown>
      </div>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  const { user } = state.authentication
  return {
    user
  }
}

export default connect(mapStateToProps)(NavBar)