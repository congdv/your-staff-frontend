import { createGlobalStyle } from 'styled-components';

import IconsSvg from './Icons/emly.svg';
import IconsTtf from './Icons/emly.ttf';
import IconsWoff from './Icons/emly.woff';

export default createGlobalStyle`
@font-face {
  font-family: "emly";
  src:
    url("${IconsTtf}") format("truetype"),
    url("${IconsWoff}") format("woff"),
    url("${IconsSvg}#jira") format("svg");
  font-weight: normal;
  font-style: normal;
}
`;