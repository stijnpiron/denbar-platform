/**
 * The global styles file uses categories to group css variables
 */

const blue = '#184d68';
const green = '#93af2f';
const grey = '#8d8d8d';
const lightBlue = '#4d84a0';
const lightGrey = '#e8e8e8';
const porcelain = '#f0f2f4';
const slateGrey = '#7c8595';
const tropicalBlue = '#c4def1';
const white = '#ffffff';
const red = '#ff0000';

export const color = {
  colors: {
    blue,
    green,
    grey,
    lightBlue,
    lightGrey,
    porcelain,
    red,
    slateGrey,
    tropicalBlue,
    white,
  },
  types: {
    borderColor: lightGrey,
    buttonDisabled: lightGrey,
    buttonPrimary: blue,
    buttonWarning: red,
    contentBackground: white,
    headerColor: blue,
    highlight: green,
    light: tropicalBlue,
    menuBackground: white,
    menuBorder: porcelain,
    primary: slateGrey,
    secondary: lightBlue,
    text: slateGrey,
    textDark: blue,
    textDisabled: grey,
  },
};

export const height = {
  headerHeight: '10vh',
};
export const media = {
  smallScreenTrigger: '48rem',
};

export const cursor = {
  activeLink: 'pointer',
  disabled: 'not-allowed',
};

export const borders = {
  bottomBoxShadow: '0 0.3rem 0.3rem 0 rgba(150,150, 150, 0.1)',
  topBoxShadow: '0 -0.3rem 0.3rem 0 rgba(150,150, 150, 0.1)',
};
