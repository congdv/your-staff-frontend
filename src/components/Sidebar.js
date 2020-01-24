import React from "react"
import { FaHome, FaUserFriends, FaChartBar } from "react-icons/fa"
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav"
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
import { history } from "../helpers/history"

const Sidebar = () => {
  let selectedValue = history.location.pathname.substring(1)
  return (
    <SideNav className="sidebar"
      onSelect={(selected) => {
        const to = "/" + selected
        if (history.pathname !== to) {
          history.push(to)
        }
      }}>
      <SideNav.Toggle />
      <SideNav.Nav onSelect={(selected) => {
        console.log(selected)
        selectedValue = selected
      }}>
        <NavItem eventKey="" active={selectedValue === "" ? true : false}>
          <NavIcon>
            <FaHome style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>
            Home
          </NavText>
        </NavItem>
        <NavItem eventKey="employees" active={selectedValue === "employees" ? true : false}>
          <NavIcon>
            <FaUserFriends style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>
            Employees
          </NavText>
        </NavItem>
        {/* <NavItem eventKey="analytics">
          <NavIcon>
            <FaChartBar style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>
            Analytics
          </NavText>
        </NavItem> */}
      </SideNav.Nav>
    </SideNav>
  )
}
export default Sidebar