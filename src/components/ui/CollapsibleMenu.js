import styled from 'styled-components';

const CollapsibleMenu = styled.div`
  transform: ${props => (props.collapse ? 'scale(1, 0)' : 'scale(1, 1)')};
  transform-origin: top;
  transition: transform 0.2s ease-in-out;
`;

export default CollapsibleMenu;
