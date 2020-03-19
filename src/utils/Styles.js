import Color from 'color';

export const color = {
  primary: '#1A263A', // blue
  success: '#29A638', // green
  danger: '#E13C3C', // red
  warning: '#F89C1C', // orange
  accent: '#8A46D7', // purple

  textDarkest: '#323232',
  textDark: '#616161',
  textMedium: '#75787D',
  textMediumBlue: '#78869F',
  textLight: '#959595',
  textLightBlue: '#96A1B5',

  backgroundDark: '#8393AD',
  backgroundMedium: '#D8DDE6',
  backgroundLight: '#F7F9FB',

  borderLightest: '#E1E6F0',
  borderLight: '#D8DDE6',
  borderMedium: '#B9BDC4',
  borderBlue: '#C5D3EB',
};

export const sizes = {
  appNavBarLeftWidth: 75,
  minViewportWidth: 1000,
  secondarySideBarWidth: 230,
};

export const zIndexValues = {
  modal: 1000,
  dropdown: 101,
  navLeft: 100,
};

export const font = {
  regular: 'font-family: "CircularStdBook"; font-weight: normal;',
  medium: 'font-family: "CircularStdMedium"; font-weight: normal;',
  bold: 'font-family: "CircularStdBold"; font-weight: normal;',
  black: 'font-family: "CircularStdBlack"; font-weight: normal;',
  size: size => `font-size: ${size}px;`,
};

export const mixin = {
  darken: (colorValue, amount) =>
    Color(colorValue)
      .darken(amount)
      .string(),
  lighten: (colorValue, amount) =>
    Color(colorValue)
      .lighten(amount)
      .string(),
  rgba: (colorValue, opacity) =>
    Color(colorValue)
      .alpha(opacity)
      .string(),
  hardwareAccelerate: `
    transform: translateZ(0);
  `,
  clearfix: `
    *zoom: 1;
    &:before,
    &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
    }
  `,
  clickable: `
    cursor: pointer;
    user-select: none;
  `,
  cover: `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `
};
