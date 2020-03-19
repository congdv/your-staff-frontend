import styled from 'styled-components';

import { color, font } from '../../utils/Styles';

export const Wrapper = styled.div`
  margin: 100px auto 0;
  max-width: 300px;
  padding: 20px 20px 60px;
  text-align: center;
  border-radius: 4px;
  background: ${color.backgroundLight};
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

export const Heading = styled.h1`
  ${font.size(30)}
`;

export const Message = styled.p`
  color: ${color.textDark};
  padding: 10px 0 30px;
  line-height: 1.35;
  ${font.size(20)}
`;
