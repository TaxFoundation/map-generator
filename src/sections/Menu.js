import React, { useState } from 'react';
import styled from 'styled-components';

import Panel from '../components/ui/Panel';
import PanelHeading from '../components/ui/PanelHeading';
import Data from '../components/menus/Data';
import Style from '../components/menus/Style';
import Output from '../components/menus/Output';

const MenuSelection = styled.div`
  display: flex;
  margin-bottom: 1rem;

  & > * {
    flex: 1;
  }
`;

const MenuOption = styled.h3`
  background-color: ${props => (props.selected ? '#0094ff' : '#fff')};
  border: 1px solid ${props => (props.selected ? '#0094ff' : '#fff')};
  border-radius: 4px;
  color: ${props => (props.selected ? '#fff' : '#333')};
  cursor: pointer;
  font-size: 1.6rem;
  padding: 0.5rem;
  text-align: center;
  text-transform: capitalize;
`;

const getMenu = id => {
  switch (id) {
    case 'data':
      return <Data />;
    case 'style':
      return <Style />;
    case 'output':
      return <Output />;
    default:
      return null;
  }
};

const Menu = () => {
  const [menuSelection, setMenuSelection] = useState('data');
  const options = ['data', 'style', 'output'];

  return (
    <Panel>
      <PanelHeading>Options</PanelHeading>
      <MenuSelection>
        {options.map(o => (
          <MenuOption
            onClick={() => setMenuSelection(o)}
            selected={menuSelection === o}
          >
            {o}
          </MenuOption>
        ))}
      </MenuSelection>
      {getMenu(menuSelection)}
    </Panel>
  );
};

export default Menu;
