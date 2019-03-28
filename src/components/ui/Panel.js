import styled from 'styled-components';

const Panel = styled.div`
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.2);
  grid-column: ${props => (props.columns ? `span ${props.columns}` : 'span 1')};
  margin: 1rem;
  padding: 1rem;
`;

export default Panel;
