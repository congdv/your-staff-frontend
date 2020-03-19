import React from 'react';
import StyledForm from './Styles';

const Form = ({ className }) => {
  return (
    <StyledForm className={className}><form/></StyledForm>
  );
};

export default Form;