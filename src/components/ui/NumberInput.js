import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import Label from './Label';

const NumberInput = ({ label, id }) => {
  const { data, updateData } = useContext(DataContext);
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="number"
        value={data[id]}
        onChange={e => {
          updateData({ id, value: parseInt(e.target.value) });
        }}
      />
    </div>
  );
};

NumberInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
};

export default NumberInput;
