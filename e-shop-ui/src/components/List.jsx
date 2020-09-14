import React from 'react'
import Grid from '@material-ui/core/Grid'

import {ListItem} from 'components/ListItem'

export class List extends React.Component {
  render () {
    return (
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
    )
  }
}