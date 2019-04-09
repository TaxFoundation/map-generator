import React, { useContext } from 'react';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import Label from '../ui/Label';

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

const Style = () => {
  const { data, updateData } = useContext(DataContext);
  return (
    <div>
      {data.mapData ? (
        <form>
          {data.isNumeric ? (
            <div>
              <Label htmlFor="numeric-data-type">
                What type of quantitative data is this?
              </Label>
              <select
                name="numeric-data-type"
                id="numeric-data-type"
                value={data.numericDataType}
                onChange={e =>
                  updateData({
                    id: 'numericDataType',
                    value: e.target.value,
                  })
                }
              >
                <option value="sequential">Sequential</option>
                <option value="divergent">Divergent</option>
              </select>
            </div>
          ) : null}
          <div>
            <Label htmlFor="number-format">
              How should the values be formatted?
            </Label>
            <FormatSelection>
              <div>
                <FormatRadio
                  checked={data.formatType === 'number'}
                  onChange={e =>
                    updateData({
                      id: 'formatType',
                      value: e.target.value,
                    })
                  }
                  id="number-format-1"
                  name="number-format"
                  type="radio"
                  value="number"
                />
                <FormatLabel
                  selected={data.formatType === 'number'}
                  htmlFor="number-format-1"
                >
                  Number
                </FormatLabel>
              </div>
              <div>
                <FormatRadio
                  checked={data.formatType === 'percent'}
                  onChange={e =>
                    updateData({
                      id: 'formatType',
                      value: e.target.value,
                    })
                  }
                  id="number-format-2"
                  name="number-format"
                  type="radio"
                  value="percent"
                />
                <FormatLabel
                  selected={data.formatType === 'percent'}
                  htmlFor="number-format-2"
                >
                  Percent
                </FormatLabel>
              </div>
              <div>
                <FormatRadio
                  checked={data.formatType === 'dollar'}
                  onChange={e =>
                    updateData({
                      id: 'formatType',
                      value: e.target.value,
                    })
                  }
                  id="number-format-3"
                  name="number-format"
                  type="radio"
                  value="dollar"
                />
                <FormatLabel
                  selected={data.formatType === 'dollar'}
                  htmlFor="number-format-3"
                >
                  Dollar
                </FormatLabel>
              </div>
            </FormatSelection>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default Style;
