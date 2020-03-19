import React from 'react';
import StyledInput from './Styles';

const Input = ({ onChange,...inputProps }) => {
  return <StyledInput><input {...inputProps} onChange={onChange}/></StyledInput>;
};

export default Input;