import React from "react"

import Login from "./components/Login"


import { history } from "./helpers/history"
import { Router, Switch, Route, Redirect } from "react-router-dom"
import { PrivateRoute } from "./components/PrivateRoute"
import HomePage from "./Pages/Home/HomePage"
import ProfilePage from "./Pages/Profile/ProfilePage"
import Employees from "./Pages/Employees/Employees"

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage}/>
          <PrivateRoute exact path="/employees" component={Employees}/>
          <PrivateRoute path="/profile" component={ProfilePage}/>
          <Route path="/login" component={Login} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  )
}


export default App
