import React from "react"
import {
  BrowserRouter as Router,
  Route, withRouter
} from "react-router-dom"
import {FaHome, FaUserFriends, FaChartBar} from "react-icons/fa"

import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav"
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
import Home from "./Home"
import StaffTable from "./StaffTable"

 
const SideBar = (props) => {

  return (
    <Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    console.log(to,"---------")
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                    console.log(location.pathname.substring(1))
                }}
                className="sidebar"
            >
                <SideNav.Toggle />
                {console.log(location,"------",location.pathname.substring(1))}
                <SideNav.Nav defaultSelected={location.pathname.substring(1)}>
                    <NavItem eventKey="home">
                        <NavIcon>
                            <FaHome style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="employees">
                        <NavIcon>
                            <FaUserFriends style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Employees
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="analytics">
                        <NavIcon>
                            <FaChartBar style={{ fontSize: '1.75em'}} />
                        </NavIcon>
                        <NavText>
                            Analytics
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <main>
                <Route path="/" exact component={ props => <Home />} />
                 <Route path="/home" component={ props => <Home />} />
               <Route path="/employees" component={ props => <StaffTable />} />
            </main>
        </React.Fragment>
    )}
    />
  </Router>
  )
}

export default SideBar