import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import Label from './Label';

const FormatSelection = styled.div`
  display: flex;
  font-size: 1.4rem;
  justify-content: space-evenly;
  padding: 0.5rem 1rem;
`;

const FormatLabel = styled.label`
  border: 1px solid #0094ff;
  border-radius: 4px;
  background-color: ${props => (props.selected ? '#0094ff' : '#fff')};
  color: ${props => (props.selected ? '#fff' : '#0094ff')};
  cursor: pointer;
  padding: 0.5rem;
  transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
  user-select: none;
`;

const FormatRadio = styled.input`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`;

const RadioGroup = ({ label, id, options }) => {
  const { data, updateData } = useContext(DataContext);
  return (
    <div>
      <Label htmlFor={`radio-group-${id}`}>{label}</Label>
      <FormatSelection>
        {options.map((option, i) => (
          <div>
            <FormatRadio
              checked={data[id] === option.id}
              onChange={e =>
                updateData({
                  id,
                  value: e.target.value,
                })
              }
              id={`${id}-${i}`}
              name={`radio-group-${id}`}
              type="radio"
              value={option.id}
            />
            <FormatLabel
              selected={data.formatType === option.id}
              htmlFor={`${id}-${i}`}
            >
              {option.label}
            </FormatLabel>
          </div>
        ))}
      </FormatSelection>
    </div>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

export default RadioGroup;
