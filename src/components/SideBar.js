import React from "react"
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"
import { FaHome, FaUserFriends, FaChartBar } from "react-icons/fa"

import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav"
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
import Home from "./Home"
import StaffTable from "./StaffTable"


const SideBar = () => {

  return (
    <Router>
      <Route render={({ location, history }) => (
        <React.Fragment>
          <SideNav
            onSelect={(selected) => {
              const to = "/" + selected
              if (location.pathname !== to) {
                history.push(to)
              }
            }}
            className="sidebar"
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected={location.pathname.substring(1)}>
              <NavItem eventKey="home">
                <NavIcon>
                  <FaHome style={{ fontSize: "1.75em" }} />
                </NavIcon>
                <NavText>
                  Home
                </NavText>
              </NavItem>
              <NavItem eventKey="employees">
                <NavIcon>
                  <FaUserFriends style={{ fontSize: "1.75em" }} />
                </NavIcon>
                <NavText>
                  Employees
                </NavText>
              </NavItem>
              <NavItem eventKey="analytics">
                <NavIcon>
                  <FaChartBar style={{ fontSize: "1.75em" }} />
                </NavIcon>
                <NavText>
                  Analytics
                </NavText>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
          <main>
            <Route path="/" exact component={ () => <Home />} />
            <Route path="/home" component={ () => <Home />} />
            <Route path="/employees" component={ () => <StaffTable />} />
          </main>
        </React.Fragment>
      )}
      />
    </Router>
  )
}

export default SideBar