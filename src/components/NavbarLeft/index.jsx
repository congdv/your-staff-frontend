import React from 'react';


import Icon from '../Icon';
import { NavLeft, LogoLink, StyledLogo, Item, ItemText } from './Style';

const NavBarLeft = () => {
  const isAuth = window.localStorage.getItem('userToken');
  if(!isAuth) {
    return null;
  }
  return (
    <NavLeft>
      <LogoLink to="/">
        <StyledLogo color="#fff" />
      </LogoLink>
      <Item to="/home">
        <Icon type="home" size={16} />
        <ItemText>Home</ItemText>
      </Item>
      <Item to="/employees">
        <Icon type="users" size={16} />
        <ItemText>Employees</ItemText>
      </Item>
    </NavLeft>
  );
};

export default NavBarLeft;