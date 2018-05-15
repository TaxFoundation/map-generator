import React, { Component } from 'react';
import MapGeneratorContext from '../Context';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { FormLabel, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import SelectList from '../components/controls/SelectList';
import UploadCSV from '../components/controls/UploadCSV';

class DataControls extends Component {
  render() {
    return (
      <MapGeneratorContext.Consumer>
        {context => (
          <div className="panel__section">
            <Typography variant="subheading">Upload Data</Typography>
            <UploadCSV />
            <Typography variant="subheading">Describe Your Data</Typography>
            <SelectList
              className="controls__control"
              listName="map-type"
              label="What type of US map is it?"
              types={['states', 'counties']}
              update={data => context.updateState('mapType', data)}
              value={context.state.mapType}
              case="first"
            />
            <SelectList
              className="controls__control"
              list-name="id-select"
              label="Which column is the state ID?"
              types={context.state.rawColumnHeaders}
              update={data => context.updateMapData('id', data)}
              value={context.state.id}
            />
            <SelectList
              className="controls__control"
              list-name="value-select"
              label="Which column is the value to map?"
              types={context.state.rawColumnHeaders}
              update={data => context.updateMapData('value', data)}
              value={context.state.value}
            />
            <FormLabel>Will you show data ranks?</FormLabel>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={context.state.showRank}
                    onChange={event =>
                      context.updateState('showRank', !context.state.showRank)
                    }
                    value="showRank"
                  />
                }
                label="Toggle Showing Ranks"
              />
              {context.state.showRank ? (
                <SelectList
                  className="controls__control"
                  list-name="rank-select"
                  label="Which column is the rank?"
                  types={context.state.rawColumnHeaders}
                  update={data => context.updateMapData('rank', data)}
                  value={context.state.rank}
                />
              ) : null}
            </div>
          </div>
        )}
      </MapGeneratorContext.Consumer>
    );
  }
}

export default DataControls;
