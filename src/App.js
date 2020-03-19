import React from "react"

import LoginPage from './Pages/Login';


import { history } from "./helpers/history"
import { Router, Switch, Route, Redirect } from "react-router-dom"
import { PrivateRoute } from "./components/PrivateRoute"
import HomePage from "./Pages/Home/HomePage"
import ProfilePage from "./Pages/Profile/ProfilePage"
import Employees from "./Pages/Employees/Employees"
import { connect } from "react-redux"

import FontStyles from './assets/FontStyles';
import NormalizeStyles from './globals/NormalizeStyles';

import NavbarLeft from './components/NavbarLeft';
import { Main } from './AppStyles';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <NavbarLeft/>
        <FontStyles/>
        <NormalizeStyles/>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage}/>
          <PrivateRoute exact path="/home" component={HomePage}/>
          <PrivateRoute exact path="/employees" component={Employees}/>
          <PrivateRoute path="/profile" component={ProfilePage}/>
          <Route path="/login" component={LoginPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { user } = state.authentication
  return {
    user
  }
}


export default connect(mapStateToProps)(App)
