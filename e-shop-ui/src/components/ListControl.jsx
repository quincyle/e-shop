import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import 'css/List.css';

export const ListControl = (props) => {
  return (
    <div className="product-list-control">
      <div style={{padding: '8px 0', flex: '3'}}>{props.count} {props.count > 1 ? 'results' : 'result'}</div>
      <div style={{marginLeft: '10px'}}>
        <FormControlLabel 
          control={
            <Switch
              checked={props.isOnlineAvailable}
              onChange={props.changeOnlineAvailability}
              color='primary'
              name='isOnlineAvailable'
            />
          }
          label='Available online'
          labelPlacement='start'
        />
      </div>
      <div style={{marginLeft: '10px'}}>
        <FormControlLabel 
          control={
            <Switch
              checked={props.isStoreAvailable}
              onChange={props.changeStoreAvailability}
              color='primary'
              name='isStoreAvailable'
            />
          }
          label='Available in store'
          labelPlacement='start'
        />
      </div>
      <div style={{marginLeft: '40px'}}>
        <InputLabel>Sort</InputLabel>
        <Select
          style={{minWidth: '150px'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.sortValue}
          onChange={props.changeSort}
          name='sortValue'
        >
          <MenuItem value={1}>None</MenuItem>
          <MenuItem value={2}>Price high to low</MenuItem>
          <MenuItem value={3}>Price low to high</MenuItem>
        </Select>
      </div>
    </div>
  );
};
