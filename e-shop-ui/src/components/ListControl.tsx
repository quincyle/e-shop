import React, { ChangeEvent } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

type ListControlProps = {
  count: number
  isOnlineAvailable: boolean
  isStoreAvailable: boolean
  sortValue: number

  changeOnlineAvailability: (event: ChangeEvent<HTMLInputElement>) => void
  changeStoreAvailability: (event: ChangeEvent<HTMLInputElement>) => void
  changeSort: (event: ChangeEvent<{value: unknown}>) => void
} & React.HTMLAttributes<HTMLDivElement>

export const ListControl = (props: ListControlProps) => {
  //template
  return (
    <Box display='flex' flexDirection='row' p={2}>
      <Box px={0}  py={1} flex={3}>{props.count} {props.count > 1 ? 'results' : 'result'}</Box>
      <Box ml={1}>
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
      </Box>
      <Box ml={1}>
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
      </Box>
      <Box ml={5}>
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
      </Box>
    </Box>
  );
};
