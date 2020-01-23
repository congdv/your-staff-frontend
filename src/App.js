import React, { useEffect } from "react"
import { connect } from "react-redux"

import Login from "./components/Login"

import { loginAction } from "./reducers/loginReducer"
import { getAllActiveStaffsAction } from "./reducers/staffReducer"

import { history } from "./helpers/history"
import { Router, Switch, Route, Redirect } from "react-router-dom"
import { PrivateRoute } from "./components/PrivateRoute"
import HomePage from "./Pages/Home/HomePage"
import ProfilePage from "./Pages/Profile/ProfilePage"


const App = (props) => {
  const hook = () => {
    const loggedUserJSON = window.localStorage.getItem("userToken")
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.login(user)
    }
  }

  useEffect(hook ,[])
  console.log(props)
  return (
    <div>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage}/>
          <PrivateRoute path="/profile" component={ProfilePage}/>
          <Route path="/login" component={Login} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    authentication: state.authentication
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    allActiveStaffs : () => {
      dispatch(getAllActiveStaffsAction())
    },
    login: (user) => {
      dispatch(loginAction(user))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
