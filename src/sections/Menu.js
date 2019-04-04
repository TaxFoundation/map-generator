import React from 'react';

import Panel from '../components/ui/Panel';
import PanelHeading from '../components/ui/PanelHeading';
import Data from '../components/menus/Data';
import Style from '../components/menus/Style';

const Menu = () => (
  <Panel>
    <PanelHeading>Menu</PanelHeading>
    <Data />
    <Style />
  </Panel>
);

export default Menu;
