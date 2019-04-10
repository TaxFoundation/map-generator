import React from 'react';
import { Reset } from 'styled-reset';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import Theme from './Theme';
import { DataProvider } from './contexts/DataContext';
import AppContainer from './components/AppContainer';
import Header from './sections/Header';
import Map from './sections/Map';
import Menu from './sections/Menu';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,400i,700,700i&subset=latin-ext');

  html {
    font-size: 10px;
  }

  body {
    box-sizing: border-box;
    color: #333;
    font-family: 'Lato', sans-serif;
    font-size: ${props => props.theme.fontSize};
    font-weight: ${props => props.theme.fontWeight};
    height: 100vh;
    line-height: 1.6;

    *, *:before, *:after {
      box-sizing: inherit;
    }
  }
`;

const App = () => (
  <ThemeProvider theme={Theme}>
    <DataProvider>
      <Reset />
      <GlobalStyle />
      <AppContainer>
        <Header />
        <Map />
        <Menu />
      </AppContainer>
    </DataProvider>
  </ThemeProvider>
);

export default App;
