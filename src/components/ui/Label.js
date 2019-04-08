import styled from 'styled-components';

const Label = styled.label`
  display: block;
  font-size: 1.4rem;
  margin-top: 1rem;

  & + * {
    font-size: 1.4rem;
  }
`;

export default Label;
