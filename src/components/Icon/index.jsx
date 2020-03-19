/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';

import StyledIcon from './Style';

const codes = {
  [`home`]: '\\e800',
  [`right-open`]: '\\e804',
  [`arrow-left`]: '\\e805',
  [`trash-empty`]: '\\e808',
  [`chart-pie`]: '\\f200',
  [`users`]: '\\e806',
};

const propTypes = {
  type: PropTypes.oneOf(Object.keys(codes)).isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
  left: PropTypes.number,
  top: PropTypes.number,
};

const defaultProps = {
  className: undefined,
  size: 16,
  left: 0,
  top: 0,
};

const Icon = ({ type, ...iconProps }) => <StyledIcon {...iconProps} code={codes[type]}/>;

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;