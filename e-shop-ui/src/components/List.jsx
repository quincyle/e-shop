import React from 'react';
import Grid from '@material-ui/core/Grid';

import {ListItem} from 'components/ListItem';
import {ListControl} from 'components/ListControl';

export const List = (props) => {
  return (
    <div className='product-listing-container'>
      <ListControl
        count={props.data.products.length}
        isOnlineAvailable={props.isOnlineAvailable}
        isStoreAvailable={props.isStoreAvailable}
        sortValue={props.sortValue}

        changeOnlineAvailability={props.changeOnlineAvailability}
        changeStoreAvailability={props.changeStoreAvailability}
        changeSort={props.changeSort}
      />
      <Grid container spacing={3}>
        {props.data.products.map(item => {
          return (
          <Grid  item key={item.sku.toString()} md={3}>
            <ListItem 
              data={item}
            />
          </Grid>
          )
        })}
      </Grid>
    </div>
  );
};