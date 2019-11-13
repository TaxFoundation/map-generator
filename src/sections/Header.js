import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #0094ff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  color: #fff;
  grid-column: 1 / 4;
  text-align: center;

  h1 {
    font-size: 3rem;
    font-weight: 300;
    padding-bottom: 0.5rem;
  }
`;

const Header = () => (
  <StyledHeader>
    <h1>Tax Foundation Map Generator</h1>
  </StyledHeader>
);

export default Header;
