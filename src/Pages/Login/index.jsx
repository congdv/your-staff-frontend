import React from 'react';
import { connect } from 'react-redux';

import LoginForm from '../../components/LoginForm';
import { useField } from '../../hooks';

import userAction from '../../actions/user.action';
import alertAction from '../../actions/alert.action';
import { Redirect } from 'react-router-dom';

import { Wrapper, Heading } from './Styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Login = (props) => {
  const username = useField('text');
  const password = useField('password');
  const { alert } = props;
  const handleLogin = async(event) => {
    event.preventDefault();
    if(username && password) {
      props.login(username.value, password.value);
    }
    setTimeout(() => {
      props.clearAlert();
    }, 3000);
  };

  if(props.authentication.loggedIn) {
    return <Redirect to="/"/>;
  }

  return (
    <Wrapper>
      { alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
      <Heading>Your Staff</Heading>
      <form onSubmit={handleLogin} >
        <Input placeholder="User Name" type={username.type} value={username.value} onChange={username.onChange} />
        <Input placeholder="Password" type={password.type} value={password.value} onChange={password.onChange}/>
        <Button type="submit">Login</Button>
      </form>
      {/* <LoginForm md="auto"
        username={username}
        password={password}
        handleSubmit={handleLogin}
        authentication={props.authentication}/> */}
      {
        props.authentication.loggingIn &&
        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          style={{ margin: '5px auto' }} alt="loading"/>
      }
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    authentication : state.authentication,
    alert: state.alert
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(userAction.login(username,password));
    },
    clearAlert: () => {
      dispatch(alertAction.clear());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);