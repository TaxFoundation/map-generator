import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import Label from './Label';

const Animation = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0)
  }

  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;

const Container = styled.div`
  align-content: end;
  animation: ${Animation} 0.4s;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  margin: 0 0 1rem;
`;

const Input = styled.input`
  border-radius: 4px;
  display: block;
  font-size: 1.4rem;
  margin-top: 1rem;
  width: 2rem;

  &:focus {
    border: 1px solid ${props => props.theme.tfBlue};
  }
`;

const Toggle = ({ id, label }) => {
  const { data, updateData } = useContext(DataContext);

  return (
    <Container>
      <Input
        id={`input-${id}`}
        type="checkbox"
        onChange={() => {
          updateData({
            id,
            value: !data[id],
          });
        }}
        checked={data[id]}
      />
      <Label htmlFor={`input-${id}`}>{label}</Label>
    </Container>
  );
};

export default Toggle;
