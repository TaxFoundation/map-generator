import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DataContext } from '../../contexts/DataContext';
import Label from './Label';

const Select = ({ label, id, options }) => {
  const { data, updateData } = useContext(DataContext);
  return (
    <div>
      <Label htmlFor={`set-${id}`}>{label}</Label>
      <select
        name={`set-${id}`}
        id={`set-${id}`}
        value={data[id] ? data[id] : ''}
        onChange={e =>
          updateData({
            id,
            value: e.target.value !== '' ? e.target.value : null,
          })
        }
      >
        <option value="">¯\_(ツ)_/¯</option>
        {options.map(option => (
          <option key={`select-${id}-${option.id}`} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

export default Select;
