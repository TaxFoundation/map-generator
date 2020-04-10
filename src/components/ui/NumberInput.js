import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import Label from './Label';

const NumberInput = ({ label, id }) => {
  const { data, updateData } = useContext(DataContext);
  const [value, setValue] = useState(data[id]);

  useEffect(() => {
    let newValue = data[id];
    if (!Number.isNaN(value) && +value !== data[id]) newValue = +value;
    if (newValue !== data[id]) updateData({ id, value: newValue });
  }, [data, id, updateData, value]);

  return (
    <div>
      <Label>{label}</Label>
      <input
        type="text"
        inputMode="numeric"
        pattern="-?[0-9]*"
        value={value}
        onChange={e => {
          setValue(e.target.value);
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
