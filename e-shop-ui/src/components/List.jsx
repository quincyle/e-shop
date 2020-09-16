import React from 'react'
import Grid from '@material-ui/core/Grid'

import {ListItem} from 'components/ListItem'
import {ListControl} from 'components/ListControl'

export class List extends React.Component {
  render () {
    return (
      <div className='product-listing-container'>
        <ListControl
          count={this.props.data.products.length}
          isOnlineAvailable={this.props.isOnlineAvailable}
          isStoreAvailable={this.props.isStoreAvailable}
          sortValue={this.props.sortValue}

          changeOnlineAvailability={this.props.changeOnlineAvailability}
          changeStoreAvailability={this.props.changeStoreAvailability}
          changeSort={this.props.changeSort}
        />
        <Grid container spacing={3}>
          {this.props.data.products.map(item => {
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
    )
  }
}