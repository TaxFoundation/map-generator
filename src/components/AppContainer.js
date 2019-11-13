import styled from 'styled-components';

const AppContainer = styled.div`
  display: grid;
  grid-template-areas:
    'header header header'
    'map    map    menu';
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

export default AppContainer;
