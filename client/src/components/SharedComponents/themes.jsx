import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#fff',
  fontColor: '#535353',
};

export const darkTheme = {
  body: '#343a40',
  fontColor: '#fff',
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
  }
`;
