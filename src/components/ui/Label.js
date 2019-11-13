import styled from 'styled-components';

const Label = styled.label`
  display: block;
  font-size: 1.4rem;
  margin-top: 1rem;

  & + input,
  & + select {
    font-size: 1.4rem;
    width: 100%;
  }
`;

export default Label;
