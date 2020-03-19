import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo';

import { font, sizes, color, mixin, zIndexValues } from '../../utils/Styles';

export const NavLeft = styled.aside`
  z-index: ${zIndexValues.navLeft};
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100vh;
  width: ${sizes.appNavBarLeftWidth}px;
  background: ${color.primary};
  transition: all 0.1s;
  ${mixin.hardwareAccelerate}
  &:hover {
    width: 180px;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.6);
  }
`;

export const LogoLink = styled(NavLink)`
  display: block;
  position: relative;
  left: 0;
  margin: 20px 0 10px;
  transition: left 0.1s;
  
`;
export const StyledLogo = styled(Logo)`
  display: inline-block;
  margin-left: 13px;
  padding: 10px;
  ${mixin.clickable}
`;
export const Bottom = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
`;

export const Item = styled(NavLink)`
  display: block;
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding-left: 67px;
  color: #deebff;
  transition: color 0.1s;
  ${mixin.clickable}
  &:before {
    content: '';
    display: none;
    position: absolute;
    top: 5px;
    right: 0;
    height: 50px;
    width: 5px;
    background: #fff;
    border-radius: 6px 0 0 6px;
  }
  &.active,
  &:hover {
    color: #fff;
    text-decoration: none;
  }
  &.active:before {
    display: inline-block;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  i {
    position: absolute;
    left: 27px;
  }
`;

export const ItemText = styled.div`
  position: relative;
  right: 12px;
  visibility: hidden;
  opacity: 0;
  text-transform: uppercase;
  transition: all 0.1s;
  transition-property: right, visibility, opacity;
  ${font.bold}
  ${font.size(12)}
  ${NavLeft}:hover & {
    right: 0;
    visibility: visible;
    opacity: 1;
  }
`;