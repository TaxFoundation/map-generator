import React, { createContext, useContext } from 'react';
import { Reset } from 'styled-reset';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import Theme from './Theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,400i,700,700i&subset=latin-ext');

  * {
    box-sizing: border-box;
  }
  html,
  body {
    font-family: 'Lato', sans-serif;
    font-size: ${props => props.theme.fontSize};
    font-weight: ${props => props.theme.fontWeight};
    height: 100%;
    line-height: 1.6;
  }
`;

const App = () => (
  <ThemeProvider theme={Theme}>
    <Reset />
    <GlobalStyle />
  </ThemeProvider>
);
